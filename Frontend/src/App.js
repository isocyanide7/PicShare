import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import UserPosts from "./Posts/Pages/UserPosts";
import MainNavigation from "./Shared/Components/Navigation/MainNavigation/MainNavigation";
import Users from "./Users/Pages/Users";

const App = () => {
  return (
    <BrowserRouter>
      <MainNavigation />
      <main>
        <Routes>
          <Route path="/" element={<Users />} exact />
          <Route path="/:userId/posts" element={<UserPosts />} exact />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
