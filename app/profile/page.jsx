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

    const handleEdit= (post) => {
        
        router.push(`/update-prompt?id=${post._id}`)
    }
    const handleDelete = async (post) => {   
        const hasConfirmed = confirm('Are you sure you want to delete this post?');
        if(hasConfirmed){
          try{
            await fetch(`/api/prompt/${post._id.toString()}`, {
              method: 'DELETE',
            })
            const filteredPosts = posts.filter((p) => p._id !== post._id);
            setPosts(filteredPosts);
            alert('Post deleted successfully');
          } catch (error) {
            console.error(error);
          }
        }
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