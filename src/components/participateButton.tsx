import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from './ui/button'
import { Label } from './ui/label';
import { PlusCircle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger } from './ui/select';
import { SelectValue } from '@radix-ui/react-select';

export default function ParticipateButton({ requiredSkills, inviter,  inviteeId, inviteeUsername, project, projectName } : { requiredSkills : string[], inviter: string, inviteeId: string,inviteeUsername: string, project: string, projectName : string}) {
    const [position, setPosition] = useState<string>();
    const [isLoading, setIsLoading] = useState(false);

    const sendInvitation = async() => {
      try {
        if(project){
          const finalData = { inviteeId, inviter, inviteeUsername, type: "participationRequest", project, projectName, position: position}
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
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className='flex gap-2 items-center bg-white text-black'><PlusCircle /> Join Project</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[465px]  border-none rounded-lg">
        <DialogHeader>
          <DialogTitle>Select your role</DialogTitle>
          <DialogDescription>
            Choose which role you would like to participate in
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={sendInvitation}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
                <Label>Select your role: </Label>
                <Select
                    onValueChange={(value) => setPosition(value)}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                        {requiredSkills.map((skill) => (
                            <SelectItem key={skill} value={skill}>{skill}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

          </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading} className='w-full'>
              Send participation request
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
