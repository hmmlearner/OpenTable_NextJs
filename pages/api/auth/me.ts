import { NextApiRequest, NextApiResponse } from "next";

import jwt from 'jsonwebtoken';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req:NextApiRequest, res:NextApiResponse){

    // const bearerToken = req.headers["authorization"] as string;
    // if(!bearerToken)
    //     return res.status(401).json({errorMessage:"Unauthorized request(in bearerToken)"});

    // const token= bearerToken.split(" ")[1];
    // if(!token)
    //     return res.status(401).json({errorMessage:"Unauthorized request (on extracting toen)"});

    // const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    // try{
    //     await jose.jwtVerify(token,secret); // this is just the verification process thats all.
    // }
    // catch(error){
    //     return res.status(401).json({errorMessage:"Unauthorized request on verification"});
    // }    

    const bearerToken = req.headers["authorization"] as string;
    const token= bearerToken.split(" ")[1];

    const payload = jwt.decode(token) as {email:string};
    if(!payload)
        return res.status(401).json({errorMessage:"Unauthorized request (on decoding token)"});

    const user = await prisma.user.findFirst({
        where:{
            email: payload.email
        },
        select:{
            id: true,
            first_name: true,
            last_name:true,
            city: true,
            phone: true,
            email: true

        }
    });

    if(!user)
        return res.status(401).json({errorMessage: "User doesnt exists"})

    return res.json({firstName: user.first_name, lastName: user.last_name, city: user.city, email: user.email, phone: user.phone});
}