'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ArrowBigUp, ArrowBigDown, MessageSquare, Calendar, User2 } from 'lucide-react'
import Link from "next/link"
import CreateProjectIdea from './projectsIdea/createProjectIdeaButton'
import { IProjectIdea } from '../../models/ProjectIdea'

export function ProjectIdeasSectionComponent() {
  // const [sortBy, setSortBy] = useState("popular")
  const [ideas, setIdeas] = useState<IProjectIdea[]>([])

  useEffect(() => {
    
    const getIdeas = async () => {
      const res = await fetch("/api/get-project-ideas");
      const data = await res.json();
      setIdeas(data);
      console.log(data);
    }
    
    getIdeas();
  }, [])
  // const handleSort = (value: string) => {
  //   setSortBy(value)
  //   let sortedIdeas = [...ideas]
  //   if (value === "popular") {
  //     sortedIdeas.sort((a, b) => b.upvotes - a.upvotes)
  //   } else if (value === "new") {
  //     sortedIdeas.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
  //   }
  //   setIdeas(sortedIdeas)
  // }

  // const handleVote = (id: number, direction: 'up' | 'down') => {
  //   setIdeas(prevIdeas => 
  //     prevIdeas.map(idea => 
  //       idea.id === id 
  //         ? { ...idea, upvotes: idea.upvotes + (direction === 'up' ? 1 : -1) }
  //         : idea
  //     )
  //   )
  // }

  return (
    <section className="py-12 bg-muted rounded-lg">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 text-center">Project Ideas</h2>
        <div className="flex justify-between items-center mb-6">
          <p className="text-muted-foreground">Discover and discuss new project ideas</p>
          {/* <Select onValueChange={() => { }} value={sortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="new">Newest</SelectItem>
            </SelectContent>
          </Select> */}
        </div>
        <div className="space-y-4">
          {ideas.map((idea, idx) => (
            <Card key={idx} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="flex flex-col items-center">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => {}}
                  >
                    <ArrowBigUp className="h-6 w-6" />
                  </Button>
                  <span className="font-bold">{idea.likes}</span>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => {}}
                  >
                    <ArrowBigDown className="h-6 w-6" />
                  </Button>
                </div>
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold hover:text-primary">
                    <Link href={`/project-idea/${idea.title}`}>{idea.title}</Link>
                  </h3>
                  <p className="text-muted-foreground">{idea.description}</p>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Avatar className="h-6 w-6 mr-2">
                    <AvatarFallback><User2 /></AvatarFallback>
                  </Avatar>
                  <span>Posted by </span>
                  <span className="mx-2">•</span>
                  <Calendar className="h-4 w-4 mr-1" />
                  {/* <span>{new Date(idea.timestamp).toLocaleDateString()}</span> */}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="text-muted-foreground">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  {idea.comments.length} Comments
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="mt-8 text-center">
          <CreateProjectIdea />
          {/* <Button>
            <Link href="/submit-idea">Submit Your Project Idea</Link>
          </Button> */}
        </div>
      </div>
    </section>
  )
}