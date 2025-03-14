'use client'

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
import SpinnerLoading from './SpinnerLoading'
import { User2 } from 'lucide-react'


export function LoginPopup({ onChangeAuth } : { onChangeAuth : (arg: boolean) => void}) {
  const [isLoading, setIsLoading] = useState(false)
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [usernameError, setUsernameError] = useState<boolean>(false)
  const [passwordError, setPasswordError] = useState<boolean>(false)

  async function onSubmit(event: React.SyntheticEvent) {
    setUsernameError(false);
    setPasswordError(false);
    event.preventDefault()
    setIsLoading(true)

    try{
        const response = await fetch("/api/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        })
        const data = await response.json();
        if(data.message === "User not found"){
          setUsernameError(true);
        }
        if(data.message === "Password is incorrect"){
          setPasswordError(true);
        }
        if(data.message === "Login successful"){
          onChangeAuth(true);
        }  
    }catch(error){
      console.log(error);
    }finally{
      setIsLoading(false);
    }
   
  }

  if(isLoading) return <SpinnerLoading />
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className='flex gap-2 items-center'><User2 />Sign In</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[465px]  border-none rounded-lg">
        <DialogHeader>
            {/* <h1 className='text-center font-bold text-3xl my-8'>
                Synergy
            </h1> */}
          <DialogTitle>Sign in to your account</DialogTitle>
          <DialogDescription>
            Enter your username and password to sign in to your account.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="username"
                type="text"
                autoCapitalize="none"
                autoComplete="off"
                autoCorrect="off"
                disabled={isLoading}
                onChange={(e :  React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder='password'
                autoCapitalize="none"
                autoComplete="current-password"
                autoCorrect="off"
                disabled={isLoading}
              onChange={(e :  React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              />
            </div>
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
          <DialogFooter>
            <Button type="submit" disabled={isLoading} className='w-full'>
              Log In
            </Button>
          </DialogFooter>
        </form>
        <p className="px-8 text-center text-sm text-muted-foreground">
          <Link
            href="/signup"
            className="hover:text-brand underline underline-offset-4"
          >
            Don&apos;t have an account? Sign Up
          </Link>
        </p>
      </DialogContent>
    </Dialog>
  )
}