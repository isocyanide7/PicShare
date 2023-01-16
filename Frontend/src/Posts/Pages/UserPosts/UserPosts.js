import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import useHttpClient from "../../../Shared/Hooks/http-hook";
import PostList from "../../Components/PostList/PostList";
import ErrorModal from "../../../Shared/Components/UIElements/ErrorModal/ErrorModal";
import LoadingSpinner from "../../../Shared/Components/UIElements/LoadingSpinner/LoadingSpinner";

const UserPosts = () => {
  const [loadedPosts, setLoadedPosts] = useState();
  const { isLoading, error, sendRequest, errorHandler } = useHttpClient();
  const userId = useParams().userId;

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/posts/users/${userId}`
        );
        setLoadedPosts(responseData.posts);
      } catch (err) {}
    };
    fetchPlaces();
  }, [sendRequest, userId]);

  const deleteHandler=(deletedPostId)=>{
    setLoadedPosts(prevPosts=>prevPosts.filter(post=>post.id!==deletedPostId));
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={errorHandler} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedPosts && <PostList items={loadedPosts} onDelete={deleteHandler}/>}
    </React.Fragment>
  );
};

export default UserPosts;
