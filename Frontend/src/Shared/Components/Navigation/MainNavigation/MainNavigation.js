import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import MainHeader from "../MainHeader/MainHeader";
import NavigationLinks from "../NavigationLinks/NavigationLinks";
import SideDrawer from "../SideDrawer/SideDrawer";
import Backdrop from "../../UIElements/Backdrop/Backdrop";
import "./MainNavigation.css";

const MainNavigation = (props) => {
  const [drawerIsOpen, setDrawer] = useState(false);
  const openDrawerHandler = () => {
    setDrawer(true);
  };
  const closeDrawerHandler = () => {
    setDrawer(false);
  };
  return (
    <React.Fragment>
      {drawerIsOpen && <Backdrop onClick={closeDrawerHandler} />}
      <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
        <nav className="main-navigation__drawer-nav">
          <NavigationLinks />
        </nav>
      </SideDrawer>
      <MainHeader>
        <button
          className="main-navigation__menu-btn"
          onClick={openDrawerHandler}
        >
          <span />
          <span />
          <span />
        </button>
        <h1 className="main-navigation__title">
          <Link>PicShare</Link>
        </h1>
        <nav className="main-navigation__header-nav">
          <NavigationLinks />
        </nav>
      </MainHeader>
    </React.Fragment>
  );
};

export default MainNavigation;
