import { NextApiRequest, NextApiResponse } from "next";
import validator from "validator";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { SignJWT } from "jose";
import { setCookie } from 'cookies-next';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email, password } = req.body;
    console.log(email, password);
    const validatorSchema = [
      {
        valid: validator.isEmail(email),
        errorMessage: "Email is invalid",
      },
      {
        valid: validator.isLength(password, { min: 4 }),
        errorMessage: "Passwod is too short",
      },
    ];
    // console.log(email, password);
    var errors: string[] = [];
    validatorSchema.forEach((check) => {
      if (!check.valid) errors.push(check.errorMessage);
    });

    if (errors.length) return res.status(400).json({ errorMessage: errors[0] });

    const emailExists = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (!emailExists)
      return res
        .status(401)
        .json({ errorMessage: "Email or password is invalid" });

    // //check entered password matches
    const isMatch = await bcrypt.compare(password, emailExists.password);
    if (!isMatch)
      return res
        .status(401)
        .json({ errorMessage: "Email or password is invalid" });

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const alg = "HS256";
    const jwt = await new SignJWT({ email: email })
      .setProtectedHeader({ alg })
      .setExpirationTime("24h")
      .sign(secret);
    console.log(jwt);
    setCookie("jwt", jwt,{req,res,maxAge: 60 * 6* 24});
    return res.status(200).json({
        firstName: emailExists.first_name,
        lastName: emailExists.last_name,
        email: emailExists.email,
        city: emailExists.city,
        phone: emailExists.phone
    });
  }

  return res.status(404).json("unknown endpoint");
}
