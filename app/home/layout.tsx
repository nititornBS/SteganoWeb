"use client";
import "./globals.css";
import Image from "next/image";
import Logo from "../public/logo.png";
import Link from "next/link";
import icondecode from "../public/decode.svg";
import iconencode from "../public/encode.svg";
import icontext from "../public/TextToImage.svg";
import iconarrow from "../public/arrow_left.svg";
import { useState } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
      name: "Text-To-image",
      href: "/ttimg",
      icon: icontext,
    },
  ];
  const [istogle, settogle] = useState<boolean>(true);

  const togglebar = () => {
    settogle((prev) => !prev);
  };
  return (
    <html lang="en">
      <head>
    
      </head>
      <body>

        <div className="flex w-screen h-screen  ">
          <aside
            className="flex flex-col w-[10%] h-screen border-2 border-gray-500 gap-1 justify-between transition--all duration-500"
            data-collapse={istogle}
          >
            <div>
              <div className="flex mx-5 mt-3 pb-3   items-center border-2  border-x-0  border-t-0 border-b-orange-400">
                <Image
                  src={Logo}
                  width={50}
                  height={50}
                  alt=""
                  className="my-2"
                />
                <div
                  className={istogle ? "hidden" : "text-3xl ml-4  duration-150"}
                >
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
                    <Link href={href} className="flex h-[100%] p-2 ">
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
            <div>logout</div>
          </aside>
          <div className="flex flex-col w-[100%] h-[100%]">
            <div className="w-full h-full">{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}
