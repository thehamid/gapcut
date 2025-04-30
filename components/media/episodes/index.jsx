"use client";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Loading from "@/components/elements/loading";
import axios from "axios";
import EpisodeCard from "./card";
import Link from "next/link";

const Episodes = ({ media }) => {
  const [allEpisode, setallEpisode] = useState(-1);

  useEffect(() => {
    getData();
  },[]);
  //get
  async function getData() {
    await axios
      .get(`/api/medias/episodes/${media.media_id}`)
      .then((d) => {
        setallEpisode(d.data.data);
      })
      .catch((e) => {
        console.log(e.response);
        setallEpisode(-2);
      });
  }

  return (
    <div>
      {allEpisode == -1 ? (
        <Loading />
      ) : allEpisode == -2 ? (
        <Loading />
        ) :allEpisode.length == 0 ? (
             ''
              ) : (
            
        <div className="episodes">
          <div className="flex items-center justify-between">
            <h2 className="pinline text-base font-normal capitalize dark:font-extrabold text-white">
              قسمت‌ها
            </h2>
            <Link
              href={`/media/${media.slug}/episodes`}
              className="hover:text-primary mb-4 flex flex-row items-center text-sm font-bold transition-colors ease-in-out"
            >
              همه
              <i className="dz-arrow-right ml-1"></i>
            </Link>
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
                slidesPerView: 3,
                spaceBetween: 10,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 8,
              },
              1280: {
                slidesPerView: 3,
                spaceBetween: 10,
              },
            }}
          >
            {allEpisode.map((ep, i) => (
              <SwiperSlide key={i}>
                <EpisodeCard data={ep} media={media} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
};

export default Episodes;
