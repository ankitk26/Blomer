import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-purple-700">
      <Link to="/">
        <h1 className="text-2xl cursor-pointer text-gray-50 hover:text-purple-200">Blomer</h1>
      </Link>
      <div className="flex items-center gap-5 text-gray-50">
        <Link to="/postblog" className="cursor-pointer hover:text-purple-200">
          Post blog
        </Link>
        <Link to="/register" className="cursor-pointer hover:text-purple-200">
          Register
        </Link>
        <Link to="/login" className="cursor-pointer hover:text-purple-200">
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
