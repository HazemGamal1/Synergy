"use client"
import SideNav from '@/components/SideNav/SideNav'
import { Bell, Handshake, LogIn, LogInIcon, LogOut, Menu, User, Users2} from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import { useEffect } from 'react'
import logo from "../../../public/Vector.svg"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu'
import Image from 'next/image'

const Layout = ({ children }: { children : React.ReactNode}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleChangeAuth = (val : boolean) => {
    setIsAuthenticated(val)
  } 
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
};

  return (
    <div>
      <nav className='w-full sticky top-0 z-[10] border-b flex items-center justify-between p-4 bg-[#F3F4F6] dark:bg-[#141414] xl:hidden'>
        <div className='flex items-center'>
            <Link href="/" className='flex gap-2 border-[#DBDBDC] items-center ml-2'>
              <Image src={logo} alt="logo" width={50} height={50} className='w-[2rem]'/>
              <h1 className="text-lg font-bold">Synergy</h1>
            </Link>
        </div>
        <div  className='ml-auto flex gap-2 items-center'>
          <DropdownMenu>
            <DropdownMenuTrigger>
                <Menu />
            </DropdownMenuTrigger>
            {
              isAuthenticated ?
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link href={"/profile"} className='flex gap-2 items-center'>
                    <User /> Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href={"/invitations"} className='flex gap-2 items-center'>
                    <Handshake /> Invitations
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href={"/teams"} className='flex gap-2 items-center'>
                    <Users2 /> Teams
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <button onClick={handleLogout} className='flex gap-2 items-center'>
                    <LogOut /> Logout
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
              :
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link href={"/signin"}className='flex gap-2 items-center'>
                    <LogInIcon /> Sign in
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            }
          </DropdownMenu>
        </div>
      </nav>
      <div className='flex min-h-screen'>
        <SideNav isAuthenticated={isAuthenticated} onChangeAuth={handleChangeAuth}/>
        <div className='dark:bg-[#090909] w-full'>
          {children}
        </div> 
      </div>
    </div>
  )
}

export default Layout
