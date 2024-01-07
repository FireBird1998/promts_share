"use client"

import {useState, useEffect} from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

import Profile from '@components/Profile'


const MyProfile = () => {
    const router = useRouter();
    const {data: session} = useSession();
    const [posts, setPosts] = useState([]);


    useEffect(() => {
        const fetchPromts = async () => {
          const res = await fetch(`/api/users/${session?.user.id}/posts`);
          const data = await res.json();
          console.log(`${data} this is in profile page` );    
          setPosts(data);
        }
        if(session?.user.id) fetchPromts();

        
      },[session?.user.id])

    const handleEdit= () => {

    }
    const handleDelete = async () => {   

    }



  return (
    <Profile 
        name = {`my`}
        desc = "Welcome to your dashboard"
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
    />
  )
}

export default MyProfile