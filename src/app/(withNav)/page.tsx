"use client"
import NewLayout from "@/components/newLayout";
import PageLoading from "@/components/PageLoading";
import { useEffect, useState } from "react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState<any>();

  const handleChangeAuth = (val : boolean) => {
    setIsAuthenticated(val)
  }
  
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
          
              const data = await response.json();
              setUsername(data.user.username);
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
      {isLoading ? <PageLoading />
      :
      <>
        <NewLayout username={username} isAuthenticated={isAuthenticated}/>   
      </>   
    }
    </>
  );
}
