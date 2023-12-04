function ReservationForm() {
    return ( <div className="flex justify-between flex-wrap mt-10 w-[660px]">
    <input className="border rounded p-3 w-80 mb-4" placeholder="First Name"></input>
    <input className="border rounded p-3 w-80 mb-4" placeholder="Last Name"></input>
    <input className="border rounded p-3 w-80 mb-4" placeholder="Phone"></input>
    <input className="border rounded p-3 w-80 mb-4" placeholder="Email"></input>
    <input className="border rounded p-3 w-80 mb-4" placeholder="Occasion (optional)"></input>
    <input className="border rounded p-3 w-80 mb-4" placeholder="Requests"></input>
    <button className="bg-red-400 rounded disabled:bg-gray-300 text-white font-bold w-full my-2 pb-2 pt-2">Complete reservation</button>
    <p className="text-sm mt-2">By clicking “Complete reservation” you agree to the OpenTable Terms of Use and Privacy Policy. Message & data rates may apply. You can opt out of receiving text messages at any time in your account settings or by replying STOP.</p>
  </div>
);
}

export default ReservationForm;