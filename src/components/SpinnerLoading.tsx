import { Loader } from 'lucide-react'
import React from 'react'

const SpinnerLoading = () => {
  return (
    <div className='w-full h-screen grid place-content-center fixed top-0 left-0 text-center bg-white/40 dark:bg-[#000]/40 z-[1000]'>
      <Loader className='animate-spin font-extrabold text-4xl'/>
    </div>
  )
}

export default SpinnerLoading
