import React from 'react'

const page = () => {
  return (
    <main>
      <div className='w-full min-h-screen h-screen bg-[#161815]'>
        <div className='w-full fixed top-0 left-0'>
            <nav className='max-w-[1512px] mx-auto py-12'>
                <div className='flex items-center gap-6'>
                    <div>
                        Synergy
                    </div>
                    <ul className='flex gap-3 items-center text-[#909090] font-semibold'>
                        <li>AI Cover Letter Generator</li>
                        <li>Resume Template</li>
                        <li>Pricing</li>
                        <li></li>
                    </ul>
                </div>
            </nav>
        </div>

        <div className='grid place-content-center w-full h-full'>
            <h1 className='font-semibold text-7xl text-[#6DE754] capitalize text-center'>Win your dream job</h1>
            <h1 className='font-semibold text-7xl  capitalize text-center mt-3'>With postJob</h1>
            <h3 className='text-[#909090] font-semibold max-w-[35rem] mx-auto text-lg text-center my-8'>Submit better job app --- 10x faster. AI cover letter generator, resume keyword checker, outreach message writer, and more. Powered By GPT</h3>
        </div>
      </div>
    </main>
  )
}

export default page
