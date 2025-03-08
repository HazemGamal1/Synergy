"use client"
import React, { useEffect, useState } from 'react'
import { Bot, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { ITeam } from '../../../../models/Team';
import { cn } from '@/lib/utils';
import CreateTeamButton from '@/components/team/createTeamButton';
const Teams = () => {
    const [userTeams, setUserTeams] = useState<ITeam[]>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    interface IMember {
      userId: string, 
      username: string, 
      initials: string
    }
    
    useEffect(() => {
            setUserTeams([]);
            const handleGetTeams = async () => {
              setIsLoading(true);
              try{
                const resUserTeams = await fetch("/api/get-user-teams");
                const dataUserTeams = await resUserTeams.json();
                setUserTeams(dataUserTeams);
              }catch(error){
                console.log(error);
              }finally{
                setIsLoading(false)
              }
            }
            handleGetTeams();
          }, [])
  return (
    <div className='p-4'>
        <p>Teams</p>
        {
            isLoading ? 
            <div className='grid text-center place-content-center w-full'>
                <Loader2 className='mx-auto animate-spin'/>
            </div>
            :
            userTeams &&
            userTeams.length <= 0 ? 
            <div className='grid text-center place-content-center w-full p-12'>
                <Bot className='mx-auto' size={56}/>
                <p>No teams were found...</p>
                <CreateTeamButton />
            </div>
            :
            <>
            <div className='h-full'>
            {
            userTeams &&
                userTeams.length > 0 &&
                    userTeams.map((team, idx) => (
                    <Link href={`/team/${team._id}`} className='mt-2' key={idx}>
                        <div className='flex items-center group transition duration-500 gap-1 py-2 hover:bg-gray-50 dark:hover:bg-[#1d1d1d] rounded-md' >
                            {
                                team.members.slice(0, 3).map((member : IMember, idx : number) => (
                                        idx < 2 ?
                                        <div className={cn(`dark:bg-[#262626] bg-blue-600 text-white rounded-full p-1 w-8 text-center uppercase h-8`, {"-ml-2 ": idx >= 1})} key={idx}>
                                            {member.initials}
                                        </div>
                                        :
                                        <div className={cn(`dark:bg-[#262626] text-muted-foreground rounded-full p-1 w-8text-center uppercase h-8`, {"-ml-2 ": idx >= 1})} key={idx}>
                                            +{team.members.length - 2}
                                        </div>
                                ))
                            }
                        </div>
                    </Link>          
                ))
            }     
            <CreateTeamButton />
            </div>
        </>
        }
    </div>
  )
}

export default Teams
