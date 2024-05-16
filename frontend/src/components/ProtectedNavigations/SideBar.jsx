import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
  Dashboard,
  Income,
  Expense,
  Settings,
  ShutDown as Logout,
} from "../../utils/Icons";
import { openModal } from "../../features/logoutModal/logoutModalSlice";

import logo from "/logo.webp";

const SideBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const isRouteActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="hidden xl:flex flex-col w-[15%] h-full border-r-1 border-secondary py-3">
      <div className="px-4 flex items-center gap-x-2">
        <img src={logo} alt="spend smart logo" className="w-[2.5rem]" />
        <h5 className="text-xl font-outfit">
          Spend<span className="text-primary text-xl">Smart.</span>
        </h5>
      </div>
      <menu className="w-full h-full flex flex-col px-3 mt-12">
        <div className="space-y-6 flex flex-col">
          <li
            className={`link ${
              isRouteActive("/dashboard") ? "activeLink" : ""
            }`}
            onClick={() => {
              navigate("/dashboard");
            }}
          >
            <Dashboard className="size-[1.5rem]" />
            Dashboard
          </li>
          <li
            className={`link ${
              isRouteActive("/dashboard/incomes") ? "activeLink" : ""
            }`}
            onClick={() => {
              navigate("/dashboard/incomes");
            }}
          >
            <Income className="size-[1.5rem]" />
            Incomes
          </li>
          <li
            className={`link ${
              isRouteActive("/dashboard/expenses") ? "activeLink" : ""
            }`}
            onClick={() => {
              navigate("/dashboard/expenses");
            }}
          >
            <Expense className="size-[1.5rem]" />
            Expenses
          </li>
        </div>
        <li
          className={`link mt-auto ${
            isRouteActive("/dashboard/settings") ? "activeLink" : ""
          }`}
          onClick={() => {
            navigate("/dashboard/settings");
          }}
        >
          <Settings className="size-[1.5rem]" />
          Settings
        </li>
        <li
          className="link mt-6 hover:bg-error hover:text-white"
          onClick={() => dispatch(openModal())}
        >
          <Logout className="size-[1.5rem]" />
          Logout
        </li>
      </menu>
    </nav>
  );
};

export default SideBar;
