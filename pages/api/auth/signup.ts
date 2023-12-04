import { NextApiRequest, NextApiResponse } from "next";
import validator from "validator";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import {SignJWT } from "jose"

const prisma = new PrismaClient();          
export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if(req.method ==="POST")
    {
      const {firstname,lastname,email,phone, city,password } = req.body;
        const errors:string[] = [];
        const validatorSchema = [
            {valid: validator.isLength(firstname, {min:1, max:20}), errorMessage: "First name is invalid"},
            {valid: validator.isLength(lastname, {min:1, max:20}), errorMessage: "Last name is invalid"},
            {valid: validator.isEmail(email), errorMessage: "Email is invalid"},
            {valid: validator.isMobilePhone(phone), errorMessage: "Phone is invalid"},
            {valid: validator.isLength(city, {min:1, max:20}), errorMessage: "City is invalid"},
            {valid: validator.isStrongPassword(password), errorMessage: "Password is invalid"},
        ];
        validatorSchema.forEach(check => {
            if(!check.valid)
                errors.push(check.errorMessage);
        });
     

        const emailExists = await prisma.user.findFirst({
            where: 
            {email}
        });
        if(emailExists){
            res.status(400).json({errorMessage1: "Email already exists"});
        }

        if(errors.length>0){
            res.status(400).json({errorMessage2: errors[0]})
        }
       const hashPasswrod = await bcrypt.hash(password,10);
        const user = await prisma.user.create({
            data:{
                first_name: firstname,
                last_name:lastname,
                email: email,
                password: hashPasswrod,
                city: city,
                phone: phone

            }

        });

        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const alg = "HS256";
        const jwt = await new SignJWT({email:email}).setProtectedHeader({alg}).setExpirationTime("24h").sign(secret);
        console.log(jwt);
    
        return res.status(200).json(jwt)
        //res.status(200).json({hello: "test"})
    }
    return res.status(404).json("Unknown endpoint");
}