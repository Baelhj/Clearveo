import React from "react";
import { UserIcon } from "@heroicons/react/24/outline";
import Link from "next/link";



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
        <Link href="/signup" passHref>
          <button className="flex justify-center items-center gap-2 bg-orange-600 text-amber-100 font-semibold py-2 px-4  hover:bg-orange-500 rounded-full">
            <UserIcon className="w-6 h-6" />
            Sign Up
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
