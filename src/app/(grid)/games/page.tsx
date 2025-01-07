
import Filters from '@/app/componants/Filters'
import React from 'react'

const page = async () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL
  const data = await fetch(`${API_URL}genres?key=${process.env.NEXT_PUBLIC_API_KEY}`).then((res) => res.json())
  const genres = data.results.slice(0, 15)
  console.log(genres)
  return (
    <div className='mt-10 flex flex-col gap-5 relative'>
      <h1 className='text-2xl md:text-3xl lg:text-4xl font-semibold'>Gaming from Genres</h1>
    <Filters genres={genres} />
    </div>
  )
}

export default page
