import React from "react";

import Card from "../../../Shared/Components/UIElements/Card/Card";
import PostItem from "../PostItem/PostItem";
import "./PostList.css";

const PostList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No Posts Found. Create one now.</h2>
          <button>Share Post</button>
        </Card>
      </div>
    );
  }
  return (
    <ul className="place-list">
      {props.items.map((item) => (
        <PostItem
          key={item.id}
          id={item.id}
          image={item.image}
          description={item.description}
          creatorId={item.creator}
          caption={item.caption}
        />
      ))}
    </ul>
  );
};

export default PostList;
