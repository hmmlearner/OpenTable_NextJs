
import Link from "next/link";
import { usePathname, useSearchParams  } from "next/navigation";
import { calculateReviewRatingAverage } from "../../../utils/calculateReviewRatingAverage";
import Price from "../../components/Price";
import Stars from "../../components/Stars";
import { RestaurantCardType } from "../../page";

export default function RestaurantCard({resturant}:{resturant:RestaurantCardType}){
  
  const renderRatingText = ()=>{
    const restaurantRating = calculateReviewRatingAverage(resturant.reviews);
    if(restaurantRating! > 4) return "Awesome";
    else if(restaurantRating! > 3 && restaurantRating! <= 4) return "Good";
    else ""
  }
//resturant.reviews.reduce((accum, review)=>(accum+review.rating),0) / resturant.reviews.length;

    return (
        <div className="border-b flex pb-5">
            
        <img src={resturant.main_image} alt="" className="w-56 rounded"></img>
        
        <div className="pl-5">
          <h2 className="text-3xl">{resturant.name}</h2>
          <div className="flex items-start">
            <div className="flex mb-2"><Stars reviews={resturant.reviews}/></div>
            <p className="text-sm ml-2">{renderRatingText()}</p>
          </div>
          <div className="mb-9">
            <div className="flex text-reg font-light">
              <p className="mr-4"><Price price={resturant.price}/></p>
              <p className="mr-4">{resturant.cusine.name}</p>
              <p className="mr-4">{resturant.location.name}</p>
            </div>
          </div>
          <div className="text-red-600">
          <Link href={`/restaurant/${resturant.slug}`}>View more information</Link>
        </div>
        </div>
        
      </div>

    )
}