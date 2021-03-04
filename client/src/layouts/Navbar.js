import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import NavItem from "../components/navbar/NavItem";
import { clearBlogs } from "../redux/reducers/blogReducer";
import { logout } from "../redux/reducers/userReducer";

const Navbar = () => {
  const { isAuthenticated, user, loading } = useSelector((state) => state.root.users);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearBlogs());
    history.push("/login");
  };

  const authenticatedLinks = (
    <>
      <div className="flex items-center gap-2 focus:outline-none">
        <i className="material-icons">person</i>
        <span>Hello {user && user.username}</span>
      </div>

      <NavItem route="/postblog" icon="post_add" text="Post blog" />
      <NavItem route="/myblogs" icon="notes" text="My blogs" />

      <button
        className="flex items-center gap-2 cursor-pointer hover:text-purple-200 focus:outline-none"
        onClick={handleLogout}
      >
        <i className="material-icons">logout</i>
        <span>Logout</span>
      </button>
    </>
  );

  const guestLinks = (
    <>
      <NavItem route="/register" icon="person_add" text="Register" />
      <NavItem route="/login" icon="login" text="Login" />
    </>
  );

  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-purple-700">
      <Link to="/">
        <h1 className="text-2xl cursor-pointer text-gray-50 hover:text-purple-200">Blomer</h1>
      </Link>
      <div className="flex items-center gap-10 text-gray-50">{isAuthenticated ? authenticatedLinks : guestLinks}</div>
    </nav>
  );
};

export default Navbar;
