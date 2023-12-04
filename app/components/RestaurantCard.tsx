import Link from "next/link";
import { RestaurantCardType } from "../page";
import Price from './Price';
import Stars from "./Stars";
interface Props{ 
  restaurant: RestaurantCardType
}

  export default function RestaurantCard({restaurant}:Props){
    return (
        <Link href={`/restaurant/${restaurant.slug}`}>
          <div className="w-64 h-72 rounded overflow-hidden cursor-pointer border p-3">
              <img src="https://resizer.otstatic.com/v2/photos/wide-huge/3/52516586.webp" alt="" className="w-full h-36"/>
              <div className="p-1">
                <h3 className="text-2xl font-bold mb-2">{restaurant.name}</h3>
                <div className="flex items-start">
                  <div className="flex mb-2"><Stars reviews={restaurant.reviews}/></div>
                  <p className="ml-2">{restaurant.reviews.length > 1 ? `${restaurant.reviews.length} reviews` : `${restaurant.reviews.length} review`}</p>
                </div>
                <div className="text-reg flex capitalize font-light">
                  <p className="mr-3">{restaurant.cusine.name}</p>
                  <p className="mr-3"><Price price={restaurant.price}/></p>
                  <p>{restaurant.location.name}</p>
                </div>
                  <p className="text-sm font-bold mt-1">Booked 3 times</p>
             </div>
          </div>
          </Link>
    )
}