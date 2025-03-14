'use client'

import { BrainCircuit, Cloudy, Globe, Infinity, Loader2Icon, LogOut, Plus, ShieldHalf, TabletSmartphone, User } from 'lucide-react'
import Link from 'next/link'
import { LoginPopup } from '../../components/LoginButton'
import { Avatar, AvatarFallback, AvatarImage } from './../ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './../ui/dropdown-menu'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import logo from "../../../public/Vector.svg"
import Teams from './Teams'
import { Button } from '../ui/button'
import { IInvitation } from '../../../models/Invitation'
import { IProject } from '../../../models/Project'
import { ITeam } from '../../../models/Team'
import { ModeToggle } from '../Mode-toggle'
import InvitationCard from '../Invitations/InvitationCard'



export default function SideNav( { isAuthenticated, onChangeAuth } : { isAuthenticated : boolean, onChangeAuth: (arg: boolean) => void}) {
    const [invitations, setInvitations] = useState<IInvitation[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [userProjects, setUserProjects] = useState<IProject[]>([]);
    const [userTeams, setUserTeams] = useState<ITeam[]>([]);
    
    useEffect(() => {
        // Connect to the SSE route
        const eventSource = new EventSource('/api/sse');
    
        // Listen for messages from the server
        eventSource.onmessage = (event) => {
          const message = JSON.parse(event.data);
          if (message.type === 'invitation') {
            setInvitations((prev) => [...prev, message.data]);
          }
        };
    
        // Handle errors
        eventSource.onerror = () => {
          console.error('SSE error');
          eventSource.close();
        };
    
        // Clean up on unmount
        return () => eventSource.close();
      }, []);

    useEffect(() => {
        const handleGetProjects = async () => {
          setIsLoading(true);
          try{
            const resInv = await fetch("/api/get-invitations");
            const dataInv = await resInv.json();
            setInvitations(dataInv)
            const resUserProj = await fetch("/api/projects/get-user-projects");
            const dataUserProjs = await resUserProj.json();
            setUserProjects(dataUserProjs);
            const resUserTeams = await fetch("/api/get-user-teams");
            const dataUserTeams = await resUserTeams.json();
            setUserTeams(dataUserTeams);
          }catch(error){
            console.log(error);
          }finally{
            setIsLoading(false)
          }
        }
        handleGetProjects();
      }, [isAuthenticated])
      
    const handleLogout = async () => {
        const response = await fetch('/api/logout', {
            method: 'GET',
            credentials: 'include',
        });
    
        if (response.ok) {
          onChangeAuth(false);
        } else {
            console.error('Failed to log out');
        }
    };

  return (
    <div className='h-screen sticky left-0 top-0 w-[22rem] pt-3 bg-[#F3F4F6]  dark:bg-[#141414] border-r hidden xl:block '>
        <Link href="/" className='w-full flex justify-between items-center border-b mb-4 pb-2 px-4'>
            <div className='flex items-center gap-1'>
                <div className='px-1 rounded-lg py-3'>
                    <Image src={logo} alt="logo" width={30}/>
                </div>
                <h1 className='font-bold text-md'>Synergy</h1>
            </div>
        </Link>
        {
            isAuthenticated ?
            <div className='h-[93%] flex flex-col '>
                <div className='px-3'>
                    <Link href={"/discover-users"} className='flex gap-2 items-center text-blue-500 py-2 hover:text-blue-400 '>
                        <Globe />
                        Discover users
                    </Link>
                </div>
                <div className='px-3'>
                    <Teams userTeams={userTeams}/>
                    <div>
                        <div className='dark:text-muted-foreground mt-4 flex gap-2 items-center'>Your projects  <div className='bg-blue-600 dark:bg-[#262626] text-white p-[1px] text-sm rounded-full px-2'>{userProjects?.length}</div></div>
                        <div className='max-h-[9rem] scrollbar-none overflow-y-auto'>
                            {
                                userProjects && 
                                userProjects?.length > 0 && 
                                userProjects.map((proj, idx) => (
                                    <Link href={`/project/${proj._id}`} key={idx} className='flex items-center gap-2 py-3 hover:bg-gray-50 dark:hover:bg-[#1d1d1d] rounded-lg px-1 duration-300'>
                                        {
                                            proj.requiredSkills[0] === "Machine Learning" ?
                                            <div className="bg-blue-600 rounded-full text-white p-2">
                                                <BrainCircuit />
                                            </div> 
                                            : proj.requiredSkills[0] === "Cybersecurity" ?
                                            <div className="bg-red-600 rounded-full text-white p-2">
                                                <ShieldHalf />
                                            </div> 
                                            : proj.requiredSkills[0] === "Mobile Development" ?
                                            <div className="bg-indigo-600 rounded-full text-white p-2">
                                                <TabletSmartphone />
                                            </div> 
                                            : proj.requiredSkills[0] === "DevOps" &&
                                            <div className="bg-white rounded-full p-1">
                                               <Infinity className='text-blue-600' size={"30px"}/>
                                            </div> 
                                        }
                                        <div>
                                            {proj.title}
                                            <p className='text-muted-foreground text-xs'>Posted on {proj.createdDate.toString().split('T')[0]}</p>
                                        </div>
                                    </Link>
                                ))
                            }
                        </div>
                        <Link href={"/post-project"} className='mt-1 flex gap-2 items-center pt-1'>
                            <div className='rounded-full bg-[#2F9BF7] p-0.5'>
                                <Plus size={"15px"} className='text-white dark:text-black'/>
                            </div>
                            <p className='text-[#2F9BF7] capitalize font-semibold'>Create new project</p>
                        </Link>
                    </div>
                    <div>
                        <h3 className='text-muted-foreground mt-4 flex items-center gap-2 w-full mb-2'>Invitations <div className='bg-blue-600 dark:bg-[#262626] text-white p-[1px] text-sm rounded-full px-2'>{invitations?.length}</div></h3>
                        {
                            invitations &&
                            invitations?.length > 0 ?
                            <div className='max-h-[28rem] overflow-y-scroll scrollbar-none'>
                                {
                                invitations.map((inv, idx) => (
                                    <InvitationCard inv={inv} key={idx}/>
                                ))
                                }
                            </div>
                            :
                            <div className='mx-auto text-muted-foreground text-center max-h-[15rem] grid place-content-center'>
                                {
                                isLoading ? 
                                <>
                                    <Loader2Icon className='animate-spin'/>
                                </>
                                :
                                <>
                                    <Cloudy size={'100px'} scale={'100px'} className='mx-auto mt-52'/>
                                    <p>Seems like your invitations box is empty...</p>
                                </>
                                }
                            </div>
                        }
                    </div>
                </div>
                <div className='absolute z-10  dark:bg-[#141414] bg-[#F3F4F6] bottom-0 border-t px-4 flex w-full justify-between items-center py-4'>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                        <Button variant="default" className="relative h-8 w-8 rounded-full border-none">
                            <Avatar className="h-8 w-8 bg-[#F5F5F5] dark:bg-[#1c1c1c]">
                            <AvatarImage/>
                            <AvatarFallback className='text-black dark:text-gray-400'> <User /></AvatarFallback>
                            </Avatar>
                        </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56 mt-4" align="center" forceMount>
                        <DropdownMenuItem asChild>
                            <Link href={`/profile`}>
                            <User className="mr-2 h-4 w-4" />
                            <span>Profile</span>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleLogout}>
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Log out</span>
                        </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <ModeToggle />
                </div>
            </div>
            :
            <div className='grid h-[80%] place-content-center text-center'>
                <p>Sign in or create your account..</p>
                <LoginPopup onChangeAuth={onChangeAuth}/>
            </div>
        }
    </div>
  )
}
