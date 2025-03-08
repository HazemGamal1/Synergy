'use client'
import img from "../../public/invoicer.png"
import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Star, MessageSquare, Share2, ThumbsUp, Calendar, User, PlusCircle } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import smarthome from "../../public/output (2).jpg"
import { IProject } from "../../models/Project"
import PageLoading from "./PageLoading"
import SpinnerLoading from "./SpinnerLoading"

// Mock data for the showcased project
const project = {
  id: 1,
  title: "AI-powered Chat Bot",
  description: "Developing an intelligent chatbot using machine learning algorithms. This project aims to create a highly responsive and context-aware chatbot that can understand and respond to user queries in natural language. The chatbot will be trained on a large dataset to handle a wide range of topics and will be continuously improved through machine learning techniques.",
  longDescription: "Our AI-powered chatbot project is at the forefront of natural language processing and machine learning. We're developing a sophisticated system that can understand context, learn from interactions, and provide human-like responses to a wide variety of queries. The chatbot will be designed to handle customer service inquiries, provide technical support, and even engage in casual conversation. Key features include multi-language support, sentiment analysis, and integration with popular messaging platforms. We're using cutting-edge technologies like transformer models and reinforcement learning to push the boundaries of what's possible in conversational AI.",
  skills: ["Python", "NLP", "Machine Learning", "TensorFlow", "PyTorch", "API Development"],
  date: "2023-11-10",
  image: img,
  author: {
    name: "Jane Smith",
    avatar: "/placeholder.svg?height=40&width=40",
    username: "janesmith"
  },
  likes: 127,
  comments: [
    { id: 1, author: "John Doe", content: "This project looks amazing! I'd love to contribute.", avatar: "/placeholder.svg?height=40&width=40" },
    { id: 2, author: "Alice Johnson", content: "Have you considered using BERT for better language understanding?", avatar: "/placeholder.svg?height=40&width=40" }
  ],
  relatedProjects: [
    { id: 2, title: "Sentiment Analysis Tool", image: "/placeholder.svg?height=100&width=200" },
    { id: 3, title: "Voice-Controlled Smart Home", image: smarthome },
    { id: 4, title: "Language Translation App", image: "/placeholder.svg?height=100&width=200" }
  ]
}

interface IIProject {
  title: string,
  requiredSkills: string[],
  shortDescription: string,
  detailedDescription: string,
  createdDate: Date,
  estimatedCompletionDate: Date
}
export function ProjectShowcaseComponent({ title }: {title : string}) {
  const [commentText, setCommentText] = useState("")
  const [projectapi, setProject] = useState<IIProject>();
  useEffect(() => {
    const getPost = async () => {
      try{
        const res = await fetch(`/api/project/${title}`);
        const data = await res.json();
        setProject(data);
        console.log(data);
      }catch(error: any)
      {
        console.log(error);
      }
    }
    getPost()
  }, [])

  console.log(projectapi);
  if(!projectapi) return <SpinnerLoading/>
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-8 border-none border-[#1D1D1D] outline-none shadow-none">
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
            <div>
              <CardTitle className="text-3xl font-bold mb-2">
                {
                projectapi && <>{projectapi.title}</>
                }
              </CardTitle>
              <div className="flex items-center text-muted-foreground">
                <Calendar className="mr-2 h-4 w-4" />
                <span>Posted on {
                  projectapi && <>{projectapi.createdDate}</>
                }</span>
              </div>
            </div>
            <div className="flex items-center mt-4 md:mt-0">
              <Button variant="outline" className="mr-2">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
              <Button>
                <Star className="mr-2 h-4 w-4" />
                Save Project
              </Button>
            </div>
          </div>
          <div className="flex items-center mb-4">
            <Avatar className="h-10 w-10 mr-2">
              <AvatarImage src={project.author.avatar} alt={project.author.name} />
              <AvatarFallback>{project.author.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{project.author.name}</p>
              <Link href={`/profile/${project.author.username}`} className="text-sm text-muted-foreground hover:text-primary">
                @{project.author.username}
              </Link>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Image
            src={project.image}
            alt={project.title}
            width={1000}
            height={1000}
            className="rounded-lg object-cover w-full mb-6"
          />
          <Tabs defaultValue="description">
            <TabsList>
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="details">Project Details</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="mt-4">
              <p className="text-muted-foreground mb-4">{projectapi.shortDescription}</p>
              <p className="text-muted-foreground">{projectapi.detailedDescription}</p>
            </TabsContent>
            <TabsContent value="details" className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Required Skills</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {projectapi.requiredSkills.map((skill, index) => (
                  <Badge key={index} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
              <h3 className="text-lg font-semibold mb-2">Project Status</h3>
              <p className="text-muted-foreground mb-4">In Progress</p>
              <h3 className="text-lg font-semibold mb-2">Estimated Completion</h3>
              <p className="text-muted-foreground">December 2023</p>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter>
          <div className="flex items-center space-x-4 text-muted-foreground">
            <Button variant="ghost" className="flex items-center">
              <ThumbsUp className="mr-2 h-4 w-4" />
              {project.likes} Likes
            </Button>
            <Button variant="ghost" className="flex items-center">
              <MessageSquare className="mr-2 h-4 w-4" />
              {project.comments.length} Comments
            </Button>
          </div>
        </CardFooter>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Comments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {project.comments.map((comment) => (
              <div key={comment.id} className="flex items-start space-x-4">
                <Avatar>
                  <AvatarImage src={comment.avatar} alt={comment.author} />
                  <AvatarFallback>{comment.author[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-semibold">{comment.author}</p>
                  <p className="text-muted-foreground">{comment.content}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <Textarea
              placeholder="Leave a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="mb-2"
            />
            <Button className="mt-4">Post Comment</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Related Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {project.relatedProjects.map((relatedProject) => (
              <Card key={relatedProject.id}>
                <CardHeader className="p-0">
                  <Image
                    src={relatedProject.image}
                    alt={relatedProject.title}
                    width={200}
                    height={200}
                    className="rounded-t-lg object-cover w-full h-[15rem]"
                  />
                </CardHeader>
                <CardContent className="p-4">
                  <CardTitle className="text-lg">{relatedProject.title}</CardTitle>
                  <Button variant="link" className="p-0">View Project</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex flex-col items-center text-center p-6">
          <User className="h-12 w-12 text-primary mb-4" />
          <CardTitle className="text-2xl font-bold mb-2">Want to Participate?</CardTitle>
          <p className="text-muted-foreground mb-4">Join our community and contribute to exciting projects like this one!</p>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Join Project
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}