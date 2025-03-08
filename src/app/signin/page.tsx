'use client'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import PageLoading from '../../components/PageLoading'
import { useRouter } from 'next/navigation'
import { CheckCircle2Icon } from 'lucide-react'

export default function page() {
  const [isLoading, setIsLoading] = useState(false)
  const [password, setPassword] = useState();
  const [username, setUsername] = useState();
  const [errorEmail, setErrorEmail] = useState<Boolean>(false);
  const [errorUsername, setErrorUsername] = useState<Boolean>(false);
  const [error, setError] = useState<string>();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const router = useRouter();

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)
    setErrorEmail(false);
    setErrorUsername(false);
    setError("");
    try { 
            const response = await fetch("api/signin", {
                method : 'POST',
                headers: {
                'Content-Type': "application/json",
                },
                body : JSON.stringify({ username , password })
            })
            const data = await response.json();
            console.log(data.message)
            if(data.message === "Login successful")
            {
              setIsLoggedIn(true);
              router.push("/")
            }
    }catch(error : any){
        setError(error);
    }
    setIsLoading(false);
  }

  return (
    <div className="container mx-auto flex h-screen w-screen flex-col items-center justify-center px-4 lg:px-0">
      {isLoading && <PageLoading />}
      {
        isLoggedIn ?
        <Card className="lg:w-[450px] px-4">
          <CardContent className='grid place-content-center text-center p-20'>
            <CheckCircle2Icon className='text-green-500 text-2xl mx-auto mb-6' size={"60px"}/>
            <h1>Logged in successfully!</h1>
            <p className='animate-pulse'>Redirecting...</p>
          </CardContent>
        </Card>
        :
        <>
            <Card className="lg:w-[450px] px-4">
            <CardHeader className="space-y-1">
                {/* <h1 className='font-normal text-4xl mb-8'>Synergy</h1> */}
              <CardTitle className="text-2xl">Log in</CardTitle>
              <CardDescription>
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
                    onChange={(e : any) => setUsername(e.target.value) }
                  />
                  {errorEmail && <div className='text-red-500'>Email already used</div>}
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
                <Button className="w-full mt-4" type="submit" disabled={isLoading}>
                  Sign in
                </Button>
              </form>
            </CardContent>
            <CardFooter>
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
            </CardFooter>
          </Card>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="hover:text-brand underline underline-offset-4"
            >
              Sign Up
            </Link>
          </p>  
        </>
      }
      
    </div>
  )
}