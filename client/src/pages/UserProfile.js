import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfileBlogs from "../components/profile/ProfileBlogs";
import ProfileInfo from "../components/profile/ProfileInfo";
import Spinner from "../layouts/Spinner";
import { get_user_profile } from "../redux/reducers/userReducer";

const UserProfile = (props) => {
  const id = props.match.params.id;
  console.log(props);
  const dispatch = useDispatch();

  const { loading, profile } = useSelector((state) => state.root.users);

  useEffect(() => {
    dispatch(get_user_profile(id));
    // eslint-disable-next-line
  }, [get_user_profile]);

  return loading ? (
    <Spinner />
  ) : (
    profile && (
      <>
        <h1 className="text-3xl text-gray-800">{profile.name}</h1>
        <div className="grid grid-cols-4 gap-32 mt-8">
          <ProfileInfo profile={profile} />
          <ProfileBlogs blogs={profile.blogs} />
        </div>
      </>
    )
  );
};

export default UserProfile;
