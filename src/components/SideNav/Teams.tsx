import { Users2 } from 'lucide-react'
import React from 'react'
import CreateTeamButton from '../team/createTeamButton'
import Link from 'next/link'
import { IMember, ITeam } from '../../../models/Team'
import { cn } from '@/lib/utils'

export default function Teams( { userTeams }: { userTeams: ITeam[] }) {
  return (
    <>
    <h3 className='text-muted-foreground flex items-center gap-2 mt-3 '><Users2 size={"18px"}/> Teams</h3>
      <div className='max-h-[5rem] scrollbar-none overflow-y-auto hover:cursor-n-resize'>
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
        </div>
        <CreateTeamButton />
    </>
  )
}
