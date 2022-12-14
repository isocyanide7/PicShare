import React from "react";
import { NavLink } from "react-router-dom";
import "./NavigationLinks.css";

const NavigationLinks = (props) => {
  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact="true">ALL USERS</NavLink>
      </li>
      <li>
        <NavLink to="/u1/posts">
          YOUR POSTS
        </NavLink>
      </li>
      <li>
        <NavLink to="/posts/new">ADD NEW</NavLink>
      </li>
      <li>
        <NavLink to="/auth">AUTHENTICATE</NavLink>
      </li>
    </ul>
  );
};

export default NavigationLinks;
