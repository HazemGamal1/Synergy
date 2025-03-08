import { BookDashed, Inbox, Star } from 'lucide-react'
import React from 'react'

export default function General() {
  return (
    <div>
        <h3 className='text-muted-foreground'>General</h3>
        <div className='mt-1'>
            {/* <div className='flex gap-2 items-center text-sm p-2'>
                <Inbox size={"20px"} className='dark:text-[#e1e0e0] dark:text-muted-foreground'/>
                <p>Inbox</p>
            </div> */}
            <div className='flex gap-2 items-center text-sm  p-2'>
                <Star size={"20px"} className='dark:text-[#e1e0e0] text-muted-foreground'/>
                <p>Saved</p>
            </div>
        </div>          
    </div>
  )
}
