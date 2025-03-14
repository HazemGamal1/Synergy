"use client"

import type React from "react"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Github, Linkedin, Twitter, Youtube, Globe } from "lucide-react"
import Image from "next/image"
import authLogo from "../../../public/authLogo.svg"
import { useRouter } from "next/navigation"

export default function SocialLinksPage() {
  const [github, setGithub] = useState<string>("");
  const [linkedin, setLinkedin] = useState<string>("");
  const [twitter, setTwitter] = useState<string>("");
  const [youtube, setYoutube] = useState<string>("");
  const [website, setWebsite] = useState<string>("");
  const router = useRouter();
  
  const handleSave = async () => {


    try{
      const res = await fetch("/api/user-data/update-socials", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ github, linkedin, twitter, youtube, website})
      })
      const data = await res.json();
      console.log(data);
      router.push("/");
    }catch(error){
      console.log(error);
    }
    // toast({
    //   title: "Success",
    //   description: "Your social links have been saved.",
    // })
  }

  return (
    <div className="bg-gradient-to-b relative from-blue-500/10 via-purple-800/5 to-transparent">
      <div className="container grid place-content-center w-full min-h-screen mx-auto py-10 px-4 max-w-3xl">
        <Image src={authLogo} alt="logoAuthentication" className="mx-auto mb-4"/>
        <Card className="backdrop-blur-3xl bg-transparent">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Social Links</CardTitle>
            <CardDescription>Add your social media profiles to connect with your audience.</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="github" className="w-full">
              <TabsList className="grid grid-cols-6 md:grid-cols-4 lg:grid-cols-7 gap-2">
                <TabsTrigger value="github" className="flex items-center gap-2">
                  <Github className="h-4 w-4" />
                  <span className="hidden md:inline">GitHub</span>
                </TabsTrigger>
                <TabsTrigger value="linkedin" className="flex items-center gap-2">
                  <Linkedin className="h-4 w-4"/>
                  <span className="hidden md:inline text-xs">LinkedIn</span>
                </TabsTrigger>
                <TabsTrigger value="twitter" className="flex items-center gap-2">
                  <Twitter className="h-4 w-4" />
                  <span className="hidden md:inline">Twitter</span>
                </TabsTrigger>
                <TabsTrigger value="youtube" className="flex items-center gap-2">
                  <Youtube className="h-4 w-4" />
                  <span className="hidden md:inline text-xs">YouTube</span>
                </TabsTrigger>
                <TabsTrigger value="website" className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  <span className="hidden md:inline text-xs">Website</span>
                </TabsTrigger>
              </TabsList>

              <div className="mt-6">
                <TabsContent value="github">
                  <SocialLinkInput
                    platform="GitHub"
                    icon={<Github className="h-5 w-5" />}
                    value={github}
                    onChange={(value) => setGithub(value)}
                    placeholder="https://github.com/username"
                  />
                </TabsContent>

                <TabsContent value="linkedin">
                  <SocialLinkInput
                    platform="LinkedIn"
                    icon={<Linkedin className="h-5 w-5" />}
                    value={linkedin}
                    onChange={(value) => setLinkedin(value)}
                    placeholder="https://linkedin.com/in/username"
                  />
                </TabsContent>

                <TabsContent value="twitter">
                  <SocialLinkInput
                    platform="Twitter"
                    icon={<Twitter className="h-5 w-5" />}
                    value={twitter}
                    onChange={(value) => setTwitter(value)}
                    placeholder="https://twitter.com/username"
                  />
                </TabsContent>

                <TabsContent value="youtube">
                  <SocialLinkInput
                    platform="YouTube"
                    icon={<Youtube className="h-5 w-5" />}
                    value={youtube}
                    onChange={(value) => setYoutube(value)}
                    placeholder="https://youtube.com/c/channelname"
                  />
                </TabsContent>

                <TabsContent value="website">
                  <SocialLinkInput
                    platform="Website"
                    icon={<Globe className="h-5 w-5" />}
                    value={website}
                    onChange={(value) => setWebsite(value)}
                    placeholder="https://yourwebsite.com"
                  />
                </TabsContent>
              </div>
            </Tabs>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSave} className="ml-auto">
              Save All Links
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

interface SocialLinkInputProps {
  platform: string
  icon: React.ReactNode
  value: string
  onChange: (value: string) => void
  placeholder: string
}

function SocialLinkInput({ platform, icon, value, onChange, placeholder }: SocialLinkInputProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <h3 className="text-lg font-medium">{platform} Profile</h3>
      </div>

      <div className="space-y-2">
        <Label htmlFor={`${platform.toLowerCase()}-link`}>Profile URL</Label>
        <div className="flex gap-2">
          <Input
            id={`${platform.toLowerCase()}-link`}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="flex-1"
          />
        </div>
        <p className="text-sm text-muted-foreground">
          Enter your {platform} profile URL to connect with your audience.
        </p>
      </div>
    </div>
  )
}

