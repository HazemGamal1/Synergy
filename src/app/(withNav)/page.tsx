"use client"
import NewLayout from "@/components/newLayout";
import { Cloudy, HomeIcon, Loader2Icon, Users2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IInvitation } from "../../../models/Invitation";
import { ITeam } from "../../../models/Team";
import InvitationCard from "@/components/Invitations/InvitationCard";
import Teams from "@/components/SideNav/Teams";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [invitations, setInvitations] = useState<IInvitation[]>([]);
  const [userTeams, setUserTeams] = useState<ITeam[]>([]);
  
      useEffect(() => {
          // Connect to the SSE route
          const eventSource = new EventSource('/api/sse');
      
          // Listen for messages from the server
          eventSource.onmessage = (event) => {
            const message = JSON.parse(event.data);
            if (message.type === 'invitation') {
              setInvitations((prev) => [...prev, message.data]);
            }
          };
      
          // Handle errors
          eventSource.onerror = () => {
            console.error('SSE error');
            eventSource.close();
          };
      
          // Clean up on unmount
          return () => eventSource.close();
        }, []);
  
      useEffect(() => {
          const handleGetProjects = async () => {
            setIsLoading(true);
            try{
              const resInv = await fetch("/api/get-invitations");
              const dataInv = await resInv.json();
              setInvitations(dataInv)
              const resUserTeams = await fetch("/api/get-user-teams");
              const dataUserTeams = await resUserTeams.json();
              setUserTeams(dataUserTeams);
            }catch(error){
              console.log(error);
            }finally{
              setIsLoading(false)
            }
          }
          handleGetProjects();
        }, [isAuthenticated])
        
  
  useEffect(() => {
    const handleGetUserData = async () => 
      {
          setIsLoading(true);
          try{
            const response = await fetch("api/validate-token", {
              method : 'GET',
              headers: {
                'Content-Type': "application/json",         
              }
              })
          
              if(response.ok){
                setIsAuthenticated(true);
              }
            }catch(error){
              console.log(error);
            }finally {
              setIsLoading(false);
            }
      }

      handleGetUserData();
}, []);
  return (
    <>
      <div className="flex w-full h-full flex-1 flex-grow  max-w-[1330px] mx-auto">
        {/* left section */}
        <div className='w-[25%] pt-4 sticky left-0 top-16 items-start gap-1 hidden xl:flex flex-col max-h-screen flex-grow' >
          {
            !isAuthenticated && <>
              <div className='p-3 rounded-md  dark:bg-gradient-to-b from-black to-gray-100/5 border'>
                <h3 className='font-semibold text-2xl'>Join Our Community.</h3>
                <p className='text-md text-muted-foreground mt-4'>
                  Synergy is a platform for collaborative coding projects and networking, allowing developers to connect, contribute to projects, and build their portfolios.
                </p>
                <Link href={"/signup"}>
                  <button className="hidden font-bold dark:block mx-auto py-3 px-5 rounded-lg bg-black">Create account</button>
                </Link>
                <Link href={"/signup"}>
                  <button className="border font-bold w-full rounded-lg mt-4 text-main hover:bg-main hover:text-white hover:underline underline-offset-2 border-main dark:hidden p-2">Create account</button>
                </Link>
                <Link href={"/signin"}>
                  <button className="hover:bg-main/20 w-full text-center p-2 mt-2 hover:text-main hover:underline underline-offset-2 underline-main rounded-md">
                      Login
                  </button>
                </Link>
              </div>
            </>
          }
          <ul className='grid gap-2 mt-4 w-full'>
            <li>
              <Link href={"/"} className='flex items-center gap-1 hover:bg-slate-100 dark:hover:bg-[#101010] w-full p-2 rounded-lg group'>
                <HomeIcon className='text-muted-foreground group-hover:text-black dark:group-hover:text-white'/> <span className='group-hover:text-main dark:group-hover:text-white group-hover:underline underline-offset-1 underline-[#f63d68]'>Home</span>
              </Link>
            </li>
            <li>
              <Link href={"/teams"} className='flex items-center gap-1 hover:bg-slate-100 dark:hover:bg-[#101010] w-full p-2 rounded-lg group'>
                <Users2 className='text-muted-foreground group-hover:text-black dark:group-hover:text-white'/> <span className='group-hover:text-main dark:group-hover:text-white group-hover:underline underline-offset-1 underline-[#f63d68]'>Teams</span>
              </Link>
            </li>
          </ul>

          {
            isAuthenticated && 
            <div>
                    <h3 className='text-muted-foreground mt-4 flex items-center gap-2 w-full mb-2'>Invitations <div className='bg-[#262626] text-white p-[1px] text-sm rounded-full px-2'>{invitations?.length}</div></h3>
                    {
                        invitations &&
                        invitations?.length > 0 ?
                        <div className='max-h-[28rem] overflow-y-scroll scrollbar-none'>
                            {
                            invitations.map((inv, idx) => (
                                <InvitationCard inv={inv} key={idx}/>
                            ))
                            }
                        </div>
                        :
                        <div className='mx-auto text-muted-foreground text-center max-h-[10rem] grid place-content-center'>
                            {
                            isLoading ? 
                            <>
                                <Loader2Icon className='animate-spin'/>
                            </>
                            :
                            <>
                                <Cloudy size={'100px'} scale={'100px'} className='mx-auto mt-8'/>
                                <p>Seems like your invitations box is empty...</p>
                            </>
                            }
                        </div>
                    }
            </div>
          }
        </div>

        {/* center */}
        <NewLayout isAuthenticated={isAuthenticated}/>

        {/* right section */}
        <div className='w-[35%] pt-4 sticky right-0 top-16 items-start gap-1 hidden xl:flex flex-col max-h-screen'>
          {
            isAuthenticated && 
            <div className='px-3 w-full'>
              <Teams userTeams={userTeams}/>
            </div>
          }
        </div>   
      </div>   
    </>
  );
}
