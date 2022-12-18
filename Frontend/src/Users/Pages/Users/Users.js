import React from "react";
import UserList from "../../Components/UserList/UserList";
import USERS from "../../../Shared/Utils/Data/UserData";

const Users = () => {
  return <UserList items={USERS} />;
};

export default Users;
