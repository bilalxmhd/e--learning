import Image from "next/image";
import React from "react";

function WelcomeBannerDashboard({ user }) {
  return (
    <div
      className="flex gap-5 items-center bg-white rounded-xl p-5
  "
    >
      <Image src="/helo.jpg" alt="helo" width={150} height={150} />
      <div>
        <h2 className="font-light text-[32px]">
          Welcome Back,
          <span className="font-bold text-primary"> {user?.fullName}</span>
        </h2>
        <h2 className="text-[16px] font-light text-gray-500">
          Lets Begin Learning where you left off,
          <br /> keep it up and improve your progress
        </h2>
      </div>
    </div>
  );
}

export default WelcomeBannerDashboard;
