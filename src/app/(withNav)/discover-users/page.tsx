"use client"
import React, { useEffect, useState } from 'react'
import { IUser } from '../../../../models/User'
import Link from 'next/link'
import { Avatar } from '@radix-ui/react-avatar'
import { AvatarFallback } from '@/components/ui/avatar'
import PageLoading from '@/components/PageLoading'
const DiscoverUsers = () => {
    const [users, setUsers] = useState<IUser[]>([])
    useEffect(() => {
        const getUsers = async () => {
            const res = await fetch('/api/get-all-users');
            const data = await res.json();
            setUsers(data);
        }
        getUsers();
    }, [])
    if (users.length === 0) return <PageLoading />
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 w-full py-12 px-8'>
        {
            users.map((user) => (
                <Link href={`/user/${user.username}`} key={user._id.toString()} className='grid gap-2 text-center p-4 bg-[#F3F4F6] hover:drop-shadow-lg dark:bg-[#141414] rounded-lg dark:hover:bg-[#1c1c1c] duration-500'>
                    <Avatar className="h-32 w-32 relative overflow-visible mx-auto">
                        <AvatarFallback className="text-4xl font-bold bg-blue-600 text-white">{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className='font-bold text-2xl'>
                        {user.name}
                    </div>
                    <div className='text-blue-600'>
                        @{user.username}
                    </div>
                    
                    <div className='text-left'>
                        <span className='text-muted-foreground'>Skills:</span>
                        <div className="flex flex-wrap gap-2 mb-4 mt-4">
                            {user.skills.map((skill, index) => (
                                <span
                                    key={index}
                                    className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </Link>
            ))
        }
    </div>
  )
}

export default DiscoverUsers
