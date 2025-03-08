'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { ThumbsUp, MessageSquare, Star, Search, Menu, Bell, Home, Lightbulb, Compass, Settings, LogOut, Mail, Globe, MapPin, Calendar } from 'lucide-react'
import Link from "next/link"
import Image from "next/image"

// Mock data for the user profile
const userProfile = {
  name: "Alex Johnson",
  username: "@alexj",
  avatar: "/placeholder.svg?height=128&width=128",
  bio: "Passionate full-stack developer | AI enthusiast | Open source contributor",
  location: "San Francisco, CA",
  website: "https://alexjohnson.dev",
  joinDate: "Joined September 2020",
  followers: 1234,
  following: 567,
  skills: [
    { name: "JavaScript", level: 90 },
    { name: "React", level: 85 },
    { name: "Node.js", level: 80 },
    { name: "Python", level: 75 },
    { name: "Machine Learning", level: 70 },
  ]
}

const userProjects = [
  {
    id: 1,
    title: "AI-powered Chat Bot",
    description: "Developing an intelligent chatbot using machine learning algorithms.",
    image: "/placeholder.svg?height=150&width=300",
    likes: 120,
    comments: 15
  },
  {
    id: 2,
    title: "Eco-friendly Packaging Design",
    description: "Creating sustainable packaging solutions for consumer goods.",
    image: "/placeholder.svg?height=150&width=300",
    likes: 89,
    comments: 8
  },
  {
    id: 3,
    title: "Virtual Reality Fitness App",
    description: "Immersive workout experiences in virtual environments.",
    image: "/placeholder.svg?height=150&width=300",
    likes: 156,
    comments: 23
  }
]

const recentActivity = [
  { id: 1, action: "Started a new project", project: "Quantum Computing Simulator", timestamp: "2 hours ago" },
  { id: 2, action: "Commented on", project: "AI-powered Chat Bot", timestamp: "1 day ago" },
  { id: 3, action: "Liked", project: "Blockchain-based Supply Chain", timestamp: "3 days ago" },
  { id: 4, action: "Updated skills", skill: "Machine Learning", timestamp: "1 week ago" },
]

export default function NewUserPage() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isNavOpen, setIsNavOpen] = useState(false)

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="bg-white dark:bg-[#1c1c1c] pt-20 text-gray-900 dark:text-gray-100 min-h-screen">

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left column: User info and Tabs */}
            <div className="flex-1">
              {/* User Profile Header */}
              <div className="mb-8 flex flex-col sm:flex-row items-center sm:items-start gap-4">
                <Avatar className="h-24 w-24 sm:h-32 sm:w-32">
                  <AvatarImage src={userProfile.avatar} alt={userProfile.name} />
                  <AvatarFallback>{userProfile.name[0]}</AvatarFallback>
                </Avatar>
                <div className="text-center sm:text-left">
                  <h1 className="text-2xl font-bold">{userProfile.name}</h1>
                  <p className="text-gray-600 dark:text-gray-400">{userProfile.username}</p>
                  <p className="mt-2">{userProfile.bio}</p>
                  <div className="mt-4 flex flex-wrap justify-center sm:justify-start gap-4">
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <MapPin className="h-4 w-4 mr-1" />
                      {userProfile.location}
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <Globe className="h-4 w-4 mr-1" />
                      <a href={userProfile.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                        {userProfile.website}
                      </a>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <Calendar className="h-4 w-4 mr-1" />
                      {userProfile.joinDate}
                    </div>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <Tabs defaultValue="overview" className="mb-8">
                <TabsList className="w-full justify-start">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="projects">Projects</TabsTrigger>
                  <TabsTrigger value="skills">Skills</TabsTrigger>
                  <TabsTrigger value="activity">Activity</TabsTrigger>
                </TabsList>
                <TabsContent value="overview">
                  <Card>
                    <CardHeader>
                      <CardTitle>User Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>Welcome to {userProfile.name}'s profile! Here you can find an overview of their projects, skills, and recent activity.</p>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="projects">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {userProjects.map((project) => (
                      <Card key={project.id} className="shadow-sm hover:shadow-md transition-shadow dark:bg-gray-800">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg font-medium text-gray-800 dark:text-gray-200">{project.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <Image
                            src={project.image}
                            alt={project.title}
                            width={300}
                            height={150}
                            className="rounded-lg object-cover mb-2"
                          />
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{project.description}</p>
                        </CardContent>
                        <CardFooter className="flex justify-between items-center pt-2">
                          <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                            <span className="flex items-center">
                              <ThumbsUp className="h-4 w-4 mr-1" /> {project.likes}
                            </span>
                            <span className="flex items-center">
                              <MessageSquare className="h-4 w-4 mr-1" /> {project.comments}
                            </span>
                          </div>
                          <Button variant="ghost" className="text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900">View</Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="skills">
                  <Card>
                    <CardHeader>
                      <CardTitle>Skills</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {userProfile.skills.map((skill, index) => (
                        <div key={index} className="mb-4 last:mb-0">
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{skill.name}</span>
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{skill.level}%</span>
                          </div>
                          <Progress value={skill.level} className="h-2" />
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="activity">
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-[300px] pr-4">
                        {recentActivity.map((activity) => (
                          <div key={activity.id} className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {activity.action} {' '}
                              <span className="font-medium text-gray-900 dark:text-gray-100">
                                {activity.project || activity.skill}
                              </span>
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{activity.timestamp}</p>
                          </div>
                        ))}
                      </ScrollArea>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Right column: Additional info */}
            <div className="w-full md:w-64">
              <Card>
                <CardHeader>
                  <CardTitle>Connections</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600 dark:text-gray-400">Followers</span>
                    <span className="font-medium">{userProfile.followers}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Following</span>
                    <span className="font-medium">{userProfile.following}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Connect</Button>
                </CardFooter>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Top Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {userProfile.skills.slice(0, 5).map((skill, index) => (
                      <Badge key={index} variant="secondary">{skill.name}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}