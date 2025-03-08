import React, { useEffect } from 'react'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
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
import { Handshake} from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { IProject } from '../../../models/Project'

export default function InvitationButton({ inviteeId, inviteeUsername }: { inviteeId : any, inviteeUsername: String }) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [currentUserProjects, setCurrentUserProjects] = useState<IProject[]>([]);
    const [project, setProject] = useState<IProject>();
    const [position, setPosition] = useState<String>();

    const sendInvitation = async() => {
      try {
        if(project){
          const finalData = { inviteeId, inviteeUsername, type: "invitation", project: project._id, projectName: project.title, position: position}
          const res = await fetch('/api/send-invitation', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(finalData)
          });
          const data = await res.json();
        }else{
          console.log("user not found")
        }
        
      }catch(error){
        console.log(error);
      }
    }

    const handleProjectValueChange = (value : String) => {
      const proj = currentUserProjects.find(p => p.title === value);
      setProject(proj);
    }
    const handlePositionValueChange = (value : String) => {
      setPosition(value);
    }
    useEffect(() => {
      const getProjects = async () => {
        try{
          const res = await fetch(`/api/projects/get-user-projects`);
          const data = await res.json();
          setCurrentUserProjects(data);
        }catch(errror){
          console.log(error);
        }
      }

      getProjects();
    }, [])

    console.log(project);
    console.log(position);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="absolute -bottom-1 -right-0 bg-blue-600 text-white rounded-full p-2 cursor-pointer hover:opacity-95">
          <Handshake size={'22px'}/>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[465px] border-none rounded-lg">
        <DialogHeader>
          <DialogTitle className='flex gap-2 items-center'><Handshake className='text-muted-foreground'/> Select a project to invite to:</DialogTitle>
          <DialogDescription>
            <span className='text-muted-foreground'>Please fill in the fields</span>
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={sendInvitation}>
            <div className="grid gap-2 w-full">
                <Label htmlFor="title">Project: </Label>
                <Select onValueChange={handleProjectValueChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Project" />
                  </SelectTrigger>
                  <SelectContent>
                    {
                      currentUserProjects.map((project, idx) => (
                        <SelectItem value={project.title} key={idx}>{project.title}</SelectItem>
                      ))
                    }
                  </SelectContent>
                </Select>
                
            </div>
            <div className="grid gap-2 mt-4 mb-8">
                <Label htmlFor="description">Position:</Label>
                <Select disabled={project === undefined} onValueChange={handlePositionValueChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Position" />
                  </SelectTrigger>
                  <SelectContent>
                    {
                      project?.requiredSkills.map((skill, idx) => 
                      (
                        <SelectItem value={skill.toString()} key={idx}>{skill}</SelectItem>
                      ))
                    }
                  </SelectContent>
                </Select>
            </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading || project === undefined || position === undefined} className='w-full bg-blue-600 hover:bg-blue-700 dark:text-white'>
              Invite
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
