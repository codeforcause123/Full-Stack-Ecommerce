import React from "react";
import Header  from "./Header.js";
import Footer from "./Footer.js";
export const Layout = (props) => {
  return (
    <div>
      <Header />
      <main className="h-screen">{props.children}</main>
      <Footer />
    </div>
  );
};