import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";

import {
  Menu as MenuIcon,
  Dashboard,
  Income,
  Expense,
  Settings,
  ShutDown as Logout,
} from "../../utils/Icons";
import { openModal } from "../../features/logoutModal/logoutModalSlice";

const Menu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <Dropdown onClose={() => setIsMenuOpen((prev) => !prev)}>
      <DropdownTrigger>
        <Button
          color="primary"
          startContent={<MenuIcon />}
          onClick={toggleMenu}
          isIconOnly
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Dropdown Navigations">
        <DropdownItem
          key="dashboard"
          color="primary"
          startContent={<Dashboard />}
          description="View your dashboard"
          onPress={() => navigate("/dashboard")}
        >
          Dashboard
        </DropdownItem>

        <DropdownItem
          key="incomes"
          color="success"
          startContent={<Income />}
          description="View and Edit your incomes."
          onPress={() => navigate("/dashboard/incomes")}
        >
          Incomes
        </DropdownItem>

        <DropdownItem
          key="expenses"
          color="danger"
          startContent={<Expense />}
          description="View and Edit your expenses."
          onPress={() => navigate("/dashboard/expenses")}
        >
          Expenses
        </DropdownItem>

        <DropdownItem
          key="settingss"
          color="secondary"
          startContent={<Settings />}
          description="View account Settings."
          onPress={() => navigate("/dashboard/settings")}
        >
          Settings
        </DropdownItem>

        <DropdownItem
          key="logout"
          color="danger"
          startContent={<Logout />}
          description="Sign out from your account"
          onPress={() => dispatch(openModal())}
        >
          Logout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default Menu;
