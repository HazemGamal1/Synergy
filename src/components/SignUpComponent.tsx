'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import SpinnerLoading from './SpinnerLoading'
import Image from 'next/image'
import authLogo from "../../public/authLogo.svg"
import { useRouter } from 'next/navigation'

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [name, setName] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [email, setEmail] = useState<string>()
  const [username, setUsername] = useState<string>();
  const [errorEmail, setErrorEmail] = useState<boolean>(false);
  const [errorUsername, setErrorUsername] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const router = useRouter();

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)
    setErrorEmail(false);
    setErrorUsername(false);
    setError("");
    try { 
      const response = await fetch("api/signup", {
          method : 'POST',
          headers: {
          'Content-Type': "application/json",
          },
          body : JSON.stringify({ name , password , email , username})
      })
      const data = await response.json();
      if(data.message === "Username already used")
      {
        setError("Username already used");
      }
      if(response.ok){
        const response = await fetch("api/signin", {
          method : 'POST',
          headers: {
          'Content-Type': "application/json",
          },
          body : JSON.stringify({ username , password })
        })
        const data = await response.json();
        if(data.message === "Login successful")
        {
          router.push("/skills")
        }
      }
    }catch(error){
      console.log(error);
    }
    setIsLoading(false);
  }

  return (
    <div className="bg-gradient-to-t relative from-blue-500/10 via-purple-800/5 to-transparent">
      <div className="container mx-auto flex h-screen w-screen flex-col items-center justify-center px-4 lg:px-0">
        <Image src={authLogo} alt="logoAuthentication" className="mx-auto mb-4"/>
        {isLoading && <SpinnerLoading />}
        <Card className="lg:w-[450px] px-4 backdrop-blur-3xl bg-transparent">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Create an account</CardTitle>
            <CardDescription>
              Enter your email below to create your account
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 mb-4">
            <form onSubmit={onSubmit}>
              <div className="grid gap-2 mb-4">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder='Perferrably your real name'
                  autoCapitalize="none"
                  autoComplete="name"
                  autoCorrect="off"
                  disabled={isLoading}
                  onChange={(e : React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                />
              </div>
              <div className="grid gap-2 mb-4">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter a unique username"
                  autoCapitalize="none"
                  autoComplete="name"
                  autoCorrect="off"
                  disabled={isLoading}
                  onChange={(e : React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                />
                {errorUsername && <div className='text-red-500'>Username already used</div>}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder='password'
                  autoCapitalize="none"
                  autoComplete="new-password"
                  autoCorrect="off"
                  disabled={isLoading}
                  onChange={(e : React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                />
              </div>
              <div className="grid gap-2 mt-4">
                <Label htmlFor="email">Email <span className='text-xs text-muted-foreground'>(optional)</span></Label>
                <Input
                  id="email"
                  placeholder="name@example.com"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  disabled={isLoading}
                  onChange={(e : React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value) }
                />
                {errorEmail && <div className='text-red-500'>Email already used</div>}
              </div>
              {
                <p className='text-red-500 mt-4 text-center'>{error}</p>
              }
              <Button className="w-full mt-4" type="submit" disabled={isLoading}>
                Sign Up
              </Button>
            </form>
          </CardContent>
        </Card>
        <p className="mt-4 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/signin"
            className="hover:text-brand underline underline-offset-4"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}