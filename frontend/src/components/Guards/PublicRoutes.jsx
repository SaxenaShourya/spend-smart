import React from "react";
import { useSelector } from "react-redux";
import { NotFound } from "../../pages";
import { Outlet } from "react-router-dom";
import NavBar from "../NavBar";

const PublicRoutes = () => {
  const userIsVerified = useSelector((state) => state.auth?.user?.verified);

  return userIsVerified ? (
    <NotFound />
  ) : (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default PublicRoutes;
