'use client'
import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Share2, ThumbsUp, Calendar, User, Ellipsis, MessageCircle, Trash2, Github, LinkIcon } from 'lucide-react'
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Skeleton } from "@/components/ui/skeleton"
import ParticipateButton from "@/components/participateButton"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import WhatsappIcon from "../../../../../public/whatsapp-color-icon.png"
import DiscordIcon from "../../../../../public/discord-round-color-icon.png"
import Image from 'next/image'

interface IUser {
  userId: string,
  name: string,
  email: string,
  username: string
}

interface IComment {
  text: string,
  username: string,
  user: string
}
interface IParticipant {
  userId: string,
  username: string,
  position: string,
  initials: string
}

interface IIProject {
  _id: string,
  title: string,
  ownerId: string,
  ownerUsername: string,
  ownerName: string,
  requiredSkills: string[],
  shortDescription: string,
  detailedDescription: string,
  likes: [],
  comments: IComment[],
  createdDate: Date,
  githubRepo: string,
  whatsAppLink: string,
  discordLink: string,
  participants: IParticipant[]
}

export default function ProjectPage({ params }: { params : { id: string }}) {
  const [user, setUser] = useState<IUser>();
  const [copied, setCopied] = useState(false);
  const [commentText, setCommentText] = useState("")
  const [comments, setComments] = useState<IComment[]>([]);
  const [project, setProject] = useState<IIProject>();
  const [likes, setLikes] = useState<number>(2);
  const pathname = usePathname();
  const router = useRouter();

  const copyToClipboard = async () => {
    try {
      setClipboard(`localhost:3000${pathname}`)
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); 
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };
  const setClipboard = async (val : string) => {
    await navigator.clipboard.writeText(val);
  }
  const addNewComment = async () => {
    const { id } = await params;
    await fetch(`/api/projects/updateproject/add_comment/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ comment: commentText})
    })
    setComments(prev => [...prev, {text: commentText, username: "", user: ""}])
  }
  
  const addLike = async () => {
    if(project){
      setLikes(project?.likes.length + 1);
    }
    const { id } = await params;
    await fetch(`/api/projects/updateproject/add-like/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  const deletePost = async () => {
    try{
      if(project){
        await fetch("/api/projects/delete-project", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id : project._id })
        })

        router.push("/")
      }
      
    }catch(error){
      console.log(error);
    }
  }
  useEffect(() => {

    const getPost = async () => {
      try{
        const { id } = await params;
        const res = await fetch(`/api/projects/project/${id}`);
        const data = await res.json();
        setProject(data);
        setLikes(data.likes.length)
        setComments(data.comments)
      }catch(error)
      {
        console.log(error);
      }
    }
    const handleGetUserData = async () => 
      {
          const response = await fetch("/api/validate-token", {
          method : 'GET',
          headers: {
            'Content-Type': "application/json",         
          }
          })
      
          const data = await response.json();
          setUser(data.user);
      }
    getPost();
    handleGetUserData();
  }, []);
  
  return (
    <div className="px-4 2xl:px-4 container mx-auto pt-4 pb-4 2xl:pt-5 2xl:pb-20">
      {
        copied &&
        <div className="absolute left-1/2 bottom-4">
          <div className="bg-blue-500 p-3 rounded-lg text-white font-semibold">Text copied to clipboard</div>
        </div>
      }
      {
        !project ? 
        <>
          <Skeleton className="w-full h-[400px] rounded-lg"/>
          <Skeleton className="w-full h-[200px] rounded-lg mt-4"/>
          <Skeleton className="w-full h-[300px] rounded-lg mt-6"/>
        </>
        :
        <>
          <Card className="mb-8 border shadow-none dark:bg-[#1c1c1c]">
          <CardHeader>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
              <div> 
                <CardTitle className="text-3xl font-bold mb-2">
                  {
                    project && <>{project.title}</>
                  }
                </CardTitle>
                <div className="flex items-center text-muted-foreground">
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>Posted on {
                    project && <>{project.createdDate.toString().split('T')[0]}</>
                  }</span>
                </div>
              </div>
              <div className="flex items-center mt-4 md:mt-0">
                <Button variant="outline" className="mr-2" onClick={copyToClipboard}>
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
                {
                  project.ownerId === user?.userId &&
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                        <div className="ml-4 text-muted-foreground cursor-pointer hover:text-black dark:hover:text-white duration-300">
                          <Ellipsis />
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>
                        <button className='flex gap-2 items-center' onClick={deletePost}>
                          <Trash2 /> Delete
                        </button>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                }
              </div>
            </div>
            <div className="flex items-center mb-4">
              <Avatar className="h-10 w-10 mr-2">
                <AvatarImage src={project.ownerUsername[0].toUpperCase()+project.ownerUsername[1].toUpperCase()} alt={project.ownerUsername} />
                <AvatarFallback>{project.ownerUsername[0].toUpperCase()+project.ownerUsername[1].toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{project.ownerName}</p>
                <Link href={`/user/${project.ownerUsername}`} className="text-sm text-muted-foreground hover:text-primary">
                  @{project.ownerUsername}
                </Link>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="mt-4">Paricipants :</p>
              <div className="grid grid-cols-3 gap-1 max-w-max">
              {
                project.participants.length !== 0 &&
                project.participants.map((participant, idx) => (
                  <Link href={`/user/${participant.username}`} key={idx} className='grid gap-1 text-center'>
                    <div className="dark:bg-[#262626] mx-auto bg-blue-600 text-white rounded-full p-1 w-8 text-center uppercase h-8">
                      <div>{participant.initials}</div>
                    </div>
                    <p className='text-muted-foreground text-xs'>@{participant.username}</p>
                    <p className='text-blue-600 text-xs'>{participant.position}</p>
                  </Link>
                ))
              }
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="description">
              <TabsList>
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="details">Project Details</TabsTrigger>
                <TabsTrigger value="links">Links</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="mt-4">
                <p className="mb-4">{project.shortDescription}</p>
                <p className="text-muted-foreground">{project.detailedDescription}</p>
              </TabsContent>
              <TabsContent value="details" className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Required Skills</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.requiredSkills.map((skill, index) => (
                    <Badge key={index} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
                <h3 className="text-lg font-semibold mb-2">Project Status</h3>
                <p className="text-muted-foreground mb-4">In Progress</p>
                <h3 className="text-lg font-semibold mb-2">Estimated Completion</h3>
                <p className="text-muted-foreground">December 2024</p>
              </TabsContent>
              <TabsContent value="links" className="mt-4">
                <h3 className="text-lg font-semibold mb-2 flex gap-2 items-center"><Github /> Github Repo</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  <LinkIcon />
                  <p className='text-muted-foreground'>{project.githubRepo}</p>                
                </div>
                <h3 className="text-lg font-semibold mb-2 flex gap-2 items-center"><Image src={WhatsappIcon} width={20} height={20} alt='whatsappIcon'/> Whatsapp Link</h3>
                <div className="flex flex-wrap gap-2 mb-4 ">
                  <LinkIcon />
                  <p className='text-muted-foreground'>{project.whatsAppLink}</p>
                </div>
                <h3 className="text-lg font-semibold mb-2 flex gap-2 items-center"><Image src={DiscordIcon} width={20} height={20} alt='whatsappIcon'/> Discord Chat</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  <LinkIcon />
                  <p className='text-muted-foreground'>{project.discordLink}</p>  
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter>
            <div className="flex items-center space-x-4 text-muted-foreground">
              <Button variant="ghost" className="flex items-center" onClick={() => addLike()}>
                <ThumbsUp className="mr-2 h-4 w-4" />
                <span className="text-[#1971FB]">{likes}</span>Likes
              </Button>
              <Button variant="ghost" className="flex items-center">
                <MessageSquare className="mr-2 h-4 w-4" />
                {project.comments.length} Comments
              </Button>
            </div>
          </CardFooter>
        </Card>

        <Card className="mb-8 dark:bg-[#1c1c1c]">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Comments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {
                comments.length === 0 && 
                <div className="text-muted-foreground grid gap-y-5 place-content-center w-full text-center">
                  <MessageCircle className="text-3xl mx-auto" size={"100px"}/>
                  <h4>No comments on this project yet..</h4>
                </div>
              }
              {comments.map((comment, idx) => (
                <div key={idx} className="flex items-start space-x-4">
                  <Link href={`/user/${comment.username}`}>
                    <Avatar>
                      <AvatarFallback><User /></AvatarFallback>
                    </Avatar>
                  </Link>
                  <div className="flex-1 w-full">
                    <div className="flex w-full justify-between items-center">
                      <p className="font-semibold">{comment.username}</p>
                    </div>
                    <p className="text-muted-foreground">{comment.text}</p>
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
              <Button className="mt-4" onClick={() => addNewComment()}>Post Comment</Button>
            </div>
          </CardContent>
        </Card>
        
        {
          user?.userId !== project.ownerId && 
          <Card>
            <CardContent className="flex flex-col items-center text-center p-6 dark:bg-[#1c1c1c]">
              <div className="bg-muted p-4 py-4 rounded-full mb-4">
                <User className="h-12 w-12 text-primary" />
              </div>
              <CardTitle className="text-2xl font-bold mb-2">Want to Participate?</CardTitle>
              <p className="text-muted-foreground mb-4">Join our community and contribute to exciting projects like this one!</p>
              {
                user ?
                <ParticipateButton requiredSkills={project.requiredSkills} inviteeUsername={project.ownerUsername} inviter={user!.userId} inviteeId={project.ownerId} project={project._id} projectName={project.title}/>
                :
                <p>Please login first and refresh the page to participate in project</p>
              }
            </CardContent>
          </Card>
        }

        <Card className="mb-8 border-none mt-10 shadow-none dark:bg-[#1c1c1c]">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Related Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full text-center py-12">
              <p className="text-muted-foreground mx-auto text-lg">Could not find similar projects</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* {project.relatedProjects.map((relatedProject) => (
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
              ))} */}
            </div>
          </CardContent>
        </Card>  
        </>
      }
      
    </div>
  )
}
