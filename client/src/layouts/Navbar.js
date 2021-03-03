import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearBlogs } from "../redux/reducers/blogReducer";
import { logout } from "../redux/reducers/userReducer";

const Navbar = () => {
  const { isAuthenticated, user, loading } = useSelector((state) => state.root.users);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearBlogs());
  };

  const authenticatedLinks = (
    <>
      <span className="cursor-pointer hover:text-purple-200">Hello {user && user.username}</span>
      <Link to="/postblog" className="cursor-pointer hover:text-purple-200">
        Post blog
      </Link>
      <button className="cursor-pointer hover:text-purple-200 focus:outline-none" onClick={handleLogout}>
        Logout
      </button>
    </>
  );

  const guestLinks = (
    <>
      <Link to="/register" className="cursor-pointer hover:text-purple-200">
        Register
      </Link>
      <Link to="/login" className="cursor-pointer hover:text-purple-200">
        Login
      </Link>
    </>
  );

  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-purple-700">
      <Link to="/">
        <h1 className="text-2xl cursor-pointer text-gray-50 hover:text-purple-200">Blomer</h1>
      </Link>
      <div className="flex items-center gap-5 text-gray-50">
        {loading ? <div /> : isAuthenticated ? authenticatedLinks : guestLinks}
      </div>
    </nav>
  );
};

export default Navbar;
