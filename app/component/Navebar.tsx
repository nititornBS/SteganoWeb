"use client";

import Image from "next/image";
import Logo from "public/logo.png";
import Link from "next/link";
import icondecode from "@/public/decode.svg";
import iconencode from "public/encode.svg";
import icontext from "public/TextToImage.svg";
import iconarrow from "public/arrow_left.svg";
import { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { Spinner } from "@nextui-org/react";

function Navebar() {
  const { user, googleSignIn, logOut } = UserAuth();
  console.log(user);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      setLoading(false);
    };
    checkAuthentication();
  }, [user]);
  const handleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      setLoading(false);
    };
    checkAuthentication();
  }, [user]);
  // const {user,usersurname} = UserAuth();

  // console.log(user);

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
  
  ];
  const [istogle, settogle] = useState<boolean>(true);

  const togglebar = () => {
    settogle((prev) => !prev);
  };
  return (
    <aside
      className="flex flex-col w-[10%] h-screen border-2 border-gray-500 gap-1 justify-between transition--all duration-250"
      data-collapse={istogle}
    >
      <div className="">
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
        <ul className=" gap-5 flex items-center flex-col w-[100%] ">
          {sidebarItem.map(({ name, href, icon }) => (
            <li
              key={name}
              className="border duration-150  bg-slate-200  w-[85%] hover:w-[95%] rounded-xl hover:bg-blue-500"
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
          {user ? (
            <div className="border duration-150  bg-slate-200  w-[85%] hover:w-[95%] rounded-xl hover:bg-blue-500">
              <Link href="/TextToImage" className="flex h-[100%] p-2">
                <div className="flex  items-center">
                  <Image src={icontext} width={24} height={24} alt="" />
                  <span className={istogle ? "hidden" : "sideBarName"}>
                    Text-to-Image
                  </span>
                </div>
              </Link>
            </div>
          ) : (
            <div className="border duration-150  bg-slate-200  w-[85%] hover:w-[95%] rounded-xl hover:bg-blue-500">
              <button className="flex h-[100%] p-2" onClick={()=>{alert("Please login to unlock this feature.");}}>
                  <div className="flex  items-center">
                    <Image src={icontext} width={24} height={24} alt="" />
                    <span className={istogle ? "hidden" : "sideBarName"}>
                      Text-to-Image
                    </span>
                  </div>
       
              </button>
            </div>
          )}
        </ul>
      </div>
      <div
        className={
          istogle
            ? "hidden"
            : "h-[20%]  flex items-center  justify-around w-[100%]"
        }
      >
        {user ? (
          <div className="w-full h-auto flex items-center flex-col">
            <div className="p-4 flex flex-col items-center bg-slate-200">
              {loading ? (
                <Spinner />
              ) : user ? (
                <p className=" py-3">Welcome, {user.displayName}</p>
              ) : null}
              <button
                className=" bg-slate-400 p-1 w-[40%] h-[20%] hover:bg-blue-500 transition"
                onClick={handleSignOut}
              >
                logout
              </button>
            </div>
          </div>
        ) : (
          <button
            className=" bg-slate-400 p-1 w-[40%] h-[20%] hover:bg-blue-500 transition  "
            onClick={handleSignIn}
          >
            Login
          </button>
        )}
      </div>
    </aside>
  );
}

export default Navebar;
