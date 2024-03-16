"use client"; //unsure what this is for, but was included on Aceternity UI source code
import React from "react";
import { Menu, MenuItem } from "../ui/navbar-menu";
import { cn } from "../styles/cn";

const Navbar = ({ className }) => {

  return (
    <div className={cn("fixed-navbar", className)}>
      <Menu>
        <MenuItem item="About" href='/about'></MenuItem>
        <MenuItem item="Login" href= '/login'></MenuItem>
        <MenuItem item="Signup" href= '/signup'></MenuItem>
      </Menu>
    </div>
  );
};

export default Navbar;
