import { CusineType, LocationType } from "../page";
import Link from "next/link";
import { PRICE } from "@prisma/client";



export default async function SearchBar({cusines, cities, searchParams}:{cusines:CusineType[],cities:LocationType[], searchParams:{city?:string, cusine?:string, price?:PRICE} }){

  const prices = [{label:"$", price:PRICE.CHEAP.toLowerCase(), className: "border rounded-l p-2 w-full font-light text-reg"},
  {label:"$$", price:PRICE.REGULAR.toLowerCase(), className:"border-t border-b border-r p-2 w-full font-light text-reg"},
  {label:"$$$", price:PRICE.EXPENSIVE.toLowerCase(), className: "border-t border-b border-r rounded-r p-2 w-full font-light text-reg"}]

    return(
        <div className="w-1/5">
            <div className="border-b pb-4">
              <h1 className="mb-2">Region</h1>
              {cities.map(citi => <p key={citi.id} className="font-light text-reg"><Link href={{pathname:"/search", query:{...searchParams,city:citi.name}}} replace>{citi.name}</Link></p>)}
            </div>
            <div className="border-b pb-4 mt-3">
            <h1 className="mb-2">Cusine</h1>
              {cusines.map(cusine => <p key={cusine.id} className="font-light text-reg"><Link href={{pathname:"/search",query:{...searchParams,cusine:cusine.name}}} replace>{cusine.name}</Link></p>)}
            </div>
            <div className="mt-3 pb-4">
              <h1 className="mb-2">Price</h1>
              <div className="flex">
              
              {prices.map(({label,price,className}) =><Link className={className} href={{pathname:"/search",query:{...searchParams, price}}}>{label}</Link>)}
               
              </div>
            </div>
          </div>

    )

}
