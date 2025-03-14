'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { PlusCircle, Loader2, User, Github, Plus, LinkIcon, CheckCircle2Icon } from 'lucide-react'
import Image from 'next/image'
import whatsappImage from "../../public/whatsapp-color-icon.png"
import discordImage from "../../public/discord-round-color-icon.png"
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const skillOptions = [
  "JavaScript", "Python", "React", "Node.js", "Machine Learning",
  "UI/UX Design", "Data Science", "Mobile Development", "DevOps",
  "Blockchain", "Cybersecurity", "Cloud Computing",
  "Graphic Design"
]

interface IParticipant {
  userId: string,
  username: string,
  initials: string
} 

export function ProjectPost() {
  const [title, setTitle] = useState<string>('');
  const [shortDescription, setShortDescription] = useState('');
  const [detailedDescription, setDetailedDescription] = useState('');
  const [requiredSkills, setSkills] = useState<string[]>([]);
  // const [estimatedCompletion, setEstimatedCompletion] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [githubRepo, setGithubRepo] = useState("");
  const [whatsAppLink, setWhatsAppLink] = useState("");
  const [discordLink, setDiscordLink] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [participants, setParticipants] = useState<IParticipant[]>([]);
  const [isCreated, setIsCreated] = useState(false);

  const router = useRouter();
  async function onAddMember() {
    setIsLoading(true)
    try{
        const response = await fetch(`/api/user?username=${username}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })
        if(response.status === 404){
            setError(`No user was found with the username ${username}`)
        }
        if(response.ok){
            setError("");
            const data = await response.json();
            setParticipants( prev => [...prev, { userId: data._id, username: data.username, initials: data.name[0] + data.name[1], position: "Project member"}])
        }
    }catch(error){
      console.log(error);
    }finally{
        setIsLoading(false);
    }
}

  const createdDate = Date.now();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    const response = await fetch("api/projects/createpost", {
      method : 'POST',
      headers: {
        'Content-Type': "application/json",
      },
      body : JSON.stringify({ title,
        shortDescription,
        detailedDescription,
        requiredSkills,
        createdDate,
        githubRepo,
        whatsAppLink,
        discordLink,
        participants
      })
    })
    await response.json();
    if(response.ok){
      setIsCreated(true);
      router.push("/")
    }
    setIsSubmitting(false)
  }

  return (
    <div className="container mx-auto flex flex-col lg:flex-row lg:px-4 pt-5 pb-20">
      {
        isCreated ?
        <Card className="lg:w-[350px] mt-4 px-4 bg-transparent backdrop-blur-3xl">
          <CardContent className='grid place-content-center text-center p-20'>
            <CheckCircle2Icon className='text-green-500 text-2xl mx-auto mb-3' size={"60px"}/>
            <h1>Post created successfully successfully!</h1>
            <p className='animate-pulse'>Redirecting...</p>
          </CardContent>
        </Card>
        :
        <>
          <Card className='border-none w-full '>
            <CardHeader>
              <CardTitle className="text-3xl font-bold">Post a New Project</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Project Title</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter your project title"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="shortDescription">Short Description</Label>
                  <Textarea
                    id="shortDescription"
                    value={shortDescription}
                    onChange={(e) => setShortDescription(e.target.value)}
                    placeholder="Briefly describe your project (max 200 characters)"
                    maxLength={200}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="longDescription">Detailed Description</Label>
                  <Textarea
                    id="longDescription"
                    value={detailedDescription}
                    onChange={(e) => setDetailedDescription(e.target.value)}
                    placeholder="Provide a detailed description of your project"
                    className="min-h-[200px]"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label className='flex gap-4'>Required Skills <p className='text-muted-foreground'>(List by importance)</p></Label>
                  <Select
                    onValueChange={(value) => setSkills(prev => [...prev, value])}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select skills" />
                    </SelectTrigger>
                    <SelectContent>
                      {skillOptions.map((skill) => (
                        <SelectItem key={skill} value={skill}>{skill}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {requiredSkills.map((skill, index) => (
                      <Button
                        key={index}
                        variant="secondary"
                        size="sm"
                        onClick={() => setSkills(requiredSkills.filter((_, i) => i !== index))}
                      >
                        {skill} ✕
                      </Button>
                    ))}
                  </div>
                </div>

                {/* <div className="space-y-2">
                  <Label htmlFor="estimatedCompletion">Estimated Completion Date</Label>
                  <Input
                    id="estimatedCompletion"
                    type="date"
                    value={estimatedCompletion}
                    onChange={(e) => setEstimatedCompletion(e.target.value)}
                    required
                  />
                </div> */}

                <div className="space-y-2">
                  <Label htmlFor="discordLink" className='flex gap-2 items-center mb-4'><LinkIcon size={'20px'}/> Links <span className='text-muted-foreground'>(All links are optional)</span></Label>
                  <div className='flex gap-2 items-center'>    
                    <Github />                    
                    <Input
                      id="githubRepo"
                      value={githubRepo}
                      onChange={(e) => setGithubRepo(e.target.value)}
                      placeholder="Github repo link"
                      maxLength={200}
                    />
                  </div>
                  <div className='flex gap-2 items-center'>          
                    <Image src={whatsappImage} width={23} height={23} alt='whatsapp'/>
                    <Input
                      id="whatsAppLink"
                      value={whatsAppLink}
                      onChange={(e) => setWhatsAppLink(e.target.value)}
                      placeholder="Whatsapp invitation link"
                    />
                  </div>
                  <div className='flex gap-2 items-center'> 
                    <Image src={discordImage} width={23} height={23} alt='whatsapp'/>         
                    <Input
                      id="Discord discordLink link"
                      value={discordLink}
                      onChange={(e) => setDiscordLink(e.target.value)}
                      placeholder="Discord channel link"
                      maxLength={200}
                    />
                  </div>
                </div>
    {/* 
                <div className="flex items-center space-x-2">
                  <Switch
                    id="isPublic"
                    checked={isPublic}
                    onCheckedChange={setIsPublic}
                  />
                  <Label htmlFor="isPublic">Make project public</Label>
                </div> */}

                <CardFooter className="px-0">
                  <Button type="submit" disabled={isSubmitting} className="w-full">
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Posting Project...
                      </>
                    ) : (
                      <>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Post Project
                      </>
                    )}
                  </Button>
                </CardFooter>
              </form>
            </CardContent>
          </Card>
          <div className='w-full xl:w-[30%] mt-2 border py-5 px-2 xl:ml-4 max-h-max rounded-lg'>
            <p className='flex gap-2 mb-2'><span><User /></span>Participants</p>
            <p className='text-muted-foreground text-sm'>if you have team members that use synergy add them to the participants list</p>
            <form className='my-4'>
            <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="id">Participant user id:</Label>
                        <div className='flex items-center'>
                        <Input
                            id="id"
                            placeholder="example123"
                            type="text"
                            autoCapitalize="none"
                            autoCorrect="off"
                            disabled={isLoading}
                            className='rounded-r-none'
                            onChange={(e : React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                        />
                        <Button type='button' className='p-2 duration-300 rounded-l-none' onClick={onAddMember}>
                            <Plus />
                        </Button>
                        </div>
                    </div>
                    {
                        error !== "" &&
                        <p className='text-red-500 font-normal text-sm'>
                            {error}
                        </p>
                    }
                </div>
                <div className='mb-6'>
                    <p className='text-muted-foreground'>Participants: </p>
                    <div className='flex'>
                        <div className='dark:bg-[#1A1A1A] bg-muted-foreground text-white text-center p-2 rounded-full '>
                            <p>you</p>
                        </div>
                        {
                            participants &&
                            participants.length > 0 &&
                            participants.map((participant, idx) => (
                                <Link href={`/user/${participant.username}`} key={idx} target='_blank' className='dark:bg-[#1d1d1d] bg-muted-foreground text-white w-10 h-10 text-center p-2 rounded-full uppercase'>
                                    {participant.initials}
                                </Link>
                            ))
                        }
                    </div>
                </div>
            </form>
            {/* <h3 className='text-sm text-muted-foreground'>Add users of one of your teams as participants</h3> */}
          </div>
        </>
      }
    </div>
  )
}