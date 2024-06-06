"use client";
import {
  BadgeIcon,
  BookOpen,
  CrownIcon,
  GraduationCap,
  LayoutDashboardIcon,
} from "lucide-react";
import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@clerk/nextjs";

function SideNav() {
  const { user } = useUser();
  const menu = [
    {
      id: 6,
      name: "DashBoard",
      icon: LayoutDashboardIcon,
      path: "/dashboard",
      auth: user,
    },
    {
      id: 1,
      name: "All courses",
      icon: BookOpen,
      path: "/courses",
      auth: true,
    },

    {
      id: 2,
      name: "Membership",
      icon: BadgeIcon,
      path: "/membership",
      auth: true,
    },
    {
      id: 7,
      name: "Upgrade",
      icon: CrownIcon,
      path: "/pro",
      auth: true,
    },
  ];
  const path = usePathname();
  useEffect(() => {}, []);
  return (
    <div className="p-5 bg-white shadow-sm border h-screen">
      <Image src="/E-learning.svg" alt="logo" width={110} height={60} />

      <hr className="mt-7" />

      <div className="mt-5">
        {menu.map(
          (item, index) =>
            item.auth && (
              <Link href={item.path}>
                <div
                  className={`group flex gap-3 mt-2 p-3 text-[18px] items-center text-gray-500
          cursor-pointer hover:bg-black hover:text-white rounded-md
          transition-all ease-out duration-200 ${
            path.includes(item.path) && "bg-black text-white"
          }`}
                  key={index}
                >
                  <item.icon className="group-hover:animate-bounce" />
                  <h2>{item.name}</h2>
                </div>
              </Link>
            )
        )}
      </div>
    </div>
  );
}

export default SideNav;
