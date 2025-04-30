"use client";
import React from 'react';
import Item from "./item";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from 'swiper/modules';
import "swiper/css";
import 'swiper/css/navigation';
import Loading from '@/components/elements/loading'

const Items = ({newItems}) => {
  let delay = 0.1;
  return (
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        navigation={true}
        modules={[Navigation]}
        className="itemSlider !overflow-visible"
        breakpoints={{
          320: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
       768: {
            slidesPerView: 5,
            spaceBetween: 25,
          },
          1024: {
            slidesPerView: 6,
            spaceBetween: 30,
          },
          1280: {
            slidesPerView: 7.5,
            spaceBetween: 35,
          },
        }}
      >
 {newItems == -1 ? (
          <Loading/>
        ) : newItems == -2 ? (
          <Loading/>
        ) : (

        newItems.map((da, i) => (
          <SwiperSlide key={i}>
            <Item data={da} delay={delay+= 0.030}  />
          </SwiperSlide>
        )))}
      </Swiper>
 
  );
};

export default Items;
