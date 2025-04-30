"use client";
import { Fragment, useRef, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { Dialog, Transition } from "@headlessui/react";
import { LuPenSquare, LuX } from "react-icons/lu";
import { StarReview } from "./starReview";
import { Switch } from "@headlessui/react";

export default function WriteReview({media_id,media_title,submited}) {
  let [isOpen, setIsOpen] = useState(false);
  let [story, setStory] = useState(0);
  let [acting, setActing] = useState(0);
  let [visual, setVisual] = useState(0);
  let [music, setMusic] = useState(0);
  let [director, setDirector] = useState(0);
  let [spoil, setSpoil] = useState(false);
  const titleRef = useRef();
  const bodyRef = useRef();
  const { data: session, status: sessionStatus } = useSession();
  const user_id = session?.user?.id;
  const date = new Date();

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    if (sessionStatus !== "authenticated") {
      toast.warning("وارد حساب کاربری خود شوید");
      return;
    }
    setIsOpen(true);
  }

  //Save Category
  const SendReview = async (e) => {
    if (sessionStatus !== "authenticated") {
      toast.warning("وارد حساب کاربری خود شوید");
      return;
    }
    e.preventDefault();
    const formData = {
      media_id: media_id,
      user_id:user_id,
      title: titleRef.current.value == "" ? undefined : titleRef.current.value,
      body: bodyRef.current.value == "" ? undefined : bodyRef.current.value,
      story: story,
      acting: acting,
      visual: visual,
      music: music,
      director: director,
      isSpoil: spoil,
      date:date.toLocaleDateString("fa-IR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      
    };

    const response = await fetch(`/api/medias/reviews`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();
    if (response.status === 200) {
      toast.success("بررسی شما ثبت شد");
      setIsOpen(false);
      titleRef.current.value = "";
      submited(true);
    } else if (response.status === 402) {
      toast.error(responseData.data);
    } else if (response.status === 500) {
      toast.error("بررسی شما ذخیره نشد! خطایی وجود دارد.");
    }
  };

  return (
    <>
      <div className="">
        <button
          type="button"
          onClick={openModal}
          className="bg-red-600 text-white rounded-lg text-center p-3 mb-2"
        >
          <span className="flex justify-between">
            <LuPenSquare className="text-2xl" />
            <p className="font-bold mr-2"> شما بررسی کنید </p>
          </span>
        </button>
      </div>

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

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
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
              <div onClick={closeModal} className="absolute w-full min-h-screen top-0 transition-all transform bg-black/10  backdrop-blur-md">
                <div className="relative">
                  <div className="fixed inset-0 z-20">
                 
                    {/* start form  */}
                    <div className="h-screen flex items-center justify-center w-full overflow-y-scroll ">
                      <div className="bg-zinc-900 rounded-md w-4/5 md:max-w-2xl "  onClick={(e) => e.stopPropagation()}>
                        <div className="bg-red-600 text-gray-50 rounded-md rounded-b-none p-3 flex justify-between w-full">
                          <div className="font-bold">
                            ثبت بررسی برای: <span> {media_title}</span>
                          </div>
                          <div>
                            <button
                              type="button"
                              className=" text-xl font-medium text-white  hover:text-red-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                              onClick={closeModal}
                            >
                              <LuX />
                            </button>
                          </div>
                        </div>
                        <form onSubmit={SendReview}>
                          <div className="flex flex-col  justify-center gap-1 p-2">
                            <div className="bg-zinc-700 text-gray-300 text-sm border-zinc-600 p-2 rounded-md hidden sm:block">
                               لطفاً نظرات خود را روی سریال متمرکز کنید و از ارائه مسائل قومی، مذهبی و سیاسی خودداری کنید.
                            </div>
                            <div className="flex flex-row justify-center flex-wrap gap-1 p-1">
                              <div className="flex flex-col gap-2 items-center bg-zinc-800  p-1 rounded-sm">
                                <span className="text-xs font-bold">
                                  داستان
                                </span>
                                <StarReview setScore={setStory} />
                                <span className="sm:flex justify-center hidden">
                                  {story}/5
                                </span>
                              </div>
                              <div className="flex flex-col gap-2 items-center bg-zinc-800  p-1 rounded-sm">
                                <span className="text-xs font-bold">
                                  بازیگری
                                </span>
                                <StarReview setScore={setActing} />
                                <span className="sm:flex justify-center hidden">
                                  {acting}/5
                                </span>
                              </div>
                              <div className="flex flex-col gap-2 items-center bg-zinc-800  p-1 rounded-sm">
                                <span className="text-xs font-bold">تصویر</span>
                                <StarReview setScore={setVisual} />
                                <span className="sm:flex justify-center hidden">
                                  {visual}/5
                                </span>
                              </div>
                              <div className="flex flex-col gap-2 items-center bg-zinc-800  p-1 rounded-sm">
                                <span className="text-xs font-bold">
                                  موسیقی
                                </span>
                                <StarReview setScore={setMusic} />
                                <span className="sm:flex justify-center hidden">
                                  {music}/5
                                </span>
                              </div>
                              <div className="flex flex-col gap-2 items-center bg-zinc-800  p-1 rounded-sm">
                                <span className="text-xs font-bold">
                                  کارگردانی
                                </span>
                                <StarReview setScore={setDirector} />
                                <span className="sm:flex justify-center hidden">
                                  {director}/5
                                </span>
                              </div>
                            </div>
                            <div className="pt-2">
                              <div className="mb-2">
                                <label className="text-sm float-right hidden sm:block">
                                  عنوان <span className="text-red-500">*</span>
                                </label>
                                <input
                                  ref={titleRef}
                                  type="text"
                                  placeholder="عنوان بررسی"
                                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md"
                                  name="title"
                                />
                              </div>
                            </div>
                            <div className=" pt-2">
                              <label className="text-sm float-right hidden sm:block">
                                بررسی <span className="text-red-500">*</span>
                              </label>
                              <textarea
                                ref={bodyRef}
                                placeholder="نقد و بررسی خود را اینجا بنویسید ..."
                                className="block w-full h-52 px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                              ></textarea>
                            </div>

                            <div className="flex flex-row items-center gap-2 mt-2 ">
                              <Switch
                                checked={spoil}
                                onChange={setSpoil}
                                className={`${
                                  spoil ? "bg-red-700" : "bg-zinc-600"
                                } relative inline-flex h-6 w-11 items-center rounded-full`}
                              >
                               <span
                                  className={`${
                                    spoil ? "-translate-x-7" : "-translate-x-0"
                                  } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                                />
                              </Switch>
                              <span className="font-thin text-sm">اسپویل (لو دادن قصه)</span>
                            </div>

                            <div className=" mt-4">
                              <button
                                type="submit"
                                className=" w-full px-4 py-2 font-bold  text-white bg-red-600 rounded-md hover:bg-red-800 focus:outline-none focus:bg-red-600"
                              >
                                ثبت بررسی
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
