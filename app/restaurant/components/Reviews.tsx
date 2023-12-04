import { Review } from "@prisma/client";
import ReviewCard from "./ReviewCard";

function Reviews({reviews}:{reviews:Review[]}) {
    return ( <div>
        <h1 className="text-3xl font-bold mt-10 mb-5 pb-5 border-b">What {reviews.length} {reviews.length == 1 ? "person": "people"} are saying</h1>
        <div>
          {reviews.map((review)=> (<ReviewCard review={review}/>))}
        </div>
      </div> );
}

export default Reviews;