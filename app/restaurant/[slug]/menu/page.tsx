import { PrismaClient } from "@prisma/client";
import MenuComp from "../../components/MenuComp";
import MenuNavBar from "../../components/MenuNavBar";

const prisma = new PrismaClient();
const getItems = async (slug:string) =>{
  const restaurant = await prisma.restaurant.findUnique({
    where: {
    slug
    },
    select:{
      items: true
    }
});
if(!restaurant)
  throw new Error();
return restaurant.items;
}
export default async function Menu({params}:
  { 
    params : {slug:string}
  }){
    const menu = await getItems(params.slug);
    return(
      <>     
        <div className="rounded bg-white w-[100%] shadow p-3">
          <MenuNavBar slug={params.slug} />
          <MenuComp items={menu}/>
        </div>
      </>
      )
}