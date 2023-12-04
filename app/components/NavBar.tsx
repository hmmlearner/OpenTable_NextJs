
"use client"
import Link from "next/link";
import LoginModal from "./AuthModal";
import useAuth from "../../hooks/useAuth";
import { AuthenicationContext } from './context/AuthContext';
import { useContext } from "react";
export default function NavBar(){

    const {loading, data} = useContext(AuthenicationContext);
    const {signOut} = useAuth();

    return(
        <nav className="bg-white p-2 flex justify-between">
        <Link href="/" className="font-bold text-gray-700 text-2xl">
          OpenTable
        </Link>
       
            {loading ? null :  <div className="flex">
            {data ? <button className="bg-blue-400 text-white border p-1 px-4 rounded" onClick={() => {signOut()}}>Sign Out</button> : 
            <>
              <LoginModal buttonType={true}/>
              <LoginModal buttonType={false}/>
            </>}
            </div>}
         
      </nav>
    )
}