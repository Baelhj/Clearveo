"use client";

import React from "react";
import SignButton from "@/components/ui/SignButton";
import LogoutButton from "@/components/ui/LogoutButton";

const Nav = () => {
  


  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Features", href: "/features" },
    { name: "About", href: "/about" },
  ];
  return (
    <nav className="">
      <div className="flex items-center justify-between px-6 py-4 text-[#333] w-4/5 mx-auto">
        {/* Logo */}
        <div>Logo</div>

        {/* Nav links */}
        <div>
          <ul className="flex space-x-5">
            {navLinks.map((link, index) => (
              <li key={index}>
                <a href={link.href}>{link.name}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* button */}
        <LogoutButton />
      </div>
    </nav>
  );
};

export default Nav;
