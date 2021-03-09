import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/routing/PrivateRoute";
import Navbar from "./layouts/Navbar";
import Blog from "./pages/Blog";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PostBlog from "./pages/PostBlog";
import Register from "./pages/Register";
import UpdateBlog from "./pages/UpdateBlog";
import UpdateProfile from "./pages/UpdateProfile";
import UserProfile from "./pages/UserProfile";
import { load_user, logout } from "./redux/reducers/userReducer";
import store from "./redux/store";
import setAuthToken from "./utils/setAuthToken";

const App = () => {
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    store.dispatch(load_user());

    window.addEventListener("storage", () => {
      if (!localStorage.token) {
        store.dispatch(logout());
      }
    });
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Switch>
          <>
            <div className="w-11/12 mx-auto mt-10">
              <Route exact path="/" component={Home} />
              <Route path="/blogs/:id" component={Blog} />
              <Route path="/register" component={Register} />
              <Route path="/login" component={Login} />
              <Route path="/users/profile/:id" component={UserProfile} />
              <PrivateRoute path="/dashboard" component={Dashboard} />
              <PrivateRoute path="/postblog" component={PostBlog} />
              <PrivateRoute path="/updateblog/:id" component={UpdateBlog} />
              <PrivateRoute path="/updateprofile" component={UpdateProfile} />
            </div>
          </>
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
