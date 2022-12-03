import React from "react";
import UserItem from "../UserItem/UserItem";
import "./UserList.css";

const UserList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <h2>No Users Found</h2>
      </div>
    );
  }

  return (
    <div className="center">
      <ul>
        {props.items.map((item) => (
          <UserItem
            key={item.id}
            id={item.id}
            name={item.name}
            image={item.image}
            postCount={item.postCount}
          />
        ))}
      </ul>
    </div>
  );
};

export default UserList;
