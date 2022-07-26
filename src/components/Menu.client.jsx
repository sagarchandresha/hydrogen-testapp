import { Link } from "@shopify/hydrogen";
import React, { useState } from "react";
import MenuDropdown from "./MenuDropdown.client";
import styles from "../styles/Menu.module.css";

const Menu = () => {
  const [activeMenu, setActiveMenu] = useState("");
  return (
    <div>
      <ul className={`flex gap-3 uppercase font-bold ${styles.mainMenu}`}>
        <li
          className="relative"
          onMouseEnter={(e) => setActiveMenu(e.target.text)}
          onMouseLeave={() => setActiveMenu("")}
        >
          <Link to="/" className="hover:text-cyan-600">
            location
          </Link>
          <MenuDropdown
            submenu={<LocationSubmenu />}
            showSubmenu={activeMenu == "location" ? true : false}
          />
        </li>
        <li className="relative">
          <Link to="/" className="hover:text-cyan-600">
            shop
          </Link>
        </li>
        <li
          className="relative"
          onMouseEnter={(e) => setActiveMenu(e.target.text)}
          onMouseLeave={() => setActiveMenu("")}
        >
          <Link to="/" className="hover:text-cyan-600">
            journal
          </Link>
          <MenuDropdown submenu={<JournalSubmenu />} showSubmenu={activeMenu == "journal" ? true : false}/>
        </li>
        <li className="relative">
          <Link to="/" className="hover:text-cyan-600">
            service
          </Link>
        </li>
      </ul>
    </div>
  );
};

const LocationSubmenu = () => {
  return (
    <ul className="absolute top-100 left-0 z-10 bg-white text-black min-w-[max-content]">
      <li>
        <Link to="/" className="hover:text-rose-600">
          India
        </Link>
      </li>
      <li>
        <Link to="/" className="hover:text-rose-600">
          USA
        </Link>
      </li>
      <li>
        <Link to="/" className="hover:text-rose-600">
          Canada
        </Link>
      </li>
    </ul>
  );
};

const JournalSubmenu = () => {
  return (
    <ul className="absolute top-100 left-0 z-10 bg-white text-black  min-w-[max-content]">
      <li>
        <Link to="/" className="hover:text-rose-600">
          Neat Cities
        </Link>
      </li>
      <li>
        <Link to="/" className="hover:text-rose-600">
          Before & After
        </Link>
      </li>
      <li>
        <Link to="/" className="hover:text-rose-600">
          Behind the Scene
        </Link>
      </li>
    </ul>
  );
};

export default Menu;
