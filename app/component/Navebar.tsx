"use client";

import Image from "next/image";
import Logo from "public/Logo.png";
import Link from "next/link";
import icondecode from "@/public/decode.svg";
import iconencode from "public/encode.svg";
import icontext from "public/TextToImage.svg";
import iconarrow from "public/arrow_left.svg";
import { useState } from "react";
import { UserAuth } from "../context/AuthContext";

function Navebar() {
  const { user, googleSignIn, logOut } = UserAuth();
  const handleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (err) {
      console.log(err);
    }
  };

  const sidebarItem = [
    {
      name: "Encode",
      href: "/encode",
      icon: icondecode,
    },
    {
      name: "Decode",
      href: "/decode",
      icon: iconencode,
    },
    {
      name: "Text-To-Image",
      href: "/TextToImage",
      icon: icontext,
    },
  ];
  const [istogle, settogle] = useState<boolean>(true);

  const togglebar = () => {
    settogle((prev) => !prev);
  };
  return (
    
    <aside
      className="flex flex-col w-[10%] h-screen border-2 border-gray-500 gap-1 justify-between transition--all duration-500"
      data-collapse={istogle}
    >
      <div>
        <div className="flex mx-5 mt-3 pb-3   items-center border-2  border-x-0  border-t-0 border-b-orange-400">
          <Link href={"/"} className=" w-[100%] h-[100%]">
            <Image src={Logo} width={50} height={50} alt="" className="my-2" />
          </Link>
          <div className={istogle ? "hidden" : "text-3xl ml-4  duration-150"}>
            Stegano
          </div>
        </div>
        <div className="relative h-10 w-[100%]">
          <div className="absolute right-0 bottom-[50%] translate-y-3 border-2 ">
            <button
              onClick={togglebar}
              className="flex h-5 w-5 items-center justify-center bg-white border-2 "
            >
              <Image
                src={iconarrow}
                width={20}
                height={20}
                alt=""
                className={`${
                  istogle ? "rotate-180" : "rotate-0"
                }   transition-all duration-500`}
              />
            </button>
          </div>
        </div>
        <ul className="mx-5 gap-5 flex flex-col">
          {sidebarItem.map(({ name, href, icon }) => (
            <li
              key={name}
              className="border  bg-slate-200 border-r-4  rounded-xl"
            >
              <Link href={href} className="flex h-[100%] p-2">
                <div className="flex  items-center">
                  <Image src={icon} width={24} height={24} alt="" />
                  <span className={istogle ? "hidden" : "sideBarName"}>
                    {name}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className={istogle?"hidden":"h-[20%]  flex items-center  justify-around w-[100%]"}>
        <button className=" bg-slate-400 p-1 w-[40%] h-[20%] ">Login</button>
        <button className=" bg-slate-400 p-1 w-[40%] h-[20%]">logOut</button>
      </div>
    </aside>
  );
}

export default Navebar;
