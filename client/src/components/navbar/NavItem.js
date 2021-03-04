import React from "react";
import { Link } from "react-router-dom";

const NavItem = ({ route, icon, text }) => {
  return (
    <Link to={route} className="flex items-center gap-2 cursor-pointer hover:text-purple-200 focus:outline-none">
      <i className="material-icons">{icon}</i>
      <span>{text}</span>
    </Link>
  );
};

export default NavItem;
