"use client"
import React, { useEffect, useState } from 'react'
import { IInvitation } from '../../../../models/Invitation';
import InvitationCard from '@/components/Invitations/InvitationCard';
import { Bot, Loader2 } from 'lucide-react';
const page = () => {
    const [invitations, setInvitations] = useState<IInvitation[]>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
            setInvitations([]);
            const handleGetProjects = async () => {
              setIsLoading(true);
              try{
                const responseInv = await fetch("/api/get-invitations");
                const dataInv = await responseInv.json();
                setInvitations(dataInv);
              }catch(error){
                console.log(error);
              }finally{
                setIsLoading(false)
              }
            }
            handleGetProjects();
          }, [])
  return (
    <div className='p-4'>
        <p>Invitations</p>
        {
            isLoading ? 
            <div className='grid text-center place-content-center w-full'>
                <Loader2 className='mx-auto animate-spin'/>
            </div>
            :
            invitations &&
            invitations?.length <= 0 ? 
            <div className='grid text-center place-content-center w-full p-12'>
                <Bot className='mx-auto' size={56}/>
                <p>No invitations were found...</p>
            </div>
            :
            <div className='grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
            {invitations?.map((inv) => (
                <InvitationCard inv={inv} key={inv._id}/>
            ))}
            </div>
        }
    </div>
  )
}

export default page
