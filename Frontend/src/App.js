import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import UserPosts from "./Posts/Pages/UserPosts";
import MainNavigation from "./Shared/Components/Navigation/MainNavigation/MainNavigation";
import Users from "./Users/Pages/Users";
import Error from "./Shared/Components/ErrorHandler/ErrorPage/Error";
import NewPost from "./Posts/Pages/NewPost/NewPost";

const App = () => {
  return (
    <BrowserRouter>
      <MainNavigation />
      <main>
        <Routes>
          <Route exact path="/" element={<Users />} errorElement={<Error/>}/>
          <Route exact path="/posts/new" element={<NewPost />} errorElement={<Error/>}/>
          <Route exact path="/:userId/posts" element={<UserPosts />} errorElement={<Error/>}/>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
