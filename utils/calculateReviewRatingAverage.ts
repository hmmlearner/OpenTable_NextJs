import { Review } from "@prisma/client";

export const calculateReviewRatingAverage = (reviews: Review[]) =>{
    console.log('reviews.length' + reviews.length)
    if(!reviews.length) return 0;
    const restaurantRating = reviews.reduce((accum, review)=>(accum+review.rating),0) / reviews.length;
    return restaurantRating;
}