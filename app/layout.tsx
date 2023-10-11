"use client";
import "./globals.css";
import Navebar from "./component/Navebar";
import { AuthContextProvider } from "./context/AuthContext";

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
          <AuthContextProvider>
            <Navebar />
            
            <div className="flex flex-col w-full h-full">
              <div className="w-full h-full">{children}</div>
            </div>
          </AuthContextProvider>
        </div>
      </body>
    </html>
  );
}
