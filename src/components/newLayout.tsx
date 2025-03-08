'use client'
import React from 'react'
import { Bot, PlusCircle} from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRight,Loader } from 'lucide-react'
import { IProject } from "../../models/Project"
import ProjectCard from './projects/ProjectCard'

export default function NewLayout({ isAuthenticated } : { isAuthenticated : boolean }) {
    const [filter, setFilter] = useState('all')
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
        const handleFilter = () => {
          if(filter === 'all' || filter === 'All Projects') {
            setFilteredProject(projects);
            return;
          } 
            
          if(projects){
            const filtered = projects.filter(project => project.requiredSkills.includes(filter));
            setFilteredProject(filtered)
          }
        }
        handleFilter();
      }, [filter])
    
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
    <div className='min-h-screen'>
      <div className={`flex flex-col w-[100%]`}>
          <main className="flex-grow container mx-auto px-4 py-4 lg:py-8 ">
            {/* Featured Start */}
            {
              (projects && projects?.length >= 3) &&
              <section className="mb-12">
                <h2 className="text-2xl font-normal text-gray-800 dark:text-gray-200 mb-6 ">Featured Projects</h2>
                {
                  isLoading ?
                    <div className="grid place-content-center h-[20vh] w-full">
                      <Loader className="animate-spin"/>
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
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-normal text-gray-800 dark:text-gray-200">Discover Projects <Link href={'/all-projects'} className='underline text-muted-foreground text-sm flex gap-1 items-center hover:text-[#1971FB]'>view all <ArrowRight size={"15px"}/></Link></h2>
                <Select value={filter} onValueChange={setFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by skill" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Projects</SelectItem>
                    <SelectItem value="Python">JavaScript</SelectItem>
                    <SelectItem value="Machine Learning">Machine Learning</SelectItem>
                    <SelectItem value="Graphic Design">Graphic Design</SelectItem>
                    <SelectItem value="React Native">React Native</SelectItem>
                    <SelectItem value="React">React</SelectItem>
                    <SelectItem value="Blockchain">DataScience</SelectItem>
                    <SelectItem value="Cyber Security">Cyber Security</SelectItem>
                    <SelectItem value="Mobile Development">Mobile Development</SelectItem>
                    <SelectItem value="Cloud Computing">Cloud Computing</SelectItem>
                    <SelectItem value="Blockchain">Blockchain</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {
                isLoading ?
                  <div className="grid place-content-center h-[20vh] w-full">
                    <Loader className="animate-spin"/>
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
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            <section className="text-center w-full bg-gradient-to-r from-blue-500 via-blue-600 to-[#1971FB] p-10  rounded-md mt-12">
              <h2 className="text-2xl font-bold mb-4 text-white">Ready to showcase your project?</h2>
              <p className="text-gray-200 mb-6">Join our community of innovators and get your ideas noticed!</p>
              {/* < size="lg"> */}
                <Link href="/post-project" className="flex gap-1 items-center mx-auto bg-white text-black rounded-md p-2 max-w-max">
                  <PlusCircle className="mr-2 h-5 w-5" />
                  Start Your Project
                </Link>
            </section>
            {/* Post Call To Action end */}

            <section className='w-full mt-12 text-center'>
              <p className='max-w-max mx-auto text-muted-foreground'>Synergy</p>
              <p className='bg-gradient-to-r font-normal from-blue-400 via-blue-500 bg-clip-text text-transparent'>beta v1.0</p>
            </section>
          </main>
      </div>
    </div>
  )
}
