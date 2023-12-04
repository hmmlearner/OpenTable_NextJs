import { PrismaClient, Review } from "@prisma/client";
import { notFound } from "next/navigation";
import Description from "../components/Description";
import Images from "../components/Images";
import MenuNavBar from "../components/MenuNavBar";
import MenuTitle from "../components/MenuTitle";
import Rating from "../components/Rating";
import ReservationCard from "../components/ReservationCard";
import Reviews from "../components/Reviews";

const prisma = new PrismaClient();

interface RestaurantType{
id:number,
name:string,
images:string[],
description:string,
slug:string,
reviews:Review[],
open_time:string,
close_time:string

}

const fetchRestaurantDetails = async (slug:string):Promise<RestaurantType> =>{
  const restaurant = await prisma.restaurant.findFirst({where:{slug},
  select:{
    id:true,
    name:true,
    images:true,
    description:true,
    slug:true,
    reviews:true,
    open_time: true,
    close_time:true
  }
  });
  if(!restaurant){
    //throw new Error("Restaurant Not found");
    notFound();
  }
  return restaurant;
}

export default async function RestaurantDetails({params}:{params:{slug:string}}) {
  const restaurant = await fetchRestaurantDetails(params.slug);
  console.log(restaurant);
  return (
    <>
       <div className="rounded bg-white w-[70%] shadow p-3">
          <MenuNavBar slug={restaurant.slug} />
          <MenuTitle title={restaurant?.name} />
          <Rating reviews={restaurant.reviews}/>
          <Description description={restaurant.description} />
          <Images images={restaurant.images}/>
          <Reviews reviews={restaurant.reviews}/>
        </div>
        <div className="relative w-[27%] text-reg">
          <ReservationCard openTime={restaurant.open_time} closeTime={restaurant.close_time} slug={restaurant.slug}/>
        </div>
    </>
  );
}
