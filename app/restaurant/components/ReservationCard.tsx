"use client"
import { partysize,times } from "../../../data";
import DatePicker from "react-datepicker";
import { useState } from "react";

//import {useAvailabilites} from "../../../hooks/useAvailabilities";
function ReservationCard({openTime, closeTime,slug}: {openTime:string, closeTime:string, slug:string}) {
  const [startDate, setStartDate] = useState<Date|null>(new Date());
  const {data, loading, error, fetchAvailabilites} = useAvailabilites();
  const [partyNo, setPartyNo] = useState("2");
  const [time, setTime] = useState("");
  const [day,setDay] = useState(new Date().toISOString().split("T")[0].toString());

  const handleChangeDate = (date:Date|null)=>{
    if(date){
      setDay(date.toISOString().split("T")[0].toString());
      return setStartDate(date);
    }
    else 
      return setStartDate(null);
  }

  
  const filterTimes =()=>{

    const filterWindowTimes: typeof times = [];
    let isWithinWindow = false;

    times.forEach((time)=>{ 
      if(time.time === openTime){
        isWithinWindow = true;
      }
      if(isWithinWindow){
        filterWindowTimes.push(time)
      }
      if(time.time === closeTime){
        isWithinWindow = false;
      }
    });
    return filterWindowTimes;
  } 

  const findReservationHandler= () =>{
    fetchAvailabilites({
      slug,
      day,
      partysize:partyNo,
      time
    });
  }

    return ( <div className="fixed w-[20%] bg-white shadow p-3">
    <div className="text-center border-b pb-2 font-bold">
      <h4 className="font-bold mr-7">Make a Reservation  {time}</h4>
    </div>
    <div className="my-3 flex flex-col">
      <label htmlFor="">No. of diners</label> 
      <select id="" name="" className="border-b font-light py-3" value={partyNo} onChange={(e)=>(setPartyNo(e.currentTarget.value))}>
        {partysize.map(size=>(<option key={size.label} value={size.value}>{size.label}</option>))}
      </select>
    </div>
    <div className="my-3 flex justify-between">
      <div className="flex flex-col">
        <label htmlFor="">Date</label>
        <DatePicker title="calendar" className="w-[80%] mt-3 border-b font-light" selected={startDate} onChange={handleChangeDate} dateFormat="MMMM d" />

      </div>
      <div className="flex flex-col w-[48%]">
        <label htmlFor="">Time</label>
        <select id="" name="" className="border-b font-light py-3" value={time} onChange={(e)=>(setTime(e.target.value))}>
          {filterTimes().map((time)=>(<option key={time.time} value={time.time}>{time.displayTime}</option>))}
          
        </select>
      </div>
    </div>
    <div className="mt-5">
      <button className="rounded bg-red-600 w-full py-2 text-white" disabled={loading} onClick={findReservationHandler}>
        {loading ? <CircularProgress color="inherit"/> : "Find a time"}</button>
    </div>
    {(data && data.length > 0) ? 
      <div className="mt-4">
        <p className="text-reg">Select a Time</p>
          <div className="flex flex-wrap mt-2">
            {data.map((timeSlot) => {
              return timeSlot.available ? <Link href={`/reserve/${slug}?date=${day}T${timeSlot}`} className="bg-red-600 p-2 w-24 text-white cursor-pointer mb-3 rounded mr-2">
              <p className="text-sm font-bold">{convertToDisplayTime(timeSlot.time as Time)}</p></Link> :          
                <p className="bg-gray-300 p-2 mb-3 w-24"></p>
              
            })}
          </div>
      </div> : null}

</div> );
}
import useAvailabilites from "../../../hooks/useAvailabilities";
import { CircularProgress } from "@mui/material";
import Link from "next/link";
import { convertToDisplayTime, Time } from "../../../utils/convertToDisplayTime";

export default ReservationCard;