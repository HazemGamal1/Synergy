"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bot, Loader} from 'lucide-react'
import { useEffect, useState } from "react"
import { IUser } from "../../../../../models/User";
import PageLoading from "@/components/PageLoading"
import InvitationButton from "@/components/Invitations/InvitationButton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { IProject } from "../../../../../models/Project"
import ProjectCard from "@/components/projects/ProjectCard"
import { PageProps } from "../../../../../../.next/types/app/(withNav)/user/[username]/page"
import { Github, Linkedin, Twitter, Youtube, Globe } from "lucide-react"


const User = ({ params }: PageProps) => {
  const [user, setUser] = useState<IUser>();
  const [projects, setProjects] = useState<IProject[]>([])
  const [projectIsLoading, setProjectIsLoading] = useState<boolean>(false);
  const [invVisible, setInvVisisble] = useState<boolean>(true);

  useEffect(() => {
    const getUser = async () => {
      setProjectIsLoading(true);
        const { username } = await params;
        const response = await fetch("/api/validate-token", {
          method : 'GET',
          headers: {
            'Content-Type': "application/json",         
          }
        })
    
        const dataUser = await response.json();
        if(!dataUser.user){
          setInvVisisble(false);
        }
        else if(dataUser.user.username === username){
          setInvVisisble(false);
        }
        const res = await fetch(`/api/user?username=${username}`);
        const data = await res.json();
        setUser(data);      
        const { _id } = data;
        const projectRes = await fetch(`/api/projects/get-project-from-id?userId=${_id}`);
        const projectData = await projectRes.json();
        setProjects(projectData);
        setProjectIsLoading(false)
      }
      getUser();
  }, []);
  if(!user) return <PageLoading />
  return (
    <div className="container mx-auto px-4 py-15">
      <Card className="border-none shadow-none">
        <CardHeader className="flex flex-col sm:flex-row items-center gap-4">
          <Avatar className="h-32 w-32 relative overflow-visible">
            <AvatarImage src={user.name} alt={user.name} />
            <AvatarFallback className="text-4xl font-bold">{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            {
              (invVisible) && 
              <>
                <InvitationButton inviteeId={user._id.toString()} inviteeUsername={user.username} />
              </>
            }
          </Avatar>
          <div className="text-center sm:text-left">
            <CardTitle className="text-3xl font-bold">{user.name}</CardTitle>
            <p className="text-muted-foreground">@{user.username}</p>
          </div>
        </CardHeader>
        <CardContent>
          <p className="pb-2 font-semibold">Skills:</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {user.skills.map((skill, index) => (
              <span
                key={index}
                className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
          <Tabs defaultValue="projects">
            <TabsList>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="social_links">Social links</TabsTrigger>
            </TabsList>
            <TabsContent value="projects">
              {
                projectIsLoading ?
                  <div className="grid place-content-center w-full mt-3">
                    <Loader className="animate-spin"/>
                  </div>
                :
                projects.length > 0 ?
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  {projects.map((project, index) => (
                    <ProjectCard project={project} key={index}/>
                  ))
                  }
                </div>
                :
                <div className="p-12 w-full grid place-content-center text-center">
                  <Bot size={100} className="mx-auto text-muted-foreground"/>
                  <p>It seems like this uers has not created any projects yet...</p>
                </div>

              }
            </TabsContent>
            <TabsContent value="social_links">
                <div className="w-full grid gap-4 grid-cols-1 lg:grid-cols-3 py-8">
                  <div className="grid gap-1 w-full border p-4 rounded-lg">
                    <p className="flex gap-2 items-center text-muted-foreground">
                      <Github />
                      Github
                    </p>
                    {
                      user.github ?
                      <a href={user.github} className="hover:underline hover:text-blue-600" target="#">
                        {user.github}
                      </a>
                      :
                      <p className="text-muted-foreground">No data found</p>
                    }
                  </div>
                  <div className="grid gap-1 w-full border p-4 rounded-lg">
                    <p className="flex gap-2 items-center text-muted-foreground">
                      <Linkedin />
                      LinkedIn
                    </p>
                    {
                      user.linkedin ?
                      <a href={user.linkedin} className="hover:underline hover:text-blue-600" target="#">
                        {user.linkedin}
                      </a>
                      :
                      <p className="text-muted-foreground">No data found</p>
                    }
                  </div>
                  <div className="grid gap-1 w-full border p-4 rounded-lg">
                    <p className="flex gap-2 items-center text-muted-foreground">
                      <Twitter />
                      X
                    </p>
                    {
                        user.twitter ?
                        <a href={user.twitter} className="hover:underline hover:text-blue-600" target="#">
                          {user.twitter}
                        </a>
                        :
                        <p className="text-muted-foreground">No data found</p>
                      }
                  </div>
                  <div className="grid gap-1 w-full border p-4 rounded-lg">
                    <p className="flex gap-2 items-center text-muted-foreground">
                      <Youtube />
                      Youtube
                    </p>
                    {
                      user.youtube ?
                      <a href={user.github} className="hover:underline hover:text-blue-600" target="#">
                        {user.youtube}
                      </a>
                      :
                      <p className="text-muted-foreground">No data found</p>
                    }
                  </div>
                  <div className="grid gap-1 w-full border p-4 rounded-lg">
                    <p className="flex gap-2 items-center text-muted-foreground">
                      <Globe />
                      Website
                    </p>
                    {
                        user.website ?
                        <a href={user.website} className="hover:underline hover:text-blue-600" target="#">
                          {user.website}
                        </a>
                        :
                        <p className="text-muted-foreground">No data found</p>
                      }
                  </div>
                </div>
            </TabsContent>
          </Tabs>
         {/* <div className="mt-8">
          <h1 className="font-bold mb-4">Badges</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 items-center">
              <div className="grid gap-y-2 text-center w-full bg-[#F3F4F6]  dark:bg-[#1D1D1D] p-4 rounded-md">
                <div className="rounded-full overflow-hidden mx-auto">
                  <Image src={medal} alt="skilled-dev"/>
                </div>
                <h3 className="font-bold">Cyberpsycho</h3>
                <p className=" text-neutral-600">Participated in 5 projects as a CyberSecurity engineer</p>
              </div>
              <div className="grid gap-y-2 text-center w-full bg-[#F3F4F6] h-full dark:bg-[#1D1D1D] p-4 rounded-md">
                <div className="rounded-full overflow-hidden mx-auto">
                  <Image src={medal2} alt="skilled-dev" className="object-cover object-center"/>
                </div>
                <h3 className="font-bold">NetRunner</h3>
                <p className=" text-neutral-600">Participated in 5 projects as a Web Developer</p>
              </div>
              <div className="grid gap-y-2 text-center bg-[#F3F4F6]  h-full  dark:bg-[#1D1D1D] p-4 rounded-md w-full">
                <div className="rounded-full overflow-hidden mx-auto">
                  <Image src={medal3} alt="skilled-dev"/>
                </div>
                <h3 className="font-bold">DataScraper</h3>
                <p className=" text-neutral-600">Participated in 5 projects as a Data Scientist</p>
              </div>
              <div className="grid gap-y-2 text-center bg-[#F3F4F6]  h-full dark:bg-[#1D1D1D] p-4 rounded-md w-full">
                <div className="rounded-full overflow-hidden mx-auto">
                  <Image src={medal4} alt="skilled-dev"/>
                </div>
                <h3 className="font-bold">Rockstar</h3>
                <p className=" text-neutral-600">Participated in 5 projects as a Game Audio Engineer</p>
              </div>
            </div>
         </div> */}
        </CardContent>
      </Card>
    </div>
  )
}

export default User
