"use client";

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react';

import Form from '@components/Form';


const CreatePrompt = () => {
    const [prompt, setPrompt] = useState('');
    const [post, setPost] = useState({
        prompt: '',
        tag: '',
    });


    return (
        <Form

        />
    )
}

export default CreatePrompt