"use client";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import axios from "axios";
import Image from "next/image";
import Loading from "@/components/elements/loading";

const Photos = ({ media_id, episode_id }) => {
  const [allPhoto, setallPhoto] = useState(-1);

  useEffect(() => {
    getData();
  },[]);
  //get
  async function getData() {
    await axios
      .get(`/api/medias/photos/${media_id}/${episode_id}`)
      .then((d) => {
        setallPhoto(d.data.data);
      })
      .catch((e) => {
        console.log(e.response);
        setallPhoto(-2);
      });
  }

  return (
    <div>
      {allPhoto == -1 ? (
        <Loading />
      ) : allPhoto == -2 ? (
        <Loading />
      ) : allPhoto.length == 0 ? (
        ""
      ) : (
        <div className="photos">
          <div className="flex items-center justify-start">
            <h2 className="pinline text-base font-normal capitalize dark:font-extrabold dark:text-white">
              تصاویر
            </h2>
          </div>

          <Swiper
            spaceBetween={10}
            slidesPerView={1}
            navigation={false}
            modules={[Navigation]}
            className="itemSlider "
            breakpoints={{
              320: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 5,
                spaceBetween: 10,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 8,
              },
              1280: {
                slidesPerView: 6,
                spaceBetween: 10,
              },
            }}
          >
            {allPhoto.map((photo, i) => (
              <SwiperSlide key={i}>
                <div className="p-1">
                  <Image
                    src={photo.url}
                    width={112}
                    height={96}
                    className="rounded-md w-28 h-24"
                    alt="گپ کات"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
};

export default Photos;
