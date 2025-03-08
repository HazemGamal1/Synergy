"use client"
import NewLayout from "@/components/newLayout";
import PageLoading from "@/components/PageLoading";
import { useEffect, useState } from "react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
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
      {isLoading ? <PageLoading />
      :
      <>
        <NewLayout isAuthenticated={isAuthenticated}/>   
      </>   
    }
    </>
  );
}
