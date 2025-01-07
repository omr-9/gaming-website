import Image from 'next/image'
import React from 'react'

const User = ({user} : {user : {name : string, avatar:{secure_url: string }}}) => {
  return (
    <div className='flex items-center gap-3 cursor-pointer'>
        <div className='overflow-hidden relative  rounded-full w-14 h-14'>

        <Image src={user.avatar.secure_url} alt={user.name} fill className='object-cover'  />
        </div>
        <h1 className='text-lg hover:underline hover:text-rose-400 duration-200 font-semibold'>
            {user.name}
        </h1>
      
    </div>
  )
}

export default User
