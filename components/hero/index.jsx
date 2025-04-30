"use client";
import { useState, useEffect } from "react";
import CardHero from "./cardhero";
import Image from "next/image";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/bundle";

const Hero = () => {
  const [heroInfo, setheroInfo] = useState([]);
  const holder=[1,2,3,4,5]

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/articles/hero");
      const data = await response.json();
      setheroInfo(data);

    }

    fetchData();
  }, []);

  return (
    <div>
      {heroInfo ?   
      <div className="flex justify-between mt-2 mb-2">
        <Swiper
          dir="rtl"
          spaceBetween={10}
          slidesPerView={1}
          loop="true"
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          modules={[Autoplay]}
          className="sliderhero"
          breakpoints={{
            680: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1280: {
              slidesPerView: 2.5,
              spaceBetween: 20,
            },
          }}
        >
          {heroInfo.map((da, i) => (
            <SwiperSlide key={i}>
              <CardHero data={da} />
            </SwiperSlide>
          ))}
        </Swiper>
        </div>
        :
        <div className="flex justify-between mt-2 mb-2">
        <Swiper
          dir="rtl"
          spaceBetween={10}
          slidesPerView={1}
          loop="true"
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          modules={[Autoplay]}
          className="sliderhero"
          breakpoints={{
            680: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1280: {
              slidesPerView: 2.5,
              spaceBetween: 20,
            },
          }}
        >
          {holder.map((da, i) => (
            <SwiperSlide key={i}>
              <div className="card__placeholder w-full h-full max-h-[400px] top-0 left-0 object-cover rounded-lg ">
                  <Image
                              src='/images/avatar-holder.jpg'
                              alt={da}
                              width={300}
                              height={220}
                              className="w-full h-auto  top-0 left-0 object-cover rounded-lg opacity-10 "
                            />
             </div>
            </SwiperSlide>
          ))}
        </Swiper>
        </div>

      }
    </div>
  );
};

export default Hero;
