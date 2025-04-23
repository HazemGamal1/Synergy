'use client'
import React from 'react'
import { Bot,LoaderCircle, PlusCircle} from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { IProject } from "../../models/Project"
import ProjectCard from './projects/ProjectCard'
import { Button } from './ui/button'

export default function NewLayout({ isAuthenticated } : { isAuthenticated : boolean }) {
    const [projects, setProjects] = useState<IProject[]>() 
    const [isLoading, setIsLoading] = useState(false);
    const [filteredProjects, setFilteredProject] = useState<IProject[]>();
      const calcMoreThanAvg = () => {
        let avg = 0;
        if(projects){
          const sum = projects?.reduce((acc, proj) => acc + proj.likes.length, 0);
          avg = sum / projects?.length;
        }
        return avg;
      }
    useEffect(() => {
      const handleGetProjects = async () => {
        setIsLoading(true);
        try{
          const resp = await fetch("/api/projects/all-projects");
          const data = await resp.json();
          setProjects(data);
          setFilteredProject(data);
        }catch(error){
          console.log(error);
        }finally{
          setIsLoading(false)
        }
      }
      handleGetProjects();
    }, [isAuthenticated])

  return (
    <div className='w-full mx-2'>
      {/* center */}
      <div className={`flex flex-col w-full `}>
          <main className="w-full lg:container mx-auto xl:px-4 mt-4">
            {/* Featured Start */}
            {
              (projects && projects?.length >= 3) &&
              <section>
                <h2 className="text-2xl font-normal text-gray-800 dark:text-gray-200 mb-6 ">Featured Projects</h2>
                {
                  isLoading ?
                    <div className="grid place-content-center h-[20vh] w-full">
                      <LoaderCircle className="animate-spin"/>
                    </div>
                    :
                    <div 
                      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6"
                    >
                      {projects && projects.filter(project => project.likes.length > calcMoreThanAvg()).map((project, idx) => (
                        <ProjectCard project={project} key={idx} />
                      ))}
                    </div>
                }
              </section>
            }
            {/* Featured End */}

            {/* Discover start */}
            <section>
              {
                isLoading ?
                  <div className="grid place-content-center h-[20vh] w-full">
                    <LoaderCircle className="animate-spin"/>
                  </div>
                :
                <>
                {
                  projects && 
                  projects.length === 0
                  ?
                  <div className='grid place-content-center p-12 text-center'>
                    <Bot className='mx-auto text-[#A3A3A3]' size={65}/>
                    <p className='text-muted-foreground'>No Projects were found...</p>
                  </div>
                  :
                  <div className="grid grid-cols-1 gap-6">
                    {filteredProjects && filteredProjects.map((project : IProject, idx) => (
                      <ProjectCard project={project} key={idx}/>
                    ))}
                  </div>
                }
                </>
              }
            </section>
            {/* DiscoverEnd */}

            {/* Post Call To Action start */}
            <section className="text-center w-full bg-white dark:bg-[#1c1c1c] border p-10  rounded-md my-12">
              <h2 className="text-2xl font-bold mb-4 dark:text-white">Ready to showcase your project?</h2>
              <p className="text-muted-foreground dark:text-gray-200 mb-6">Join our community of innovators and get your ideas noticed!</p>
              {/* < size="lg"> */}
                <Link href="/post-project">
                  <Button variant={"SynMain"}>
                    <PlusCircle className="mr-2 h-5 w-5" />
                    Start Your Project
                  </Button>
                </Link>
            </section>
            {/* Post Call To Action end */}
          </main>
      </div>
      
    </div>
  )
}
