import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import defaultAvatar from "../../assets/images/default_user.svg";

const ProfileInfo = ({ profile }) => {
  const { user, isAuthenticated } = useSelector((state) => state.root.users);

  return (
    <div className="flex flex-col items-center col-span-1 p-3">
      <img src={defaultAvatar} alt="Avatar" className="w-4/5" />
      <h1 className="mt-5 text-xl text-gray-800">{profile.name}</h1>
      <h1 className="self-start mt-5 text-gray-600">{profile.bio}</h1>

      {user && user._id === profile._id && isAuthenticated && (
        <Link to="/updateprofile">
          <button className="mt-5 btn-purple">Update profile</button>
        </Link>
      )}
    </div>
  );
};

export default ProfileInfo;
