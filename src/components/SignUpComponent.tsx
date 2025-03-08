'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import SpinnerLoading from './SpinnerLoading'

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState()
  const [username, setUsername] = useState();
  const [errorEmail, setErrorEmail] = useState<Boolean>(false);
  const [errorUsername, setErrorUsername] = useState<Boolean>(false);
  const [error, setError] = useState<string>();

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
    }catch(error : any){
        setError(error);
    }
    setIsLoading(false);
  }

  return (
    <div className="container mx-auto flex h-screen w-screen flex-col items-center justify-center px-4 lg:px-0">
        {isLoading && <SpinnerLoading />}
      <Card className="lg:w-[450px] px-4">
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
                placeholder='your real name'
                autoCapitalize="none"
                autoComplete="name"
                autoCorrect="off"
                disabled={isLoading}
                onChange={(e : any) => setName(e.target.value)}
              />
            </div>
            <div className="grid gap-2 mb-4">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="@example21"
                autoCapitalize="none"
                autoComplete="name"
                autoCorrect="off"
                disabled={isLoading}
                onChange={(e : any) => setUsername(e.target.value)}
              />
              {errorUsername && <div className='text-red-500'>Username already used</div>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                autoCapitalize="none"
                autoComplete="new-password"
                autoCorrect="off"
                disabled={isLoading}
                onChange={(e : any) => setPassword(e.target.value)}
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
                onChange={(e : any) => setEmail(e.target.value) }
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
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
          </div>
        </CardContent>
        {/* <CardFooter>
          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <Link
              href="/terms"
              className="hover:text-brand underline underline-offset-4"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="hover:text-brand underline underline-offset-4"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </CardFooter> */}
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
  )
}