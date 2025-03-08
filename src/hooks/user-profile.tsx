import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mail, Github, Linkedin } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"

// Mock user data
const user = {
  name: "John Doe",
  username: "johndoe",
  avatar: "/placeholder.svg?height=128&width=128",
  bio: "Passionate developer and designer. Always learning and creating.",
  email: "john.doe@example.com",
  github: "johndoe",
  linkedin: "johndoe",
  skills: ["React", "Node.js", "UI/UX Design", "Python"],
  projects: [
    {
      id: 1,
      title: "AI-powered Chat Bot",
      description: "Developing an intelligent chatbot using machine learning algorithms.",
      image: "/placeholder.svg?height=100&width=200",
    },
    {
      id: 2,
      title: "Eco-friendly Packaging Design",
      description: "Creating sustainable packaging solutions for consumer goods.",
      image: "/placeholder.svg?height=100&width=200",
    },
  ]
}

export default function UserProfile() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader className="flex flex-col sm:flex-row items-center gap-4">
          <Avatar className="h-32 w-32">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div className="text-center sm:text-left">
            <CardTitle className="text-3xl font-bold">{user.name}</CardTitle>
            <p className="text-muted-foreground">@{user.username}</p>
          </div>
        </CardHeader>
        <CardContent>
          <p className="mb-4">{user.bio}</p>
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
          <div className="flex flex-wrap gap-4 mb-6">
            <Link href={`mailto:${user.email}`} className="flex items-center text-muted-foreground hover:text-primary">
              <Mail className="mr-2 h-4 w-4" />
              {user.email}
            </Link>
            <Link href={`https://github.com/${user.github}`} className="flex items-center text-muted-foreground hover:text-primary">
              <Github className="mr-2 h-4 w-4" />
              {user.github}
            </Link>
            <Link href={`https://linkedin.com/in/${user.linkedin}`} className="flex items-center text-muted-foreground hover:text-primary">
              <Linkedin className="mr-2 h-4 w-4" />
              {user.linkedin}
            </Link>
          </div>
          <Tabs defaultValue="projects">
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
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}