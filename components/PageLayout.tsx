import React, { FC } from "react";
import Footer from "./navigation/Footer";
import Nav from "./navigation/Nav";

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout: FC<PageLayoutProps> = ({ children }) => {
  return (
    <div
      className={`min-h-screen flex sm:flex-row flex-col bg-gradient-to-br 
      from-black via-black to-gray-900`}
    >
      <Nav />
      <div className="flex flex-col w-full">
        {children}
        <Footer />
      </div>
    </div>
  );
};

export default PageLayout;
