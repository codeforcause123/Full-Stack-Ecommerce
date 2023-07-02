import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="footer">
      <h1 className="text-center">All Right Reserved &copy;</h1>
      <p className="text-center mt-3">
        <Link to="/about" className="px-3">About</Link>|<Link to="/contact" className="px-3">Contact</Link>|
        <Link to="/policy" className="px-3">Privacy Policy</Link>
      </p>
    </div>
  );
};

export default Footer;
