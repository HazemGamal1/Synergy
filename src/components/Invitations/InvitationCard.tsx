import React, { useState } from 'react'
import { IInvitation } from '../../../models/Invitation'
import Link from 'next/link'
import { Button } from '../ui/button'

const InvitationCard = ({ inv } : { inv: IInvitation }) => {
    const [isRespondedTo, setIsRespondedTo] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const handleAcceptInvitation = async (id : string) => {
        try{
            setIsLoading(true);
            const res = await fetch(`/api/accept-invitation/${id}`)
            setIsRespondedTo(true);
        }catch(error){
            console.log(error);
        }
    }
    const handleDeclineInvitation = async (id : string) => {
        try{
            setIsLoading(true);
            const res = await fetch(`/api/decline-invitation/${id}`)
            setIsRespondedTo(true);
        }catch(error){
            console.log(error);
        }
    }

  return (
    <div className="w-full flex flex-col bg-white mt-4 dark:bg-[#1c1c1c] border rounded-lg p-2" >
        {
            !isRespondedTo ? 
            <>
                <div className="flex gap-2 items-center">
                    <div className="h-8 w-8 bg-muted rounded-full grid place-content-center overflow-hidden">
                        {inv.projectName[0] + inv.projectName[1]}
                    </div>
                    <div className="ml-1">
                    <Link href={`/project/${inv.project}`} className='dark:text-white hover:underline'>{inv.projectName}</Link>
                    <p className="text-xs text-neutral-400">{inv.position} position</p>
                    <p className="text-neutral-500 text-xs mt-2">invited by <span className='dark:text-white hover:underline'><Link href={`/user/${inv.inviterUsername}`}>{inv.inviterUsername}</Link></span></p>
                    </div>
                </div>
                <div className="flex gap-1 mt-4 ml-auto">
                    <Button variant={"secondary"} disabled={isLoading} className="rounded-lg hover:bg-blue-500 p-1 text-xs" onClick={() => handleAcceptInvitation(inv._id)}>
                        Accept
                    </Button>
                    <Button variant={"link"} disabled={isLoading} className="p-1 rounded-lg text-xs " onClick={() => handleDeclineInvitation(inv._id)}>
                        Decline
                    </Button>
                </div>
            </>
            :
            <div>
                Response sent successfully
            </div>
        }
    </div>
  )
}

export default InvitationCard
