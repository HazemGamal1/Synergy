"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import { useEffect } from 'react'
import newLogo from "../../../public/logo.svg"
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/Mode-toggle'
import { Search } from 'lucide-react'
import { IProject } from '../../../models/Project'
import { useRouter } from 'next/navigation'

  
const Layout = ({ children }: { children : React.ReactNode}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<IProject[]>();
  const router = useRouter();

  const handleSearchClick = (id: string) => {
    router.push(`/project/${id}`);
    setQuery('');
  }
  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (!value) {
      setResults([]);
      return;
    }

    const res = await fetch(`/api/projects/search-project?query=${encodeURIComponent(query)}`, {
      method: "GET",
      headers: { 
          'Content-Type': 'application/json'
      },
    });
    const data = await res.json();
    setResults(data);
  };

  useEffect(() => {
    const handleGetUserData = async () => 
      {
          const response = await fetch("/api/validate-token", {
          method : 'GET',
          headers: {
            'Content-Type': "application/json",         
          }
          })
      
          await response.json();
          if(response.ok){
            setIsAuthenticated(true);
          }
      }

      handleGetUserData();
  }, []);

  const handleLogout = async () => {
    const response = await fetch('/api/logout', {
        method: 'GET',
        credentials: 'include',
    });

    if(response.ok){
      setIsAuthenticated(false)
    }
};

  return (
    <div className='w-full min-h-screen flex flex-col justify-between'>
      <nav className='w-full sticky bg-white dark:bg-[#151515] top-0 left-0 border-b p-2 z-10 '>
        <nav className='flex justify-between items-center max-w-[1330px] mx-auto'>
          <div className='flex gap-3 items-center'>
            <Link href={"/"}>
              <Image src={newLogo} alt='logo' width={30}/>
            </Link>
            <div className='hidden xl:flex gap-1 items-center border w-full rounded-md'>
              <div className=" items-center hidden xl:flex">
                  <Button variant="ghost" size="sm" className="">
                      <Search size={24}/>
                  </Button>
              </div>
              <div className="relative w-full">
                  <input
                      type="text"
                      className="hidden md:block w-full p-1 text-sm border-none focus:outline-none min-w-[40rem] rounded-l-none rounded-md dark:bg-[#1c1c1c]"
                      placeholder="Search..."
                      value={query}
                      onChange={handleSearch}
                  />
                  
                  {results && query && results.length > 0 && (
                    <ul className="absolute z-50 w-full mt-1 bg-white dark:bg-[#1c1c1c] border  rounded-lg shadow-lg">
                      {results.map((item) => (
                          <li
                          key={item._id}
                          className="p-3 hover:bg-blue-100 dark:hover:bg-[#121212] border-gray-300 cursor-pointer flex flex-col"
                          onClick={() => handleSearchClick(item._id)}
                          >
                          {item.title} <span className="text-blue-600 text-sm">{item.shortDescription}</span>
                          </li>
                      ))}
                      </ul>
                  )}
              </div>
            </div>
          </div>
          <div className='flex gap-2 items-center'> 
          {
            !isAuthenticated ?
            <>
              <Link href={"/signin"}>
                <button className="hover:bg-main/20 w-full text-center p-2 dark:hover:text-white hover:text-main hover:underline underline-offset-2 underline-main rounded-md text-sm">
                    Login
                </button>
              </Link>
              <Link href={"/signup"}>
                <button className="border w-full rounded-lg text-black bg-white dark:text-black hover:bg-main hover:text-white dark:hover:text-white hover:underline underline-offset-2 border-main dark:border-white p-2 px-4 text-sm">Sign up</button>
              </Link>
            </>
            :
            <Button variant={"secondary"} onClick={handleLogout}>
              Logout
            </Button>
          }
            <ModeToggle />
          </div>
        </nav>
      </nav>

      <div className='flex-1 dark:bg-[#0d0d0d]'>
        {children}
      </div> 
    </div>
  )
}

export default Layout
