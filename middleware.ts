import {NextRequest, NextResponse} from "next/server";
import * as jose from "jose";
export async function middleware(req:NextRequest,res:NextResponse){

    const bearerToken = req.headers.get("authorization") as string;
    if(!bearerToken)
        return NextResponse.json({errorMessage:"Unauthorized request(in bearerToken)"}, {status:401})
  
       

    const token= bearerToken.split(" ")[1];
    if(!token)
        return NextResponse.json({errorMessage:"Unauthorized request(in bearerToken)" }, {status:401});

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    try{

        await jose.jwtVerify(token,secret); // this is just the verification process thats all.
    }
    catch(error){
        return NextResponse.json({errorMessage:"Unauthorized request(in bearerToken)" }, {status:401})
        };
    
}    



export const config = {
    matcher: ["/api/auth/me"]
}