'use client'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from 'next/navigation'
import { CheckCircle2Icon } from 'lucide-react'
import Image from 'next/image'
import authLogo from "../../../public/logo.svg"
import SpinnerLoading from '@/components/SpinnerLoading'

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false)
  const [password, setPassword] = useState<string>();
  const [username, setUsername] = useState<string>();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [usernameError, setUsernameError] = useState<boolean>(false)
  const [passwordError, setPasswordError] = useState<boolean>(false)
  const router = useRouter();

  async function onSubmit(event: React.SyntheticEvent) {
    setUsernameError(false);
    setPasswordError(false);
    event.preventDefault()
    setIsLoading(true)
    try { 
            const response = await fetch("api/signin", {
                method : 'POST',
                headers: {
                'Content-Type': "application/json",
                },
                body : JSON.stringify({ username , password })
            })
            const data = await response.json();
            if(data.message === "User not found"){
              setUsernameError(true);
            }
            if(data.message === "Password is incorrect"){
              setPasswordError(true);
            }
            if(data.message === "Login successful")
            {
              setIsLoggedIn(true);
              router.push("/")
            }
    }catch(error){
      console.log(error);
    }
    setIsLoading(false);
  }

  return (
    <div className=" relative">
      <div className="container mx-auto flex h-screen w-screen flex-col items-center justify-center px-4 lg:px-0">
        {isLoading && <SpinnerLoading />}
        {
          isLoggedIn ?
          <Card className="lg:w-[350px] mt-4 px-4 ">
            <CardContent className='grid place-content-center text-center p-20'>
              <CheckCircle2Icon className='text-green-500 text-2xl mx-auto mb-3' size={"60px"}/>
              <h1>Logged in successfully!</h1>
              <p className='animate-pulse'>Redirecting...</p>
            </CardContent>
          </Card>
          :
          <>
              <Card className="lg:w-[450px] px-4">
              <CardHeader className="space-y-1">
                <Image src={authLogo} alt="logoAuthentication" className="mx-auto mb-4" width={60}/>
                <CardTitle className="text-2xl text-center">Log in</CardTitle>
                <CardDescription className='text-center'>
                  Enter your username and password below to authenticate
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 mb-4">
                <form onSubmit={onSubmit}>
                  <div className="grid gap-2 mb-4">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      placeholder="username"
                      type="text"
                      autoCapitalize="none"
                      autoCorrect="off"
                      disabled={isLoading}
                      onChange={(e :  React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value) }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      placeholder='password'
                      type="password"
                      autoCapitalize="none"
                      autoComplete="new-password"
                      autoCorrect="off"
                      disabled={isLoading}
                      onChange={(e :  React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    />
                  </div>
                  {
                    usernameError &&
                    <p className='text-red-500 pt-2 text-center'>
                      User not found
                    </p>
                  }
                  {
                    passwordError &&
                    <p className='text-red-500 pt-2 text-center'>
                      Password is incorrect
                    </p>
                  }
                  <Button className="w-full mt-4 bg-main text-white hover:bg-black" type="submit" disabled={isLoading}>
                    Sign in
                  </Button>
                </form>
              </CardContent>
              <p className="mt-4 text-center text-sm text-muted-foreground pb-4">
                Do not have an account?{" "}
                <Link
                  href="/signup"
                  className="hover:text-brand underline underline-offset-4 text-blue-500"
                >
                  Sign Up
                </Link>
              </p>  
            </Card>
          </>
        }
        
      </div>
    </div>
  )
}