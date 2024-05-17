import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import TopLoadingBar from "./components/TopLoadingBar";
import {
  Home,
  NotFound,
  Register,
  Login,
  Dashboard,
  MainDashboard,
  Incomes,
  Expenses,
  Settings,
} from "./pages";
import { PublicRoutes, ProtectedRoutes } from "./components/Guards";

const App = () => {
  return (
    <>
      <TopLoadingBar />
      <ToastContainer
        position="bottom-right"
        autoClose={2500}
        pauseOnHover={false}
        theme="dark"
        transition={Slide}
        toastClassName="font-outfit max-w-xs rounded-lg ml-4 sm:ml-0 mb-2"
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/" element={<PublicRoutes />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="/" element={<ProtectedRoutes />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="/dashboard" element={<MainDashboard />} />
            <Route path="/dashboard/incomes" element={<Incomes />} />
            <Route path="/dashboard/expenses" element={<Expenses />} />
            <Route path="/dashboard/settings" element={<Settings />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
