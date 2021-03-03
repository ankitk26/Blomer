import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./layouts/Navbar";
import Blog from "./pages/Blog";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PostBlog from "./pages/PostBlog";
import Register from "./pages/Register";
import UpdateBlog from "./pages/UpdateBlog";
import store from "./redux/store";
import setAuthToken from "./utils/setAuthToken";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Switch>
          <>
            <div className="w-11/12 mx-auto mt-10">
              <Route exact path="/" component={Home} />
              <Route path="/blogs/:id" component={Blog} />
              <Route path="/postblog" component={PostBlog} />
              <Route path="/updateblog/:id" component={UpdateBlog} />
              <Route path="/register" component={Register} />
              <Route path="/login" component={Login} />
            </div>
          </>
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
