import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainNavigation from "./Shared/Components/Navigation/MainNavigation/MainNavigation";
import User from "./Users/Pages/Users";

const App = () => {
  return (
    <BrowserRouter>
    <MainNavigation/>
    <main>
      <Routes>
        <Route path="/" element={<User />} />
        <Route path="/in" element="dasaoijdsa" />
        <Route path="*" element={<Navigate to="/in" replace />} />
      </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
