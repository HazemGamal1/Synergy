import Link from 'next/link'
import React from 'react'
import { Card, CardContent, CardFooter, CardTitle } from '../ui/card'
import { IProject } from '../../../models/Project'
import { BrainCircuit, Infinity, ShieldHalf, TabletSmartphone } from 'lucide-react'

const ProjectCard = ({ project }: { project: IProject  }) => {
  return (
    <div>  
        <Card className="flex flex-col h-full bg-[#FFFF] border-[0.2px] drop-shadow-none shadow-none dark:bg-[#1c1c1c] rounded-md">
            <CardContent className="flex-grow">
                <CardTitle className="mb-2 flex mt-6 gap-2 items-center text-gray-500 dark:text-white">
                {
                    project.requiredSkills[0] === "Machine Learning" ?
                    <div className="rounded-full p-3">
                    <BrainCircuit />
                    </div> 
                    : project.requiredSkills[0] === "Cybersecurity" ?
                    <div className="p-2">
                        <ShieldHalf size={30} />
                    </div> 
                    : project.requiredSkills[0] === "Mobile Development" ?
                    <div className="bg-indigo-600 rounded-full text-white p-2">
                        <TabletSmartphone />
                    </div> 
                    : project.requiredSkills[0] === "DevOps" &&
                    <div className="bg-white rounded-full p-2 ">
                        <Infinity className='text-blue-600' size={"30px"}/>
                    </div> 
                    
                }
                <div className='flex flex-col gap-2 text-black dark:text-white'>
                    {project.title}
                    <div className="text-sm text-muted-foreground font-normal">
                    By <span className='text-black dark:text-white hover:text-blue-500 dark:hover:text-blue-500 underline-offset-3 hover:underline'>@{project.ownerUsername} </span>
                    </div>
                </div>
            </CardTitle>
                <Link href={`/project/${project._id}`}>
                    <p className="font-bold text-md lg:text-2xl my-3 hover:text-[#3852b8] ">{project.shortDescription}</p>
                </Link>

                <p className='text-muted-foreground text-xs mb-2'>Required Skills: </p>
                <div className="flex flex-wrap gap-2 mb-1">
                {project.requiredSkills.map((skill, index) => (
                    <span
                    key={index}
                    className="select-none text-primary text-xs px-2 py-1 bg-blue-400/20 border hover:border-blue-600 duration-300"
                    >
                        . {skill}
                    </span>
                ))}
                </div>
            </CardContent>
            <CardFooter className="text-sm text-muted-foreground">
                Posted on {project.createdDate.toString().split('T')[0]}
            </CardFooter>
        </Card>
    </div>

  )
}

export default ProjectCard
