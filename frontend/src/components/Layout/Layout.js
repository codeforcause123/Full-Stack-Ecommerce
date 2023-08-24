import React from "react";
import Header from "./Header.js";
import Footer from "./Footer.js";
import { Helmet } from "react-helmet";

export const Layout = ({children,title,description,keywords,author}) => {
  return (
    <div>
      <Helmet>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main style={{ minHeight: "70vh" }}>{children}</main>
      <Footer />
    </div>
  );
};

Layout.defaultProps = {
  title:"Ecommerce App --Visit Now",
  description:"MERN Stack Project",
  keywords:"mern,react,mongodb,express,node,nodejs",
  author: "Aayush"
}