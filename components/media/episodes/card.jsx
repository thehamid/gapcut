import React from "react";
import Image from "next/image";
import Link from "next/link";
import SeenReview from "../reviews/seenReview";

const EpisodeCard = ({ data, media }) => {

  return (
    <div className="w-relative z-10 w-full max-w-xs overflow-hidden rounded-lg pb-4 m-3">
      <Link className="block" href={`/media/${media.slug}/season-${data.season_number}/${data.slug}`}>
        <Image
          className="h-40 w-full object-cover"
          src={data.cover}
          alt={data.name}
          width={350}
          height={180}
        />
      </Link>
      <div className="card flex items-center justify-between rounded-b-lg bg-zinc-800 shadow-md z-20 overflow-visible p-5">
        <Link className="relative" href={`/media/${media.slug}/season-${data.season_number}/${data.slug}`}>
          <div className='flex flex-wrap gap-1'>
            <h2 className="leading-none">{data.name}</h2>
            <small>(فصل {data.season_number})</small>
          </div>
          <span className="text-xs text-gray-400">{data.airdate}</span>
              </Link>
              
        <SeenReview  episode={data} media_title={media.title} media_poster={media.poster} />   
       
       
      </div>
    </div>
  );
};

export default EpisodeCard;
