"use client";
import { useState, useEffect } from "react";
import Loading from "@/components/elements/loading";
import Photos from "@/components/media/photos";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { BiSolidLike, BiSolidDislike } from "react-icons/bi";
import { IoMdStar } from "react-icons/io";

const EpisodeMain = ({ media_id, season_number, episode_number }) => {
  const [episode, setEpisode] = useState(-1);
  const [reviews, setReviews] = useState(-1);

  useEffect(() => {
    getEpisode();
  }, [reviews]);

  //get Seasons
  async function getEpisode() {
    await axios
      .get(`/api/medias/seasons/${media_id}/${season_number}/${episode_number}`)
      .then((d) => {
        setEpisode(d.data.data[0]);
        setReviews(d.data.seens);
      })
      .catch((e) => {
        console.log(e.response);
        setEpisode(-2);
      });
  }

 
  return (
    <div className="col-span-8 space-y-6 lg:col-span-4 mt-5">
      {episode == -1 ? (
        <Loading />
      ) : episode == -2 ? (
        <Loading />
      ) : (
        <div>
          <div className="expert">
            <div className="flex items-center justify-start">
              <h2 className="pinline text-base font-normal capitalize dark:font-extrabold dark:text-white mb-2">
                {" "}
                {`فصل ${season_number} `} - {episode.name}
              </h2>
            </div>
            <div className="h-auto min-h-20 rounded-md p-2 w-full bg-zinc-800">
              {episode.summary_episode}
            </div>
          </div>

          <div className="photos">
            <div className="flex items-center justify-start">
              <h2 className="pinline text-base font-normal capitalize dark:font-extrabold dark:text-white">
                تصاویر
              </h2>
            </div>
            <Photos media_id={media_id} episode_id={episode._id} />
          </div>

          {/* <div className="clips">
                <div className="flex items-center justify-start">
                  <h2 className="pinline text-base font-normal capitalize dark:font-extrabold dark:text-white mb-2">ویدئو</h2>
                </div>
                <div className="h-auto min-h-20 rounded-md p-2 w-full bg-zinc-800">
                {episode.clips }
                </div>
              </div> */}

          <div className="comments">
            <div className="flex items-center justify-start">
              <h2 className="pinline text-base font-normal capitalize dark:font-extrabold dark:text-white mb-2">
                نظرات
              </h2>
            </div>
            {reviews == -1 ? (
              <Loading />
            ) : reviews == -2 ? (
              <Loading />
            ) : reviews.length == 0 ? (
              <div className="flex justify-center rounded-md p-2 w-full bg-zinc-800">
                برای این قسمت هنوز نظری ثبت نشده است.
              </div>
                    ) : (
                        <div className="flex flex-col gap-2">
                          {reviews.map((review, index) => (
                            <div
                              key={index}
                              className="flex flex-col justify-center items-center bg-zinc-900 rounded-md p-1 w-full"
                            >
                              <div className="review mb-5 mt-2 w-full ">
                                <div className="border-b  p-2.5 lg:p-4 border-b-white/5">
                                  <div className="flex w-full p-3">
                                    <Image
                                      className="h-16 w-16 rounded-sm object-cover"
                                      width={64}
                                      height={64}
                                      src={review.user.avatar}
                                      alt={review.user.name}
                                    />
                                    <div className="review--content ml-3 flex flex-1 flex-col lg:flex-row lg:items-center justify-between">
                                      <div className="pb-2 lg:pb-0">
                                        <div className="mb-1 mr-1 block space-y-1">
                                          <h6 className="text-sm font-bold">
                                            {review.user.name}
                                          </h6>
                                          <span className="text-xs text-gray-400 ">
                                            <Link href={`/user/${review.user.username}`}>
                                              @{review.user.username}
                                            </Link>
                                          </span>
                                          <span className="flex flex-row gap-2 items-center flex-wrap text-xs">
                                            <div clsss='text-xs'>
                                              {review.like && <span className="text-green-600 flex gap-2 items-center"><BiSolidLike className="text-green-600" /> دوست داشت</span>}
                                              {review.dislike && <span className="text-amber-800 flex gap-2 items-center"><BiSolidDislike className="text-amber-800" />دوست نداشت</span>}
                                            </div>
                                            <span className="flex text-xs text-gray-500">تاریخ تماشا : {review.date }</span>
                                          </span>
                                        </div>
                                      </div>
                                      <div className="flex text-2xl ">
                                        {Array.from({ length: 5 }, (_, index) => (
                                                          <IoMdStar
                                                            key={index}
                                                            className={
                                                              index < review.rate ? "text-red-600" : "text-gray-50"
                                                            }
                                                          />
                                      ))}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="p-2.5 lg:p-4">
                                  <div className="mt-2 grid grid-cols-3 gap-2 md:grid-cols-6 md:gap-1">
                                    <div className="col-span-3 md:col-span-6">
                                      <p className="text-sm text-gray-300">
                                        {review.body}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}

              </div>
            )}
          </div>
        </div>
      )}
    </div>
   
  );
};

export default EpisodeMain;