import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import App from "./app";
import Login from "./login";

const Page = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Page;
