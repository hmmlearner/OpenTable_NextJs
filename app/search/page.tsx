import RestaurantHeader from "./components/ResturantHeader";
import RestaurantCard from "./components/ResturantCard";
import SearchBar from "./components/SearchBar";
import { Cusine, Location, PRICE, PrismaClient } from "@prisma/client";
import { RestaurantCardType } from "../page";


const prisma = new PrismaClient();

/*
const getSearchCityRestaurants = (request: NextRequest)=>{
  const searchParams = request.nextUrl.searchParams;
  const location = searchParams.get("city");
  if(location !== undefined){
  prisma.restaurant.findMany({    
    where: {
    location
    } 
  });
  }
}

export interface ResturantSearch{
  id: number,
  name: string,
  price: PRICE,
  cusine: Cusine,
  location: Location,
  main_image: string
}
*/

const getSearchCityRestaurants = async (city?:string, cusine?:string, price?:PRICE):Promise<RestaurantCardType[]> =>{
  const resturants = await prisma.restaurant.findMany({    
    where: {
      location:{
        name:{
          equals:city
        }
      },
        cusine:{
          name:{
            equals:cusine
          }
        },
        price:{
            equals:price
        }
    },
    select:{
      id:true,
      name: true,
      price: true,
      cusine: true,
      location: true,
      main_image: true,
      slug: true,
      reviews:true
    } 
  });

  if(!resturants) throw new Error();
  //console.log(restaurants);
  return resturants;
}

export interface CusineType{
  id: number,
  name: string
}

export interface LocationType{
  id: number,
  name: string
}

const getCities = async ():Promise<LocationType[]>=>{
  const cities = await prisma.location.findMany({select: {
    id: true,
    name: true
  }});
  if(cities == null) throw new Error();
  console.log(cities);
  return cities;

}
const getCusines = async ():Promise<CusineType[]>=>{
  const cusines = await prisma.cusine.findMany({select: {
    id: true,
    name: true
  }});
  if(cusines == null) throw new Error();
  console.log(cusines);
  return cusines;

}

export default async function Search({searchParams}: {searchParams:{city?:string, cusine?:string, price?:PRICE}}) {
  //console.log(searchParams);
  const city = searchParams.city; 
  const cusine = searchParams.cusine;
  const price = searchParams.price?.toUpperCase();
 // console.log(price as PRICE);
  if(city == null) return;
    const restaurants = await getSearchCityRestaurants(city.toLowerCase(), cusine, price);
    console.log(restaurants);
    const cities = await getCities();
    const cusines = await getCusines();
  return (
    <>
      <RestaurantHeader />
      <div className="m-auto w-2/3 py-4 flex justify-between items-start">
        <SearchBar cities={cities} cusines={cusines} searchParams={searchParams}/>
        <div className="w-5/6 ml-3">
          { restaurants.length > 0 ? (restaurants.map(restaurant => <RestaurantCard key={restaurant.id} resturant={restaurant}/> ))
              : <p>Sorry, no restaurants found in this location</p>}
        </div>
      </div>
    </>
  );
}
