import React, { useState } from "react";
import { Link } from "react-router-dom";
import FormControl from "../components/authPages/FormControl";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password });
  };

  return (
    <div className="text-center">
      <h1 className="text-2xl text-gray-700">Login</h1>
      <form onSubmit={handleSubmit}>
        <FormControl htmlFor="email" type="email" value={email} onChange={setEmail} />
        <FormControl htmlFor="password" type="password" value={password} onChange={setPassword} />
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
