import React from "react";
import Image from "next/image";
import SwiperCard from "../componants/SwiperCard";
import CardInfo from "./CardInfo";
const Hero = () => {
  return (
    <div className="mt-10 h-full">
      <SwiperCard
        className="h-[30rem]"
        paginationImage={true}
        items={[
          {
            card: (
              <section className="w-full h-full relative ">
                <video
                  autoPlay={true}
                  muted={true}
                  loop={true}
                  className="absolute object-top inset-0 w-full h-full object-cover rounded-xl "
                >
                  <source src="/spidervideo.mp4" type="video/mp4" />
                </video>
                <CardInfo
                  btnClasses="text-white bg-red-500 hover:bg-red-400"
                  textBtn=""
                  desc="Peter Parker & Miles Morales return for an exciting new adventure in the acclaimed Marvel’s Spider-Man franchise, out October 20 for PS5."
                  title="BE GREATER TOGETHER"
                  image="/news1title.webp"
                />
              </section>
            ),
            src: "/poster.webp", // Corrected the path here
          },
          {
            card: (
              <section className="w-full h-full relative ">
                <video
                  autoPlay={true}
                  muted={true}
                  loop={true}
                  className="absolute object-top inset-0 w-full h-full object-cover rounded-xl "
                >
                  <source
                    src="/call-of-duty-black-ops-6-animated-hero-mobile-01-en-22may24.mp4"
                    type="video/mp4"
                  />
                </video>
                <CardInfo
                  desc="Last chance to pre-order and get access to additional premium content. Call of Duty®: Black Ops 6 launches on October 25th"
                  title="The truth lies"
                  btnClasses="text-white bg-orange-500 hover:bg-orange-400"
                  textBtn=""
                  image="/call-of-duty-black-ops-6-logo-01-en-21may24.webp"
                />
              </section>
            ),
            src: "/call-of-duty-black-ops-6-hero-desktop-01-en-21may24.webp", // Corrected the path here
          },
          {
            card: (
              <section className="w-full h-full relative ">
                <Image
                  alt="image"
                  src="/Dragon-Ball-Sparking-Zero-Hero-desktop-01-03oct24.webp"
                  fill
                  className="absolute object-top inset-0 w-full h-full object-cover rounded-xl "
                />
                <CardInfo
                  textBtn=""
                  desc="A legendary series has returned. Reach new levels of power in Dragon Ball: Sparking! Zero, out now on PS5"
                  title="Shake the earth. Break the universe !"
                  btnClasses="text-gray-400"
                  image="/Dragon-Ball-Sparking-Zero-logo-01-03oct24.webp"
                />
              </section>
            ),
            src: "/Dragon-Ball-Sparking-Zero-Hero-desktop-01-03oct24.webp", // Corrected the path here
          },
          {
            card: (
              <section className="w-full h-full relative ">
                <video
                  autoPlay={true}
                  muted={true}
                  loop={true}
                  className="absolute object-top inset-0 w-full h-full object-cover rounded-xl "
                >
                  <source
                    src="/cyberpunk-2077-phantom-liberty-video-hero-01-en-11sep23.mp4"
                    type="video/mp4"
                  />
                </video>
                <CardInfo
                  image="/iconcyber.webp"
                  title="Freedom Always Comes At A Price…"
                  desc="As cyber-enhanced mercenary V, join secret agent Solomon Reed to unravel a web of sinister political machinations."
                  btnClasses="text-white z-20 bg-red-500 hover:bg-red-400"
                  textBtn=""
                />
              </section>
            ),
            src: "/cyb.webp", // Corrected the path here
          },
        ]}
      />
    </div>
  );
};

export default Hero;
