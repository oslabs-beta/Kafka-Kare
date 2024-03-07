"use client";
import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

//source code from Aceternity UI

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({ item, href, ...url }) => {
    const containerRef = useRef(null); // Use useRef for reference

  return (
    <div ref={containerRef} className="menu-item-container">
      <motion.p transition={{ duration: 0.3 }} className="menu-item" whileHover={{ scale: 1.1 }}>
        <Link href={href} {...url} >{item} </Link>
      </motion.p>
      </div>
  );
};


  export const Menu = ({ setActive, children }) => {
    return (
      <nav
        className="menu-container">
        {children}
      </nav>
    );
  };
  

 