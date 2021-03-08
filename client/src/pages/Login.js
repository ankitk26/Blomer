import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import FormControl from "../components/authPages/FormControl";
import { clearErrors, login_user } from "../redux/reducers/userReducer";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isAuthenticated, errors } = useSelector((state) => state.root.users);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/dashboard");
    }

    return () => {
      dispatch(clearErrors());
    };
    // eslint-disable-next-line
  }, [isAuthenticated, props.history]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login_user({ email, password }));
  };

  return (
    <div className="text-center">
      <h1 className="text-2xl text-gray-700">Login</h1>
      <form onSubmit={handleSubmit}>
        <FormControl htmlFor="email" type="email" value={email} onChange={setEmail} error={errors && errors.email} />
        <FormControl
          htmlFor="password"
          type="password"
          value={password}
          onChange={setPassword}
          error={errors && errors.password}
        />
        <button className="mt-5 btn-purple">Login</button>
        <p className="mt-10 text-sm text-gray-600">
          Not registered? Register{" "}
          <Link to="/register" className="font-bold text-purple-700">
            here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
