"use client"
import Image from "next/image";
import errorMascot from "../../public/icons/error.png"

function Error({error}: {error:Error}) {
    return ( 
        <div className="h-screen bg-gray-200 flex flex-col items-center justify-center">
            <Image src={errorMascot} alt="error" className="w-56 mb-8"></Image>
            <div className="bg-white px-9 py-14 shadow rounded">
                <h3 className="text-3xl font-bold">Well, this is embrassing</h3>
                <p className="text-reg font-bold">We couldn't find that restaurant</p>
                <p className="mt-6 text-sm font-light">Error Code: 404</p>
            </div>
        </div>

     );
}

export default Error;