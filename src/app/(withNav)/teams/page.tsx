"use client"
import React, { useEffect, useState } from 'react'
import { Bot, Loader2, Users } from 'lucide-react';
import Link from 'next/link';
import { IMember, ITeam } from '../../../../models/Team';
import { cn } from '@/lib/utils';
import CreateTeamButton from '@/components/team/createTeamButton';
const Teams = () => {
    const [userTeams, setUserTeams] = useState<ITeam[]>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    
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
    <div className='container mx-auto  min-h-screen'>
        <div className='w-full flex gap-2'>
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
              <div className='h-full w-full flex flex-col p-8 gap-2'>
              <h3 className='font-bold my-4 text-2xl'>Your teams </h3>
              {
                userTeams &&
                    userTeams.length > 0 &&
                        userTeams.map((team, idx) => (
                        <Link href={`/team/${team._id}`} className='flex gap-2 items-center w-full justify-between bg-gray-100 dark:bg-[#121212] hover:bg-slate-100 dark:hover:bg-[#101010] p-4 rounded-lg' key={idx}>
                          <div className='flex gap-2 items-center'>
                            <Users />
                            {
                              team.title
                            }
                          </div>
                            <div className='flex items-center group transition duration-500 gap-1 py-2 hover:bg-gray-50 dark:hover:bg-[#1d1d1d] rounded-md' >
                                {
                                  team.members.slice(0, 3).map((member : IMember, idx : number) => (
                                      idx < 2 ?
                                      <div className={cn(`dark:bg-[#262626] bg-main text-white rounded-full p-1 w-8 text-center uppercase h-8`, {"-ml-2 ": idx >= 1})} key={idx}>
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
                <div className='flex gap-2 items-center'>
                  <CreateTeamButton />
                </div>
              </div>
          </>
          }
        </div>
    </div>
  )
}

export default Teams
