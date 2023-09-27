"use client";
import "./globals.css";
import Navebar from "./component/Navebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head></head>
      <body>
        <div className="flex">
      
          <Navebar />
          <div className="flex flex-col w-full h-full">
            <div className="w-full h-full">{children}</div>
          </div>
        
        </div>

      </body>
    </html>
  );
}
