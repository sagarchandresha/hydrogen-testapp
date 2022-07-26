import React from "react";

const MenuDropdown = ({ submenu, showSubmenu }) => {
  return showSubmenu && <>{submenu}</>;
};

export default MenuDropdown;
