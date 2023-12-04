"use client"

import axios from "axios";
import { getCookie } from "cookies-next";
import React, { useEffect } from "react";
import { useState } from "react"
import { createContext } from "react";

interface User{
    id: number,
    firstName:string,
    lastName:string,
    email:string,
    password: string,
    city: string,
    phone:string;
}

interface State{
    loading:boolean,
    data: User|null,
    error: string|null
}
interface AuthState extends State{
    setAuthState: React.Dispatch<React.SetStateAction<State>>
}

export const AuthenicationContext = createContext<AuthState>({
    loading: false,
    data: null,
    error: null,
    setAuthState: ()=>{}
});



export default function AuthContext ({children}: {children: React.ReactNode}) {
    const [authState, setAuthState] = useState<State>({
        loading:true,
        data: null,
        error: null
    });

    
const fetchUser = async ()=>{
    setAuthState({
        loading: true,
        data: null,
        error: null});
    try{
        const token = getCookie("jwt");
        if(!token){
            return  setAuthState({
                loading: false,
                data: null,
                error: null});
        }
        const response = await axios.get(
            "http://localhost:3000/api/auth/me",{
                headers:{
                    "Authorization": `Bearer ${token}`
                }
            }
          );
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          setAuthState({
            loading: false,
            data: response.data,
            error: null});
    }
    catch(error: any){
        setAuthState({
            loading: false,
            data: error.response.data.errorMessage,
            error: null});
    }
  }
  
    useEffect(()=>{
        fetchUser();
    },[]);    

    return <AuthenicationContext.Provider value={{...authState, setAuthState}}>{children}</AuthenicationContext.Provider>
}


