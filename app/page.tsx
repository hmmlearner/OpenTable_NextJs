import RestaurantCard from "./components/RestaurantCard";
import Header from './components/Header';
import { PrismaClient, PRICE, Cusine, Location, Review } from "@prisma/client";

export interface RestaurantCardType {
  id: number,
  name:string,
  main_image: string,
  price: PRICE,
  cusine: Cusine,
  location: Location,
  slug:string,
  reviews:Review[]
}

const prisma = new PrismaClient();

async function main():Promise<RestaurantCardType[]> {
  const restaurants = await prisma.restaurant.findMany({select:{
    id:true,
    name: true,
    main_image: true,
    price:true,
    cusine: true,
    location: true,
    slug: true,
    reviews: true
  }});
  return restaurants;
}

export default async function Home() {
  const restaurants = await main();
  console.log(restaurants);
  return (
    <main>
       <Header />
      <div className="flex flex-wrap bg-white mt-10 py-3 px-36">
        
        {restaurants.map(restaurant => (<RestaurantCard key={restaurant.id} restaurant={restaurant} />)
        )}; 
      </div> 
    </main>
  );
}

//tLk1yLKjTrhe68s0 -- supabase db password
