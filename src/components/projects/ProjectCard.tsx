import Link from 'next/link'
import React from 'react'
import { Card, CardContent, CardFooter, CardTitle } from '../ui/card'
import { IProject } from '../../../models/Project'
import { BrainCircuit, Infinity, ShieldHalf, TabletSmartphone } from 'lucide-react'

const ProjectCard = ({ project }: { project: IProject  }) => {
  return (
    <div>
        <Link href={`/project/${project._id}`}>
            <Card className="flex flex-col h-full bg-[#F3F4F6] hover:drop-shadow-lg dark:bg-[#1c1c1c] rounded-md dark:hover:bg-[#272727] duration-500">
                <CardContent className="flex-grow">
                    <CardTitle className="mb-2 flex mt-6 gap-2 items-center">
                    {
                        project.requiredSkills[0] === "Machine Learning" ?
                        <div className="bg-blue-600 rounded-full text-white p-3">
                        <BrainCircuit />
                        </div> 
                        : project.requiredSkills[0] === "Cybersecurity" ?
                        <div className="bg-red-600 rounded-full text-white p-3">
                        <ShieldHalf />
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
                    <div className='flex flex-col gap-2 '>
                        {project.title}
                        <div className="text-sm text-muted-foreground font-normal">
                        By @{project.ownerUsername} 
                        </div>
                    </div>
                </CardTitle>

                    <p className="text-muted-foreground mb-4">{project.shortDescription}</p>

                    <p className='text-muted-foreground mb-2'>Required Skills: </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                    {project.requiredSkills.map((skill, index) => (
                        <span
                        key={index}
                        className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full"
                        >
                        {skill}
                        </span>
                    ))}
                    </div>
                </CardContent>
                <CardFooter className="text-sm text-muted-foreground">
                    Posted on {project.createdDate.toString().split('T')[0]}
                </CardFooter>
            </Card>
        </Link>
    </div>

  )
}

export default ProjectCard
