"use client";
import { Fragment, useRef, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { Dialog, Transition } from "@headlessui/react";
import { LuEye, LuX } from "react-icons/lu";
import { IoEyeSharp } from "react-icons/io5";
import { BiSolidLike, BiSolidDislike } from "react-icons/bi";
import { StarReview } from "../reviews/starReview";
import Image from "next/image";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import "react-multi-date-picker/styles/backgrounds/bg-dark.css";
import "react-multi-date-picker/styles/colors/red.css";
import size from "react-element-popper/animations/size";

export default function EpisodeReview({ episode, media_title, media_poster }) {
  let [seen, setSeen] = useState(false);
  let [isOpen, setIsOpen] = useState(false);
  let [rate, setRate] = useState();
  const bodyRef = useRef();
  const user_id = Cookies.get("token_id");
  const [date, setDate] = useState(new DateObject({ calendar: persian,format: "MM/DD/YYYY" }));
  let [like, setLike] = useState(false);
  let [dislike, setDislike] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    if (!user_id && !seen) {
      toast.warning("وارد حساب کاربری خود شوید");
      return;
    }
    setIsOpen(true);
  }

  // function un_watch() {
  //   setSeen(false);
  // }


  useEffect(() => {
    getData();
  }, [seen]);

  // Get score for a specific media_id
  async function getData() {
    await axios
      .get(`/api/medias/seens/${user_id}`)
      .then((response) => {
        const seenData = response.data.data;
        const found = seenData.some(item => item.episode_id === episode?._id);
        setSeen(found);
      })
      .catch((error) => {
        console.error(
          "Error fetching tracking data:",
          error.response || error.message
        );
      });
  }


  function DateChange(value) {
    //تغییرات روی تاریخ رو اینجا اعمال کنید
    setDate(new DateObject(value).format());
  }

  //Save Category
  const WatchReview = async (e) => {
    if (!user_id) {
      toast.warning("وارد حساب کاربری خود شوید");
      return;
    }
    e.preventDefault();
    const formData = {
      episode_id: episode._id,
      user_id: user_id,
      body: bodyRef.current.value == "" ? undefined : bodyRef.current.value,
      rate: rate,
      date: date,
      like: like,
      dislike: dislike,
    };

    const response = await fetch(`/api/medias/seens`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();
    if (response.status === 200) {
      toast.success("نظر شما ثبت شد");
      setIsOpen(false);
      setSeen(true);
    } else if (response.status === 402) {
      toast.error(responseData.data);
    } else if (response.status === 500) {
      toast.error("نظر شما ذخیره نشد! خطایی وجود دارد.");
    }
  };

  return (
    <>
      {seen ? (
        <div className="relative">
          <button
            type="button"
            data-tooltip-target="tooltip-animation"
            className="flex justify-between items-center border bg-red-700 border-red-700 text-white rounded-md w-full text-center p-3 mb-2"
          >
           
              <p> تماشا کرده‌ام </p>
              <IoEyeSharp className="text-white text-2xl" />
           
          </button>
        </div>
      ) : (
        <div className="relative">
          <button
            type="button"
            onClick={openModal}
            data-tooltip-target="tooltip-animation"
            className="flex justify-between items-center border border-white/80 text-white rounded-md w-full p-3 mb-2 hover:bg-red-700"
          >
            <p> هنوز تماشا نکرده‌ام</p>
            <LuEye />
          </button>
        </div>
      )}

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-hidden min-h-screen"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            <span className="inline-block h-screen align-middle" aria-hidden="true">
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="absolute w-full min-h-screen top-0 transition-all transform bg-black/10 backdrop-blur-md">
                <div className="relative">
                  <div className="fixed inset-0 z-20">
                    <div className="h-screen flex items-center justify-center w-full">
                      <div className="bg-zinc-900 flex rounded-md w-4/5 md:max-w-3xl p-2">
                        <form className="w-full" onSubmit={WatchReview}>
                          <div className="flex flex-col gap-2 p-2">
                            <div className="flex flex-col lg:grid lg:grid-cols-4 gap-2 border-b border-b-white/5 pb-3">
                              <div className="flex justify-start gap-2">
                                <Image
                                  className="h-25 w-25 max-w-24 lg:max-w-52 lg:max-h-64 lg:w-full lg:h-full rounded-md"
                                  src={media_poster}
                                  alt={episode.name}
                                  width={220}
                                  height={350}
                                />
                                <div className="text-gray-50 justify-between border-b border-b-white/5 pb-3 mb-3 flex flex-grow lg:hidden">
                                  <div className="flex flex-col items-start gap-1">
                                    <span className="text-gray-500">من دیده‌ام</span>
                                    <span className="font-bold">
                                      {media_title}/ قسمت {episode.episode_number}/ فصل {episode.season_number}
                                    </span>
                                  </div>
                                  <div>
                                    <button
                                      type="button"
                                      className="text-xl border-none font-medium text-white hover:text-red-900"
                                      onClick={closeModal}
                                    >
                                      <LuX />
                                    </button>
                                  </div>
                                </div>
                              </div>
                              <div className="col-span-3 gap-1 p-2">
                                <div className="text-gray-50 justify-between border-b border-b-white/5 pb-3 mb-3 hidden lg:flex">
                                  <div className="flex flex-col items-start gap-1">
                                    <span className="text-gray-500">من دیده‌ام</span>
                                    <span className="font-bold">
                                      {media_title}/ قسمت {episode.episode_number}/ فصل {episode.season_number}
                                    </span>
                                  </div>
                                  <div>
                                    <button
                                      type="button"
                                      className="text-xl border-none font-medium text-white hover:text-red-900"
                                      onClick={closeModal}
                                    >
                                      <LuX />
                                    </button>
                                  </div>
                                </div>
                                <div className="flex flex-col justify-center flex-wrap gap-1 p-1">
                                  <div className="flex flex-wrap gap-4 items-center">
                                    <div className="flex flex-col gap-1 items-start">
                                      <span className="text-xs">تاریخ تماشا</span>
                                      <DatePicker
                                        style={{
                                          backgroundColor: "#27272a",
                                          height: "30px",
                                          borderRadius: "5px",
                                          fontSize: "14px",
                                          padding: "5px 10px",
                                          border: "none",
                                        }}
                                        className="red bg-dark"
                                        animations={[size()]}
                                        value={date}
                                        onChange={DateChange}
                                        maxDate={new DateObject({ calendar: persian })}
                                        calendar={persian}
                                        locale={persian_fa}
                                        calendarPosition="bottom-right"
                                      />
                                    </div>
                                    <div className="flex flex-col gap-1 items-start">
                                      <span className="text-xs">امتیاز</span>
                                      <StarReview setScore={setRate} />
                                    </div>
                                    <div className="flex flex-row gap-1 items-start">
                                      <div className="flex flex-col p-1 gap-2 items-center">
                                        <span
                                          onClick={() => {
                                            setDislike(false);
                                            setLike(!like);
                                          }}
                                          className={`rounded-full p-3 cursor-pointer ${
                                            like ? "bg-gray-50 text-green-600" : "bg-zinc-700 text-white"
                                          }`}
                                        >
                                          <BiSolidLike />
                                        </span>
                                        <span className="text-xs">دوست داشتم</span>
                                      </div>
                                      <div className="flex flex-col p-1 gap-2 items-center">
                                        <span
                                          onClick={() => {
                                            setLike(false);
                                            setDislike(!dislike);
                                          }}
                                          className={`rounded-full p-3 cursor-pointer ${
                                            dislike ? "bg-gray-50 text-amber-950" : "bg-zinc-700 text-white"
                                          }`}
                                        >
                                          <BiSolidDislike />
                                        </span>
                                        <span className="text-xs">دوست نداشتم</span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="pt-4">
                                    <textarea
                                      ref={bodyRef}
                                      placeholder="نظر خود را بنویسید"
                                      className="block w-full h-24 px-4 py-2 mt-2 text-gray-50 bg-zinc-800 rounded-md focus:border-zinc-800 focus:ring-zinc-800 focus:outline-none"
                                    ></textarea>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex justify-start items-start mt-4">
                              <button
                                type="submit"
                                className="px-4 py-2 font-bold text-white bg-red-600 rounded-md hover:bg-red-800 focus:outline-none focus:bg-red-600"
                              >
                                ثبت نظر
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
