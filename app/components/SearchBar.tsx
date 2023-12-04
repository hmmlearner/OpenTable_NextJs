"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

function SearchBar() {
    const router = useRouter();
    const [location, setLocation] = useState("");
    const SearchHandler = () =>{
      if(location === "banana") return;
      router.push(`/search?city=${location}`)
      setLocation("");
    }
    return (  <div className="flex justify-center m-auto py-2">
    <input type='text' className="rounded text-lg p-2 mr-3 w-[450px]" placeholder="State, city and town" onChange={(e) => setLocation(e.target.value)}/>
    <button onClick={SearchHandler} className="rounded text-lg bg-red-500 text-white px-9 py-2 ">Let's go</button>
  </div>);
}

export default SearchBar;