
"use client"

import { useState } from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'


const PromtCard = ({ promt, handleTagClick, handleEdit, handleDelete, style }) => {
  const [copy, setcopy] = useState("")
  const { data: session } = useSession()
  const pathName = usePathname()
  const router = useRouter()

  const handleCopy = () => {
    navigator.clipboard.writeText(promt.prompt)
    setcopy(promt.prompt)
    setTimeout(() => {
      setcopy("")
    }, 2000)
  
  }

  return (
    <div className={`prompt_card ${style}`}>
      <div className='flex justify-between items-start gap-5'>
        <div className='flex-1 flex justify-start items-start gap-3 cursor-pointer'>
          <Image 
            src={promt.creator.image}
            alt='profile image'
            width={40}
            height={40}
            className='rounded-full object-contain'
          />
          <div className='flex flex-col'>
            <h3 className='font-satoshi font-semibold text-gray-900'>
              {promt.creator.username}</h3>
            <p className='font-inter text-sm text-gray-500'>
              {promt.creator.email}
            </p>
          </div>
        </div>
        <div className='copy_btn' onClick={() => {}}>
          <Image 
            src={copy === promt.prompt ? '/assets/icons/tick.svg' : '/assets/icons/copy.svg' }
            alt='copy'
            width={12}
            height={12}
            onClick={() => handleCopy()}
          />
        </div>
      </div>
      <p className='my-4 font-satoshi text-sm text-gray-700'>
        {promt.prompt}
      </p>
      <p className='font-inter text-sm blue_gradient cursor-pointer'
        onClick={() => handleTagClick && handleTagClick(promt.tag)}
      >
        #{promt.tag}
      </p>


      {session?.user.id === promt.creator._id && pathName === '/profile' && (
        <div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3'>
          <p className='font-inter text-sm green_gradient cursor-pointer' onClick={handleEdit}>
            Edit
          </p>
          <p className='font-inter text-sm orange_gradient cursor-pointer' onClick={handleDelete}>
            Delete
          </p>
        </div>
      )}

    </div>
  )
}

export default PromtCard