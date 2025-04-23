"use client"
import React, { useEffect, useState } from 'react'
import { ITeam } from '../../../../../models/Team';
import SpinnerLoading from '@/components/SpinnerLoading';
import Link from 'next/link';
import { PageProps } from '../../../../../.next/types/app/(withNav)/team/[id]/page';

const Team = ({ params } : PageProps ) => {
    const [team, setTeam] = useState<ITeam>();

    useEffect(() => {
        const getTeam = async () => {
            const { id } = await params;
            const res = await fetch(`/api/get-team?id=${id}`, {
                method: "GET",
                headers: { 
                    'Content-Type': 'application/json'
                },
            })
            const data = await res.json();
            setTeam(data);
        }
        getTeam()
    }, [])

    if(!team) return <SpinnerLoading />
  return (
    <div>
        <section className='p-4 border-t container mx-auto'>
                <h3 className='text-muted-foreground'>Members</h3>
                <div className='grid grid-cols-2 lg:grid-cols-6 gap-2'>
                    {
                        team?.members.map((member, idx) => (
                            <Link href={`/user/${member.username}`} key={idx} className='flex dark:bg-[#1a1a1a] border  hover:bg-slate-100  flex-col gap-3 h-[10rem] justify-center rounded-lg text-center mt-3 px-1 py-2 dark:hover:bg-[#1c1c1c] duration-300'>
                                <div className=' mx-auto'>
                                    <div className='dark:bg-[#1e1e1e] bg-white border p-1 rounded-full w-9 h-9 uppercase'>
                                        {member.initials}
                                    </div>
                                </div>
                                @{member.username}
                                <p className='text-main'>
                                    {member.position}
                                </p>
                            </Link>  
                        ))
                    }
                </div>
            </section>
    </div>
    // <div className='w-full flex'>
    //     <div className='w-full relative'>
    //     </div>
    //     <div className='w-[30rem] hidden lg:block min-h-screen bg-[#F3F4F6] dark:bg-[#141414] border-l sticky right-0 py-4'>
    //         <div className='border-b px-6  h-[47px]'>
    //             <Input
    //                 placeholder='Search team projects' 
    //             />
    //         </div>
    //         <div className='p-4'>
    //             <div className='flex justify-between items-center'>
    //                 <h1 className='text-xl font-bold'>{team?.title} Team</h1>
    //                 <Settings className='text-muted-foreground'/>
    //             </div> 
    //             <p className='text-neutral-300 py-2'>Description</p>
    //             <p className='text-muted-foreground'>some description about the team</p>
    //         </div>
    //         <div className='mb-4'>
    //             {
    //                 !team ? 
    //                 <>
    //                 </>
    //                 :
    //                 <>
    //                     <div className='p-3 flex w-full items-center justify-between hover:bg-[#1c1c1c] duration-300 cursor-pointer'>
    //                     <div className='flex gap-2 items-center'>
    //                         <div className='p-1 bg-[#FFF7E9] text-[#F9B734] rounded-md'>
    //                             <LayoutList />
    //                         </div>
    //                         <p className='text-muted-foreground'>Tasks</p>
    //                     </div>
    //                     <ChevronRight size={"20px"}/>
    //                 </div>
    //                 <div className='p-3 flex w-full items-center justify-between hover:bg-[#1c1c1c] duration-300 cursor-pointer'>
    //                     <div className='flex gap-2 items-center'>
    //                         <div className='p-1 bg-[#FFEDF6] text-[#FC45A3] rounded-md'>
    //                             <GalleryVerticalEnd />
    //                         </div>
    //                         <p className='text-muted-foreground'>Projects</p>
    //                     </div>
    //                     <ChevronRight size={"20px"}/>
    //                 </div>
    //                 <div className='p-3 flex w-full items-center justify-between hover:bg-[#1c1c1c] duration-300 cursor-pointer'>
    //                     <div className='flex gap-2 items-center'>
    //                         <div className='p-1 bg-[#E1EBFF] text=center text-[#3073F5] rounded-md'>
    //                             <MessageCircleMore />
    //                         </div>
    //                         <p className='text-muted-foreground'>Messages</p>
    //                     </div>
    //                     <ChevronRight size={"20px"}/>
    //                 </div>
    //                 </>
    //             }
                
    //         </div>
    //         <section className='p-4 border-t'>
    //             <h3 className='text-muted-foreground'>Members</h3>
    //             {
    //                 team?.members.map((member, idx) => (
    //                     <Link href={`/user/${member.username}`} key={idx} className='flex text-center mt-3 px-1 py-2 justify-between items-center dark:hover:bg-[#1c1c1c] duration-300'>
    //                         <div className='flex items-center gap-2'>
    //                             <div className='dark:bg-[#1e1e1e] border p-1 rounded-full w-9 h-9 uppercase'>
    //                                 {member.initials}
    //                             </div>
    //                             {member.username}
    //                         </div>
    //                     </Link>  
    //                 ))
    //             }
    //         </section>
    //     </div>
    // </div>
  )
}

export default Team
