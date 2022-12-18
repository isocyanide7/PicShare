import React from "react";
import { useParams } from "react-router-dom";
import PostList from "../../Components/PostList/PostList";
import USERPOSTS from "../../../Shared/Utils/Data/UserPostData";

const UserPosts = (props) => {
  const userId = useParams().userId;
  const loadedPosts = USERPOSTS.filter((place) => place.creator === userId);
  return <PostList items={loadedPosts} />;
};

export default UserPosts;
