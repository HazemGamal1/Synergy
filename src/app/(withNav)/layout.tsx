"use client"
import SideNav from '@/components/SideNav/SideNav'
import { Handshake, Menu, User, Users2} from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import { useEffect } from 'react'
import logo from "../../../public/Vector.svg"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from '@/components/ui/dropdown-menu'
import Image from 'next/image'

const layout = ({ children }: { children : React.ReactNode}) => {
  const [IsLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [name, setName] = useState<string>("");
  const [username, setUserName] = useState<string>("''");

  const handleChangeAuth = (val : boolean) => {
    setIsAuthenticated(val)
  } 
  useEffect(() => {
    const handleGetUserData = async () => 
      {
          setIsLoading(true);
          const response = await fetch("/api/validate-token", {
          method : 'GET',
          headers: {
            'Content-Type': "application/json",         
          }
          })
      
          const data = await response.json();
          if(data.message === "Token not found"){
            setName("");
          }else {
            setName(data.user.name);
            setUserName(data.user.username);
          }
          if(response.ok){
            setIsAuthenticated(true);
          }
          setIsLoading(false);
      }

      handleGetUserData();
}, []);
  return (
    <div>
      <nav className='w-full sticky top-0 z-[10] border-b flex items-center justify-between p-4 bg-[#F3F4F6] dark:bg-[#141414] xl:hidden'>
        <div className='flex items-center'>
            <Link href="/" className='flex gap-2 border-[#DBDBDC] items-center ml-2'>
              <Image src={logo} alt="logo" width={50} height={50} className='w-[2rem]'/>
              <h1 className="text-lg font-bold">Synergy</h1>
            </Link>
        </div>
        <div  className='ml-auto'>
          <DropdownMenu>
            <DropdownMenuTrigger>
                <Menu />
            </DropdownMenuTrigger>
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
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
      <div className='flex min-h-screen'>
        <SideNav username={username} isAuthenticated={isAuthenticated} onChangeAuth={handleChangeAuth}/>
        <div className='dark:bg-[#090909] w-full'>
          {children}
        </div> 
      </div>
    </div>
  )
}

export default layout
