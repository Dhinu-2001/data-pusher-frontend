import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../pages/user/layout/Layout";
import Home from "../pages/user/pages/Home";
import AccountDestinations from "../pages/user/pages/AccountDestinations";
import SendData from "../pages/user/pages/SendData";
import ProtectedRoute from "../page_components/common/ProtectedRoute";
import Register from "../pages/common/Register";
import Login from "../pages/common/Login";

function UserRoutes() {
  return (
    <Routes>
      <Route path="/Register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route
          path="/accounts"
          element={
            <ProtectedRoute>
              <AccountDestinations />
            </ProtectedRoute>
          }
        />
        <Route
          path="/accounts/:id/send_data/"
          element={
            <ProtectedRoute>
              <SendData />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default UserRoutes;
