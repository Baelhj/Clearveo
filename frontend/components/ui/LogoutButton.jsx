"use client";

import { useRouter } from 'next/navigation';

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');

    router.push('/login');
  };

  return (
    <button className='flex justify-center items-center gap-2 bg-orange-600 text-amber-100 font-semibold py-2 px-4  hover:bg-orange-500 rounded-full' onClick={handleLogout}>Logout</button>
  );
};

export default LogoutButton;
