import React from 'react'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Link from 'next/link'
import { Plus, Users2 } from 'lucide-react'

interface IMember {
    userId: string,
    username: string,
    initials: string
} 
export default function CreateTeamButton() {
    const [isLoading, setIsLoading] = useState(false);
    const [title, setTitle] = useState<string>();
    const [username, setUsername] = useState<string>();
    const [members, setMembers] = useState<IMember[]>([]);
    const [error, setError] = useState("");
    const [description , setDescription] = useState<string>()

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
                setMembers( prev => [...prev, { userId: data._id, username: data.username, initials: data.name[0] + data.name[1]}])
                console.log(data)
            }
        }catch(error){
            console.log(error)
        }finally{
            setIsLoading(false);
        }
    }
    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault()
        setIsLoading(true)
        try{
            const data = { title, description , members}
            const response = await fetch(`/api/create-team`, {
                method: "Post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            if(response.status === 404){
                setError(`No user was found with the username ${username}`)
            }
            if(response.ok){
                setError("");
                const data = await response.json();
                console.log(data)
            }
        }catch(error){
            console.log(error);
        }finally{
            setIsLoading(false);
        }
    }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className='mt-3 flex p-0 items-center hover:no-underline hover:opacity-90'>
            <div className='rounded-full bg-[#2F9BF7] p-0.5'>
                <Plus size={"15px"} className='text-white dark:text-black'/>
            </div>
            <p className='text-[#2F9BF7] capitalize font-semibold'>Create new team</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[465px]  border-none rounded-lg">
        <DialogHeader>
          <DialogTitle className='flex gap-2 items-center'><Users2 className='text-muted-foreground'/> Create a new team</DialogTitle>
          <DialogDescription>
            <span className='text-muted-foreground'>Add team members</span>
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit}>
            <div className="grid gap-2">
                <Label htmlFor="title">Team title:</Label>
                <Input
                id="title"
                type="text"
                autoCapitalize="none"
                autoComplete="current-password"
                autoCorrect="off"
                disabled={isLoading}
                onChange={(e : React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                />
            </div>
            <div className="grid gap-2 mt-4">
                <Label htmlFor="description">Team description: <span className='text-muted-foreground'>(optional)</span></Label>
                <Input
                id="description"
                type="text"
                autoCapitalize="none"
                autoComplete="current-password"
                autoCorrect="off"
                disabled={isLoading}
                onChange={(e : React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}
                />
            </div>
            <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                    <Label htmlFor="id">Team member user id:</Label>
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
                <p className='text-muted-foreground'>Team members</p>
                <div className='flex'>
                    <div className='dark:bg-[#1d1d1d] bg-muted-foreground text-white w-10 h-10 text-center p-2 rounded-full opacity-45'>
                        <p>you</p>
                    </div>
                    {
                        members &&
                        members.length > 0 &&
                        members.map((member, idx) => (
                            <Link href={`/user/${member.username}`} key={idx} target='_blank' className='dark:bg-[#1d1d1d] bg-muted-foreground text-white w-10 h-10 text-center p-2 rounded-full uppercase'>
                                {member.initials}
                            </Link>
                        ))
                    }
                </div>
            </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading} className='w-full'>
              Create team
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
