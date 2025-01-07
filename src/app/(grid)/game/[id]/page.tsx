import { getGame } from '@/app/api/api'
import GamesSlider from '@/app/componants/GamesSlider'
import SwiperCard from '@/app/componants/SwiperCard'
import { Game, ImageType } from '@/app/types'
import Image from 'next/image'
import React from 'react'

const page = async ({params} : {params:Promise<{id:string}>}) => {
    const {id} = await params
    const game = await getGame(id)
    const {
      screenshots,
      data,
      similar,
    }: {
      screenshots: { results: ImageType[] };
      data: Game;
      similar: { results: Game[] };
    } = game;

    const screenshotItems = [
      ...screenshots.results.map((screenshot) => screenshot.image),
      data.background_image,
      data.background_image_additional,
    ].filter(Boolean);
    console.log(data)

  return (
    <div className='mt-10'>
      <div>
        <div>
            <h1 className='text-2xl text-white'>{data.name}</h1>
            <div>Rating count : {data.ratings_count}</div>
            <SwiperCard
            slidesPerView={1}
            className="h-full"
            items={screenshotItems.map((src) => ({
              card: (
                <div className="rounded-xl overflow-hidden h-[36rem] w-full relative">
                  <Image
                    src={src}
                    // alt=''
                    alt={`${data.name} screenshot`}
                    fill
                    className="object-cover"
                  />
                </div>
              ),
              src,
            }))}
            paginationImage
          />
            <p className='mt-10 col-span-2'>{data.description_raw}</p>
        </div>
      </div>
      {similar.results.length>0 && ( <GamesSlider title='Similar Game' games={similar.results} />)}
     
    </div>
  )
}

export default page
