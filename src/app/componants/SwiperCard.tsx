"use client";
import React, {  useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperType from "swiper";
import "swiper/css";
import Image from "next/image";
import { Autoplay } from "swiper/modules";
import { ItemsType } from "../types";

const SwiperCard = ({
  items,
  paginationImage,
  className,
  slidesPerView,
  smSlidesPerView,
  mdSlidesPerView,
  lgSlidesPerView,
  haveBreakpoints = false,
  
}: {
  items: ItemsType[];
  paginationImage?: boolean;
  className?: string;
  haveBreakpoints?: any;
  slidesPerView?: number;
  smSlidesPerView?: number;
  mdSlidesPerView?: number;
  lgSlidesPerView?: number;
}) => {
  const [swiper, setSwiper] = useState<SwiperType | null>();
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const t = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 100 : prev + 3.7));
    }, 110);
    return () => clearInterval(t);
  }, [progress]);
  useEffect(() => {
    swiper?.on("slideChange", () => setProgress(0));
  }, [swiper]);
  console.log(progress);
  return (
    <div className="relative h-full gap-3 flex flex-col mt-8">
      <Swiper
          breakpoints={
            haveBreakpoints
              ? {
                  475: { slidesPerView },
                  640: { slidesPerView: smSlidesPerView },
                  768: { slidesPerView: mdSlidesPerView },
                  1024: { slidesPerView: lgSlidesPerView },
                }
              : undefined
          }
        slidesPerView={slidesPerView || 1}
        autoplay={{ delay: 3000 }}
        modules={[Autoplay]}
        className={`w-full ${className || "h-96"} `}
        spaceBetween={20}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => setSwiper(swiper)}
      >
        {items.map(({ card }, i) => (
          <SwiperSlide
            className="cursor-pointer"
            onClick={() => {
              swiper?.autoplay.start();
            }}
            key={i}
          >
            {card}
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="flex items-center gap-4">
        {paginationImage &&
          items.map(({ src }, i) => (
            <div
              onClick={() => {
                swiper?.slideTo(i);
                swiper?.autoplay.stop();
              }}
              key={i}
              className={`${
                swiper?.realIndex === i &&
                "-translate-y-5 border border-rose-500 opacity-85 shadow-lg"
              } hover:-translate-y-5  z-10 hover:opacity-85 hover:shadow-lg cursor-pointer duration-200 rounded-xl relative w-full max-w-lg overflow-hidden h-24 sm:h-40`}
            >
              {swiper?.realIndex === i && swiper.autoplay.running && (
                <div
                  style={{ width: `${progress}%` }}
                  className="absolute h-full bg-gray-400/50 inset-0 z-10"
                ></div>
              )}
              {src && src !== "" ? (
                <Image
                  alt=""
                  src={src}
                  layout="fill"
                  className="object-cover"
                />
              ) : null}
            </div>
          ))}
      </div>
    </div>
  );
};

export default SwiperCard;
