import React from "react";
import defaultAvatar from "../../assets/images/default_user.svg";

const ProfileInfo = ({ profile }) => {
  return (
    <div className="flex flex-col col-span-1 p-3">
      <img src={defaultAvatar} alt="Avatar" className="w-4/5" />
      <h1 className="mt-5 text-xl text-gray-800">{profile.name}</h1>
      <h1 className="mt-5 text-gray-600">{profile.bio}</h1>
    </div>
  );
};

export default ProfileInfo;
