import { useRouter } from "next/navigation";
import { useState } from "react";
import SearchBar from "../../components/SearchBar";

export default function ResturantHeader(){
    return (
      <div className="bg-gradient-to-r from-[#0f1f47] to-[#5f6984] p-2">
        <div className="flex justify-center m-auto py-2">
        <SearchBar/>  
        </div>
      </div>
    );
}