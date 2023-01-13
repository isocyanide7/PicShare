import React, { useEffect, useState } from "react";

import UserList from "../../Components/UserList/UserList";
import useHttpClient from "../../../Shared/Hooks/http-hook";
import ErrorModal from "../../../Shared/Components/UIElements/ErrorModal/ErrorModal";
import LoadingSpinner from "../../../Shared/Components/UIElements/LoadingSpinner/LoadingSpinner";

const Users = () => {
  const [loadedUsers, setLoadedUsers] = useState([]);
  const {isLoading, error,sendRequest,errorHandler} =useHttpClient();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest("http://localhost:5000/api/users/");
        setLoadedUsers(responseData.users);
      } catch (err) {
      }
    };
    fetchUsers();
  }, [sendRequest]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={errorHandler} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner asOverlay />
        </div>
      )}
      {!isLoading && loadedUsers && <UserList items={loadedUsers} />}
    </React.Fragment>
  );
};

export default Users;
