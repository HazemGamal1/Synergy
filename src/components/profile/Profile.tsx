"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Loader } from 'lucide-react'
import { useEffect, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { IProject } from "../../../models/Project"
import ProjectCard from "../projects/ProjectCard"

interface IUser {
  name: string,
  email: string,
  username: string
}



export default function UserProfile() {
  const [user, setUser] = useState<IUser>({name: 'user', email: 'user', username:' user'});
  const [projects, setProjects] = useState<IProject[]>([]);
  const [projectIsLoading, setProjectIsLoading] = useState<boolean>(false);
  useEffect(() => {
    const handleGetUserData = async () => 
      {
          const response = await fetch("api/validate-token", {
          method : 'GET',
          headers: {
            'Content-Type': "application/json",         
          }
          })
      
          const data = await response.json();
          setUser(data.user);
          setProjectIsLoading(true);
          const projectRes = await fetch(`/api/projects/get-project-from-id/${data.user.userId}`);
          const projectData = await projectRes.json();
          setProjects(projectData);
          setProjectIsLoading(false)
      }
  
      handleGetUserData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-5">
      <Card className="border-none shadow-none">
        <CardHeader className="flex flex-col sm:flex-row items-center gap-4">
          <Avatar className="h-32 w-32 relative overflow-visible">
            <AvatarImage src={user.name} alt={user.name} />
            <AvatarFallback className="text-4xl font-bold">{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div className="text-center sm:text-left">
            <CardTitle className="text-3xl font-bold">{user.name}</CardTitle>
            <p className="text-muted-foreground">@{user.username}</p>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-4">
            {/* {user.skills.map((skill, index) => (
              <span
                key={index}
                className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full"
              >
                {skill}
              </span>
            ))} */}
          </div>
          <div className="flex flex-wrap gap-4 mb-6">
            {/* <Link href={`mailto:${user.email}`} className="flex items-center text-muted-foreground hover:text-primary">
              <Mail className="mr-2 h-4 w-4" />
              {user.email}
            </Link> */}
            {/* <Link href={`https://github.com/${user.github}`} className="flex items-center text-muted-foreground hover:text-primary"> */}
              {/* <GitHub className="mr-2 h-4 w-4" /> */}
              {/* {user.github} */}
            {/* </Link> */}
            {/* <Link href={`https://linkedin.com/in/${user.linkedin}`} className="flex items-center text-muted-foreground hover:text-primary"> */}
              {/* <Linkedin className="mr-2 h-4 w-4" /> */}
              {/* {user.linkedin} */}
            {/* </Link> */}
          </div>
          <Tabs defaultValue="projects">
            <TabsList>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="contributions">Contributions</TabsTrigger>
            </TabsList>
            <TabsContent value="projects">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  {projectIsLoading ? 
                  <div className="grid place-content-center w-full mt-12">
                    <Loader className="animate-spin"/>
                  </div>
                  : projects.map((project, index) => (
                    <ProjectCard project={project} key={index}/>
                  ))}
                </div>
            </TabsContent>
            <TabsContent value="contributions">
              <p className="text-muted-foreground mt-4">No contributions yet.</p>
            </TabsContent>
          </Tabs>
         {/* <div className="mt-8">
          <h1 className="font-bold mb-4">Badges</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 items-center">
              <div className="grid gap-y-2 text-center w-full bg-[#F3F4F6]  dark:bg-[#1D1D1D] p-4 rounded-md h-full">
                <div className="rounded-full overflow-hidden mx-auto">
                  <Image src={medal} alt="skilled-dev"/>
                </div>
                <h3 className="font-bold">Cyberpsycho</h3>
                <p className=" text-muted-foreground text-sm">Participated in 5 projects as a CyberSecurity engineer</p>
              </div>
              <div className="grid gap-y-2 text-center w-full bg-[#F3F4F6] h-full dark:bg-[#1D1D1D] p-4 rounded-md">
                <div className="rounded-full overflow-hidden mx-auto">
                  <Image src={medal2} alt="skilled-dev" className="object-cover object-center"/>
                </div>
                <h3 className="font-bold">NetRunner</h3>
                <p className=" text-neutral-600">Participated in 5 projects as a Web Developer</p>
              </div>
            </div>
         </div>
         <div className="mt-8">
          <h1 className="font-bold mb-4">Contests Badges</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 items-center">
              <div className="grid gap-y-2 text-center w-full bg-[#F3F4F6]  dark:bg-[#1D1D1D] p-4 rounded-md">
                <div className="rounded-full overflow-hidden mx-auto">
                  <Image src={medal5} alt="skilled-dev"/>
                </div>
                <h3 className="font-bold">Team Player</h3>
                <p className=" text-muted-foreground">Won a contest with a team</p>
              </div>
            </div>
         </div> */}
        </CardContent>
      </Card>
    </div>
  )
}