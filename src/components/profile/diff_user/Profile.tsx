"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Handshake } from 'lucide-react'
import Image from "next/image"
import medal from "../../../../public/cyberpsycho.jpg"
import medal2 from "../../../../public/netrunner.jpg"  
import medal3 from "../../../../public/datascraper.jpg"  
import medal4 from "../../../../public/rockstar.jpg"  
import { IUser } from "../../../../models/User"



export default function UserProfile({ user } : { user: IUser}) {
  const sendInvitation = async() => {
    try {
      await fetch('/api/send-invitation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }catch(error){
      console.log(error);
    }
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <Card className="border-none shadow-none">
        <CardHeader className="flex flex-col sm:flex-row items-center gap-4">
          <Avatar className="h-32 w-32 relative overflow-visible">
            <AvatarImage src={user.name} alt={user.name} />
            <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            <div className="absolute -bottom-1 -right-0 bg-blue-600 text-white rounded-full p-2 cursor-pointer hover:opacity-95" onClick={() => sendInvitation()}>
              <Handshake />
            </div>
          </Avatar>
          <div className="text-center sm:text-left">
            <CardTitle className="text-3xl font-bold">{user.name}</CardTitle>
            <p className="text-muted-foreground">@{user.username}</p>
          </div>
        </CardHeader>
        <CardContent>
          {/* <p className="mb-4"></p> user bio */}
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
          {/* <Tabs defaultValue="projects">
            <TabsList>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="contributions">Contributions</TabsTrigger>
            </TabsList>
            <TabsContent value="projects">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                {user.projects.map((project) => (
                  <Card key={project.id}>
                    <CardHeader>
                      <Image
                        src={project.image}
                        alt={project.title}
                        width={400}
                        height={200}
                        className="rounded-t-lg object-cover w-full h-48"
                      />
                    </CardHeader>
                    <CardContent>
                      <CardTitle className="mb-2">{project.title}</CardTitle>
                      <p className="text-muted-foreground">{project.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="contributions">
              <p className="text-muted-foreground mt-4">No contributions yet.</p>
            </TabsContent>
          </Tabs> */}
         <div className="mt-8">
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
         </div>
        </CardContent>
      </Card>
    </div>
  )
}