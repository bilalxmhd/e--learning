"use client";
import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import GlobalApi from "./_utils/GlobalApi";

export default function Home() {
  const router = useRouter();
  const { user, isLoaded } = useUser();
  useEffect(() => {
    if (user) {
      checkUserMemberShip();
      router.push("/dashboard");
    } else {
      isLoaded && router.push("/courses");
    }
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
      <UserButton afterSignOutUrl="/Sign-in"></UserButton>
    </div>
  );
}
