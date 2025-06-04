import Image from 'next/image'
import React from 'react'
import logo from "../../../public/logo.svg"
import { Home, LetterTextIcon } from 'lucide-react'
import { TiShoppingBag } from "react-icons/ti";

const page = () => {
  return (
    <div className='w-full h-screen flex bg-[#181818]'>
        <div className='w-[22rem] p-4 border-r bg-[#212121]'>
            <div className='flex gap-2 items-center'>
                <Image src={logo} alt='logo' width={25}/>
                <p className='text-md text-[#c1c7d3] font-bold'>Synergy</p>
            </div>

            <div className='grid gap-3 mt-12 text-sm'>
                <div className='flex gap-2 items-center text-muted-foreground'>
                    <Home />
                    <p>Home</p>
                </div>
                <div className='flex gap-2 items-center text-muted-foreground'>
                    <LetterTextIcon />
                    <p>Inbox</p>
                </div>
                <div className='flex gap-2 items-center text-muted-foreground'>
                    <TiShoppingBag className='text-2xl'/>
                    <p>Projects</p>
                </div>
            </div>
        </div>
        <div className='w-full flex flex-col'>
            
        </div>
    </div>
  )
}

export default page
