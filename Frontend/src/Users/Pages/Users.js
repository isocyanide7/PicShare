import React from "react";
import UserList from "../Components/UserList/UserList";

const User = () => {
  const USERS = [
    {
      id: "u1",
      name: "Nilesh Chandra",
      postCount: "7",
      image:
        "https://upload.wikimedia.org/wikipedia/en/9/96/SatoruGojomanga.png",
    },
  ];
  return <UserList items={USERS} />;
};

export default User;
