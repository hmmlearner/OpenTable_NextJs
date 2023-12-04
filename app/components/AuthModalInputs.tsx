import { ChangeEvent, useState } from "react";

interface Props{
    inputs:{
    firstName: string,
    lastName:string,
    email:string,
    phone: string,
    city:string,
    password: string;
    },
    handleChangeInputs:(e:ChangeEvent<HTMLInputElement>) =>void,
    accountType: boolean
}

function AuthModalInputs({inputs, handleChangeInputs, accountType}:Props) {
  


    return ( 
        <div>
            { accountType ? (
            <div className="my-3 flex justify-between text-sm">
                <input type="text" className="border rounded p-2 py-3 w-[49%]" placeholder="First Name" value={inputs.firstName} onChange={handleChangeInputs} name="firstName"/>
                <input type="text" className="border rounded p-2 py-3 w-[49%]" placeholder="Last Name" value={inputs.lastName} onChange={handleChangeInputs} name="lastName"/>
            </div>) : null
            }
            <div className="my-3 flex justify-between text-sm">
                <input type="text" className="border rounded p-2 py-3 w-full" placeholder="Email" value={inputs.email} onChange={handleChangeInputs} name="email"/>
            </div>
            { accountType ? (
            <div className="my-3 flex justify-between text-sm">
                <input type="text" className="border rounded p-2 py-3 w-[49%]" placeholder="Phone" value={inputs.phone} onChange={handleChangeInputs} name="phone"/>
                <input type="text" className="border rounded p-2 py-3 w-[49%]" placeholder="City" value={inputs.city} onChange={handleChangeInputs} name="city"/>
            </div>):null
            }

            <div className="my-3 flex justify-between text-sm">
                <input type="password" className="border rounded p-2 py-3 w-full" placeholder="Password" value={inputs.password} onChange={handleChangeInputs} name="password"/>
            </div>
        
        </div>
     );
}

export default AuthModalInputs;
