"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import EpisodeReview from './episodeReview'
import Loading from "@/components/elements/loading";

const EpisodeSidebar = ({media,season_number,episode_number}) => {
  const [episode, setEpisode] = useState(-1);

  useEffect(() => {
    getEpisode();
  }, [episode]);

  //get Seasons
  async function getEpisode() {
    await axios
      .get(`/api/medias/seasons/${media.media_id}/${season_number}/${episode_number}`)
      .then((d) => {
        setEpisode(d.data.data[0]);
      })
      .catch((e) => {
        console.log(e.response);
        setEpisode(-2);
      });
  }




  return (
    <div className="col-span-8 lg:col-span-2">
        {episode == -1 ? (
        <Loading />
      ) : episode == -2 ? (
        <Loading />
      ) : (
    <div className="sidebar">
      <div className="p-2">
        <EpisodeReview episode={episode} media_title={media.title} media_poster={media.poster} />
      </div>
      {/* <div className="p-2">
        <h2 className="pinline text-base font-normal capitalize dark:font-extrabold dark:text-white">واکنش‌ها</h2>
        <div className="bg-zinc-900 p-5 text-gray-100 flex flex-col">
         آیکون واکنش ها
        </div>
      </div> */}
        </div>
      )}
        </div>
  )
}

export default EpisodeSidebar