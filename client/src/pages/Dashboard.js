import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfileBlogs from "../components/profile/ProfileBlogs";
import ProfileInfo from "../components/profile/ProfileInfo";
import Spinner from "../layouts/Spinner";
import { get_current_user_blogs } from "../redux/reducers/blogReducer";

const Dashboard = () => {
  const { loading, user } = useSelector((state) => state.root.users);

  const dispatch = useDispatch();
  const { blogs } = useSelector((state) => state.root.blogs);

  useEffect(() => {
    dispatch(get_current_user_blogs());
    // eslint-disable-next-line
  }, [loading]);

  return loading ? (
    <Spinner />
  ) : (
    user && (
      <>
        <h1 className="text-3xl text-gray-800">{user.name}</h1>
        <div className="grid grid-cols-6 gap-32 mt-8">
          <ProfileInfo profile={user} />
          <ProfileBlogs blogs={blogs} />
        </div>
      </>
    )
  );
};

export default Dashboard;
