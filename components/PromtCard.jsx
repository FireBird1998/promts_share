"use client"

import { useState } from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'


const PromtCard = ({ promt, handleTagClick, handleEdit, handleDelete }) => {
  console.log(promt);
  return (
    <div className='prompt_card'>
      <div className='flex justify-between items-start gap-5'>
        <div>
          <Image 
            src={promt.creator.image}
            alt='profile image'
            width={40}
            height={40}
            className='rounded-full object-contain'
          />
        </div>
      </div>
    </div>
  )
}

export default PromtCard