import React from 'react'

const PageLoading = () => {
  return (
    <div className='w-full h-screen grid place-content-center fixed top-0 left-0 text-center bg-white dark:bg-[#000] z-[1000]'>
      <h1 className="text-blue-500 xl:text-4xl text-3xl animate-pulse font-bold">Synergy</h1>
      <p className='text-gray-400 mt-4 animate-pulse text-lg xl:text-xl max-w-[17rem]'>Empowering connections, inspiring solutions.</p>
    </div>
  )
}

export default PageLoading
