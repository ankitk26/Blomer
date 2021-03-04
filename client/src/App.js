import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/routing/PrivateRoute";
import Navbar from "./layouts/Navbar";
import Blog from "./pages/Blog";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PostBlog from "./pages/PostBlog";
import Register from "./pages/Register";
import UpdateBlog from "./pages/UpdateBlog";
import UserBlogs from "./pages/UserBlogs";
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
              <PrivateRoute path="/myblogs" component={UserBlogs} />
              <PrivateRoute path="/postblog" component={PostBlog} />
              <PrivateRoute path="/updateblog/:id" component={UpdateBlog} />
            </div>
          </>
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
