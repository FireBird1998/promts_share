"use client";



import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'



import Form from '@components/Form';


const EditPrompt = () => {
    const router = useRouter();
     
    const searchParams = useSearchParams();     
    const promptId = searchParams.get('id');    

    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: '',
        tag: '',
    });

    useEffect(() => {
        const fetchPrompt = async () => {
          const res = await fetch(`/api/prompt/${promptId}`); 
          const data = await res.json();
          console.log(data);
          setPost({
            prompt: data.prompt,
            tag: data.tag,
          }); 
        }
        if(promptId) fetchPrompt();
    }, [promptId])

    const updatePrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        
        if(!promptId) return alert("promt id not found ! ");


        

        try {
            const res = await fetch(`/api/prompt/${promptId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag,
                }),
            });

            if (res.ok) {
                router.push('/'); 
                setSubmitting(false);
            }            
        } catch (error) { 
            console.log(error);
            setSubmitting(false);
            alert('Something went wrong');
        } finally {
            setSubmitting(false);
        }
    
    }

    return (
        <Form
            type="Update"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit = {updatePrompt}
        />
    )
}

export default EditPrompt