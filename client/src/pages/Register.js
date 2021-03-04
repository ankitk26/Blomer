import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import FormControl from "../components/authPages/FormControl";
import { clearErrors, register_user } from "../redux/reducers/userReducer";

const Register = (props) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const { isAuthenticated, errors } = useSelector((state) => state.root.users);

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/myblogs");
    }

    return () => {
      dispatch(clearErrors());
    };
  }, [isAuthenticated, props.history]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register_user({ email, username, password }));
  };

  return (
    <div className="text-center">
      <h1 className="text-2xl text-gray-700">Register</h1>
      <form onSubmit={handleSubmit}>
        <FormControl htmlFor="email" type="email" value={email} onChange={setEmail} error={errors && errors.email} />
        <FormControl
          htmlFor="username"
          type="text"
          value={username}
          onChange={setUsername}
          error={errors && errors.username}
        />
        <FormControl
          htmlFor="password"
          type="password"
          value={password}
          onChange={setPassword}
          error={errors && errors.password}
        />
        <button className="mt-5 btn-purple">Register</button>
        <p className="mt-10 text-sm text-gray-600">
          Already registered? Login{" "}
          <Link to="/login" className="font-bold text-purple-700">
            here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
