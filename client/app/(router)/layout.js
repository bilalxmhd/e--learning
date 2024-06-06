"use client";
import React, { useContext, useEffect } from "react";
import SideNav from "./_components/SideNav";
import Header from "./_components/Header";
import { useUser } from "@clerk/nextjs";
import { UserMemberContext } from "../_context/UserMemberContext";
import GlobalApi from "../_utils/GlobalApi";

function layout({ children }) {
  const { user } = useUser;
  const { isMember, setIsMember } = useContext(UserMemberContext);
  useEffect(() => {
    user && checkUserMemberShip();
  }, [user]);

  const checkUserMemberShip = () => {
    GlobalApi.checkForMemberShip(user.primaryEmailAddress.emailAddress).then(
      (resp) => {
        console.log(resp);
        if (resp?.memberships?.length > 0) {
          console.log("Its Member");
          setIsMember(true);
        }
      }
    );
  };

  return (
    <div>
      <div className="sm:w-64 sm:block fixed">
        <SideNav />
      </div>

      <div className="sm:ml-64">
        <Header />
      </div>
      <div className="sm:ml-64">{children}</div>
    </div>
  );
}

export default layout;
