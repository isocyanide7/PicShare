import React, { useCallback, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import UserPosts from "./Posts/Pages/UserPosts/UserPosts";
import MainNavigation from "./Shared/Components/Navigation/MainNavigation/MainNavigation";
import Users from "./Users/Pages/Users/Users";
import Error from "./Shared/Components/ErrorHandler/ErrorPage/Error";
import NewPost from "./Posts/Pages/NewPost/NewPost";
import UpdatePost from "./Posts/Pages/UpdatePost/UpdatePost";
import Authenticate from "./Users/Pages/Authenticate/Login/Authenticate";
import AuthContext from "./Shared/Context/auth-context";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  let routes;
  if (isLoggedIn) {
    routes = (
      <Routes>
        <Route exact path="/" element={<Users />} errorElement={<Error />} />
        <Route
          exact
          path="/posts/new"
          element={<NewPost />}
          errorElement={<Error />}
        />
        <Route
          exact
          path="/posts/:postId"
          element={<UpdatePost />}
          errorElement={<Error />}
        />
        <Route
          exact
          path="/:userId/posts"
          element={<UserPosts />}
          errorElement={<Error />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route exact path="/" element={<Users />} errorElement={<Error />} />
        <Route
          exact
          path="/posts/:postId"
          element={<UpdatePost />}
          errorElement={<Error />}
        />
        <Route
          exact
          path="/authenticate"
          element={<Authenticate />}
          errorElement={<Error />}
        />
        <Route path="*" element={<Navigate to="/authenticate" replace />} />
      </Routes>
    );
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
    >
      <BrowserRouter>
        <MainNavigation />
        <main>{routes}</main>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default App;
