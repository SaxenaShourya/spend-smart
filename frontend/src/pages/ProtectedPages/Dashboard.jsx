import React from "react";
import { Outlet } from "react-router-dom";
import LogoutModal from "../../components/Modals/LogoutModal";

import { SideBar, TopBar } from "../../components/ProtectedNavigations";
import {
  TransactionViewAndUpdateModal,
  TransactionDeleteModal,
} from "../../components/Modals";

const Dashboard = () => {
  return (
    <main className="w-full h-full md:h-[100vh] flex">
      <LogoutModal />
      <TransactionViewAndUpdateModal />
      <TransactionDeleteModal />
      <SideBar />
      <section className="w-[100%] xl:w-[85%] h-full flex flex-col">
        <TopBar />
        <Outlet />
      </section>
    </main>
  );
};

export default Dashboard;
