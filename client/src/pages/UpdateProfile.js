import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { update_user_profile } from "../redux/reducers/userReducer";

const UpdateProfile = (props) => {
  const { user, errors } = useSelector((state) => state.root.users);

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setBio(user.bio);
      setEmail(user.email);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, name, bio });
    dispatch(update_user_profile({ email, name, bio }));
    props.history.push("/dashboard");
  };

  return (
    <div>
      <h1 className="text-2xl">Update profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-start mt-5">
        <div className="flex flex-col w-full my-5 mt-0">
          <label htmlFor="update_email">Email</label>
          <input
            type="email"
            id="update_email"
            className={`form-control-blog ${errors && "border border-red-600 text-red-600"}}`}
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <span className="mt-2 text-sm font-bold text-red-600">{errors && errors.email}</span>
        </div>

        <div className="flex flex-col w-full mb-5">
          <label htmlFor="update_name">Name</label>
          <input
            type="text"
            id="update_name"
            className="form-control-blog"
            value={name}
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="flex flex-col w-full mb-5">
          <label htmlFor="update_bio">Bio</label>
          <TextareaAutosize
            id="update_bio"
            rowsMin={2}
            className="overflow-hidden resize-none form-control-blog h-36"
            placeholder="Bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>
        <button type="submit" className="my-10 btn-purple">
          Update profile
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
