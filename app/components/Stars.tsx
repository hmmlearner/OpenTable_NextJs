import { Review } from "@prisma/client";
import { calculateReviewRatingAverage } from "../../utils/calculateReviewRatingAverage";
import fullstar from "../../public/icons/full-star.png";
import halfstar from "../../public/icons/half-star.png";
import emptystar from "../../public/icons/empty-star.png";
import Image from "next/image";

function Stars({reviews, rating}:{reviews:Review[]; rating?: number}) {

    const reviewrating = rating || calculateReviewRatingAverage(reviews);
    const renderStars = () =>{
        const stars = [];
        if(rating === 0){
            stars.push(emptystar);
            stars.push(emptystar);
            stars.push(emptystar);
            stars.push(emptystar);
            stars.push(emptystar);
        }
        
        for(let i=0; i<5; i++){
            const difference = parseFloat((reviewrating!-i).toFixed(1));
             if(difference>=1) stars.push(fullstar);
             else if(difference < 1 && difference >0){
                if (difference <= 0.2 ) stars.push(emptystar);
                else if (difference > 0.2 && difference <= 0.6) stars.push(halfstar);
                else stars.push(fullstar);
             }
             else 
             stars.push(emptystar);
        }
        return stars.map(star => { return (<Image src={star} alt="" className="w-4 h-4 mr-1"/>) });
    }

    return(
        <div className="flex items-center">{renderStars()}</div>
    )
   
}

export default Stars;