import axios from "axios";
import { useState } from "react";

export default function useAvailabilites(){
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState<{time: string,available: boolean}[]|null>(null);

    const  fetchAvailabilites= async({slug,day,partysize,time}:{slug:string;day:string; partysize:string; time:string})=>{
        setLoading(true);

        console.log(slug,day,partysize,time)
        try{
            const response = await axios.get(`http://localhost:3000/api/restaurant/${slug}/availability`,
                         {   params:{
                                day,
                                time,
                                partysize
                            }
                        }
            );
            setLoading(false);
            setData(response.data);

        }
        catch(error:any ){
            setLoading(false);

            setError(error.response.data.errorMessage);
        }
    }
    return {loading,data,error,fetchAvailabilites }
}