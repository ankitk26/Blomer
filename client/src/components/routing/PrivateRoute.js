import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.root.users);

  return (
    <Route
      {...rest}
      render={(props) => (!isAuthenticated && !loading ? <Redirect to="/login" /> : <Component {...props} />)}
    />
  );
};

export default PrivateRoute;