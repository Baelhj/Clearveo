import React from "react";
import Link from "next/link";
import { UserIcon } from "@heroicons/react/24/outline";

const SignButton = () => {
  return (
    <Link href="/signup" passHref>
      <button className="flex justify-center items-center gap-2 bg-orange-600 text-amber-100 font-semibold py-2 px-4  hover:bg-orange-500 rounded-full">
        <UserIcon className="w-6 h-6" />
        Sign Up
      </button>
    </Link>
  );
};

export default SignButton;
