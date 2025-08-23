import React from "react";
import { Link } from "react-router-dom";

export const Start = () => {
  return (
    <div>
      <div className="bg-cover bg-centre bg-[url(https://images.unsplash.com/photo-1619059558110-c45be64b73ae?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] h-screen w-full flex justify-between flex-col bg-red-400 pt-8">
        <img className="w-14 ml-9" src="https://freelogopng.com/images/all_img/1659761100uber-logo-png.png" alt="Uber Logo" />
        <div className="bg-white pb-7 py-4 px-4">
          <h1 className="text-3xl font-bold">Get Started with Uber</h1>
          <Link to="/login" className="flex items-center justify-center w-full bg-black text-white py-3 rounded mt-5">Continue</Link>
        </div>
      </div>
    </div>
  );
};
export default Start;
