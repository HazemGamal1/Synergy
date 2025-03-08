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
import { Lightbulb} from 'lucide-react'

export default function CreateProjectIdea() {
    const [isLoading, setIsLoading] = useState(false);
    const [title, setTitle] = useState<string>();
    const [description , setDescription] = useState<string>("")
    const createdDate = Date.now();

    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault()
        setIsLoading(true)
        try{
            const data = { title, description, createdDate }
            const response = await fetch(`/api/create-projectIdea`, {
                method: "Post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            if(response.status === 404){
            }
            if(response.ok){
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
        <Button variant="default" className='mt-3 flex items-center hover:no-underline hover:opacity-90 mx-auto'>
            <p className='capitalize font-semibold'>Submit Your Project Idea</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[465px]  border-none rounded-lg">
        <DialogHeader>
          <DialogTitle className='flex gap-2 items-center'><Lightbulb className='text-muted-foreground'/> Enter the details of your idea</DialogTitle>
          <DialogDescription>
            <span className='text-muted-foreground'>Please fill in the fields</span>
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit}>
            <div className="grid gap-2">
                <Label htmlFor="title">Project idea title</Label>
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
            <div className="grid gap-2 mt-4 mb-8">
                <Label htmlFor="description">Project idea description:</Label>
                <Input
                  id="description"
                  autoCapitalize="none"
                  autoComplete="current-password"
                  autoCorrect="off"
                  multiple
                  disabled={isLoading}
                  onChange={(e : React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}
                />
            </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading} className='w-full'>
              Submit your project idea
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
