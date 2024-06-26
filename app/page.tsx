"use client";
import "./globals.css";
import Image from "next/image";
import Logo from "../public/logo.png";
import Link from "next/link";
import icondecode from "../public/decode.svg";
import iconencode from "../public/encode.svg";
import icontext from "../public/TextToImage.svg";
import { UserAuth } from "./context/AuthContext";
function page() {
  const { user, googleSignIn, logOut } = UserAuth();
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
  return (
    <div className=" h-screen w-full bg-green  flex justify-center items-center  bg-gray-400  duration-250">
      <div className=" w-[80%] h-[70%] flex-col flex justify-center items-center bg-white rounded-lg drop-shadow-2xl">
        <div className="flex-col w-[90%] items-center justify-center lg:flex lg:flex-row">
          <div className="w-[100%] flex justify-center items-center">
            <Image src={Logo} width={170} height={170} alt="" className="" />
          </div>

          <div className="flex flex-col justify-center items-center">
            <div className=" text-[25px] text-center lg:text-[70px] flex items-center ">
              Welcome to Stegano
            </div>
            <div className="w-[100%]">
              <ul className="mx-5 gap-5 flex pt-8 justify-evenly">
                {sidebarItem.map(({ name, href, icon }) => (
                  <li
                    key={name}
                    className="border  w-[200px] h-[100px] text-xl drop-shadow-lg  bg-slate-400 border-r-4  rounded-xl hover:bg-blue-500 transition"
                  >
                    <Link
                      href={href}
                      className="flex flex-col items-center justify-center h-[100%] p-2 "
                    >
                      <span className="sideBarName">{name}</span>
                      <div className="flex  items-center">
                        <Image src={icon} width={24} height={24} alt="" />
                      </div>
                    </Link>
                  </li>
                ))}
                {user ? (
                  <div className="border  w-[200px] h-[100px] text-xl drop-shadow-lg  bg-slate-400 border-r-4  rounded-xl hover:bg-blue-500 transition">
                    <Link
                      href="/TextToImage"
                      className="flex flex-col items-center justify-center h-[100%] p-2 "
                      onClick={() => {
                        user
                          ? null
                          : alert("Please select the encoded images.");
                      }}
                    >
                      <span className="sideBarName">Text-to-Image</span>
                      <div className="flex  items-center">
                        <Image src={icontext} width={24} height={24} alt="" />
                      </div>
                    </Link>
                  </div>
                ) : (
                  <div className="border  w-[200px] h-[100px] text-xl drop-shadow-lg  bg-slate-400 border-r-4 flex justify-center  rounded-xl hover:bg-blue-500 transition">
                    <button className="flex flex-col items-center justify-center h-[100%] p-2" onClick={()=>{alert("Please login to unlock this feature.");}}>
                     
                        <span className="sideBarName">Text-to-Image</span>
                        <div className="flex  items-center">
                          <Image src={icontext} width={24} height={24} alt="" />
                        </div>
                     
                    </button>
                  </div>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
