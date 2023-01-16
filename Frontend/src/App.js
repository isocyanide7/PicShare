import React, { useCallback, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import UserPosts from "./Posts/Pages/UserPosts/UserPosts";
import MainNavigation from "./Shared/Components/Navigation/MainNavigation/MainNavigation";
import Users from "./Users/Pages/Users/Users";
import NewPost from "./Posts/Pages/NewPost/NewPost";
import UpdatePost from "./Posts/Pages/UpdatePost/UpdatePost";
import Authenticate from "./Users/Pages/Authenticate/Login/Authenticate";
import AuthContext from "./Shared/Context/auth-context";
import ErrorModal from "./Shared/Components/UIElements/ErrorModal/ErrorModal";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId]=useState(null);

  const login = useCallback((uid) => {
    setIsLoggedIn(true);
    setUserId(uid);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
  }, []);

  let routes;
  if (isLoggedIn) {
    routes = (
      <Routes>
        <Route exact path="/" element={<Users />} errorElement={<ErrorModal />} />
        <Route
          exact
          path="/posts/new"
          element={<NewPost />}
          errorElement={<ErrorModal />}
        />
        <Route
          exact
          path="/posts/:postId"
          element={<UpdatePost />}
          errorElement={<ErrorModal />}
        />
        <Route
          exact
          path="/:userId/posts"
          element={<UserPosts />}
          errorElement={<ErrorModal />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route exact path="/" element={<Users />} errorElement={<ErrorModal />} />
        <Route
          exact
          path="/:userId/posts"
          element={<UserPosts />}
          errorElement={<ErrorModal />}
        />
        <Route
          exact
          path="/authenticate"
          element={<Authenticate />}
          errorElement={<ErrorModal />}
        />
        <Route path="*" element={<Navigate to="/authenticate" replace />} />
      </Routes>
    );
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn,userId:userId, login: login, logout: logout }}
    >
      <BrowserRouter>
        <MainNavigation />
        <main>{routes}</main>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default App;
