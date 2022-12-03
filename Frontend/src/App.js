import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import User from "./Users/Pages/Users";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<User />} />
        <Route path="/in" element="dasaoijdsa" />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
