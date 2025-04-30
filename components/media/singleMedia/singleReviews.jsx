"use client";
import { useState, useEffect } from "react";
import Loading from "@/components/elements/loading";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { IoIosPerson, IoMdStar } from "react-icons/io";

import WriteReview from "../reviews/writeReview";

const SingleReviews = ({ media_id,media_title }) => {
  const [reviews, setReviews] = useState(-1);
  const [reload, setReload] = useState(false);
  const [okSpoil, setOKSpoil] = useState(false);

  useEffect(() => {
    getReviews();
  }, [reload]);

  //getReviews
  async function getReviews() {
    await axios
      .get(`/api/medias/reviews/${media_id}`)
      .then((d) => {
        setReviews(d.data.data);
      })
      .catch((e) => {
        console.log(e.response);
        setReviews(-2);
      });
  }

  return (
    <div className="col-span-8 lg:col-span-6 mt-5">
      {reviews == -1 ? (
        <Loading />
      ) : reviews == -2 ? (
        <Loading />
      ) : reviews.length == 0 ? (
        <div className="flex flex-col justify-center items-center bg-zinc-900 rounded-md p-4 m-2 gap-2">
          <span>برای این عنوان هنوز هیچ بررسی انجام نشده است!</span>
          <WriteReview media_id={media_id} media_title={media_title} submited={setReload} />
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <div className="flex flex-row justify-between  items-center  p-1">
            <WriteReview media_id={media_id} media_title={media_title} submited={setReload} />
            <span>تاکنون {reviews.length} بررسی ثبت شده است</span>
          </div>
          {reviews.map((review, i) => (
            <div
              key={i}
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

                    <div className="review--content ml-3 flex flex-1 flex-col lg:flex-row lg:items-center">
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
                        </div>
                      </div>
                      <div className="grow"></div>
                      {/* <div className="flex flex-col items-center justify-start lg:items-end">
                              <span className="border-primary text-primary inline-flex items-center rounded-sm border px-2 py-1 text-xs font-bold">
                                <i className="dz-episode mr-2 text-sm"></i> 15/32 Watched</span>
                            </div> */}
                    </div>
                  </div>
                </div>

                <div className="p-2.5 lg:p-4">
                  <div className="mt-2 grid grid-cols-3 gap-2 md:grid-cols-6 md:gap-1">


                    <div className="order-1 text-center">
                      <div className="border  border-white/5">
                        <div className="bg-primary flex items-center justify-center text-white">
                          <IoMdStar className="text-xl text-white" />
                          <span className="font-heading ml-1 block text-xs font-extrabold lg:text-sm">
                            داستان
                          </span>
                        </div>
                        <span className="ml-2">
                          <b>{review.story}/5</b>
                        </span>
                      </div>
                    </div>

                    <div className="order-1 text-center">
                      <div className="border border-black/5 dark:border-white/5">
                        <div className="bg-primary flex items-center justify-center text-white">
                          <IoMdStar className="text-xl text-white" />
                          <span className="font-heading ml-1 block text-xs font-extrabold  lg:text-sm">
                            بازیگری
                          </span>
                        </div>
                        <span className="ml-2">
                          <b>{review.acting}/5</b>
                        </span>
                      </div>
                    </div>

                    <div className="order-1 text-center">
                      <div className="border border-black/5 dark:border-white/5">
                        <div className="bg-primary flex items-center justify-center text-white">
                          <IoMdStar className="text-xl text-white" />
                          <span className="font-heading ml-1 block text-xs font-extrabold  lg:text-sm">
                            تصویر
                          </span>
                        </div>
                        <span className="ml-2">
                          <b>{review.visual}/5</b>
                        </span>
                      </div>
                    </div>

                    <div className="order-1 text-center">
                      <div className="border border-black/5 dark:border-white/5">
                        <div className="bg-primary flex items-center justify-center text-white">
                          <IoMdStar className="text-xl text-white" />
                          <span className="font-heading ml-1 block text-xs font-extrabold  lg:text-sm">
                            موسیقی
                          </span>
                        </div>
                        <span className="ml-2">
                          <b>{review.music}/5</b>
                        </span>
                      </div>
                    </div>

                    <div className="order-1 text-center">
                      <div className="border border-black/5 dark:border-white/5">
                        <div className="bg-primary flex items-center justify-center text-white">
                          <IoMdStar className="text-xl text-white" />
                          <span className="font-heading ml-1 block text-xs font-extrabold  lg:text-sm">
                            کارگردانی
                          </span>
                        </div>
                        <span className="ml-2">
                          <b>{review.director}/5</b>
                        </span>
                      </div>
                    </div>

                    <div className="order-1 text-center">
                      <div className="border border-black/5 dark:border-white/5">
                        <div className="bg-green-600 flex items-center justify-center text-white">
                          <IoMdStar className="text-xl text-white" />
                          <span className="font-heading ml-1 block text-xs font-extrabold lg:text-sm">
                            مجموع
                          </span>
                        </div>
                        <span className="ml-2">
                          <b>{
                          (review.story + review.acting + review.visual + review.music + review.director) / 5
                          }/5</b>
                        </span>
                      </div>
                    </div>
                    

                  </div>


                  {review.isSpoil && !okSpoil ? (
                    <div className="flex flex-col items-center justify-center mt-2 gap-2 p-2">
                      <span> این بررسی حاوی اسپویل می‌باشد</span>
                       <button
                               type="button"
                               onClick={()=>setOKSpoil(!okSpoil)}
                               className="bg-red-600 text-white rounded-lg text-center p-3 mb-2"
                             >
                               <span className="flex justify-between">
                            
                                 <p className="font-bold mr-2"> مشکلی نیست، می خوانم</p>
                               </span>
                             </button>
                    </div>
                  ) : (
                      
                    <div className="flex flex-col gap-2 p-1 mt-4">
                    <span className="font-bold">{review.title}</span>
                    <p>{review.body}</p>
                  </div>
                      
                      
                  )
                  }


                  
                </div>
                <div className="border-t p-2 border-t-white/5">
                  <div className="flex justify-end">...</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SingleReviews;
