import React from "react";
import UserItem from "../UserItem/UserItem";
import Card from "../../../Shared/Components/UIElements/Card/Card";
import "./UserList.css";

const UserList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <Card>
        <h2>No Users Found</h2>
        </Card>
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
            postCount={item.posts.length}
          />
        ))}
      </ul>
    </div>
  );
};

export default UserList;
