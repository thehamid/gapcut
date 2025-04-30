"use client";
import { Fragment, useRef, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { Dialog, Transition } from "@headlessui/react";
import { LuListPlus, LuX } from "react-icons/lu";
import Loading from "@/components/elements/loading";

export default function WatchListButton({ media_id, media_title, submited }) {
  let [isOpen, setIsOpen] = useState(false);
  let [reload, setReload] = useState(false);
  let [lists, setLists] = useState(-1);
  const titleRef = useRef();
  const user_id = Cookies.get("token_id");

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    if (!user_id) {
      toast.warning("وارد حساب کاربری خود شوید");
      return;
    }
    setIsOpen(true);
    setReload(!reload);
  }

  useEffect(() => {
    getList()

  }, [reload]);

  //get
  async function getList() {
    await axios
      .get(`/api/users/watchlist/${user_id}`)
      .then((response) => {
        const listData = response.data.data;
        setLists(listData);
      })
      .catch((error) => {
        console.error(
          "Error fetching tracking data:",
          error.response || error.message
        );
      });
  }

  const [checkgenres, setCheckGenres] = useState([]);
  const catSelect = (e) => {
    let myCats = [...checkgenres];
    if (e.target.checked) {
      myCats = [...checkgenres, e.target.value];
    } else {
      myCats.splice(lists.indexOf(e.target.value), 1);
    }
    setCheckGenres(myCats);
  };



  const generateRandomSlug = () => {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 5; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };



  //Save List
  const CreateList = async (e) => {
    if (!user_id) {
      toast.warning("وارد حساب کاربری خود شوید");
      return;
    }
    e.preventDefault();
    const formData = {
      media_id: media_id,
      user_id: user_id,
      title: titleRef.current.value == "" ? "بدون نام" : titleRef.current.value,
      slug:generateRandomSlug() ,
    };

    const response = await fetch(`/api/users/watchlist`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();
    if (response.status === 200) {
      toast.success("  فهرست جدید اضافه شد");
      setReload(!reload);
    } else if (response.status === 402) {
      toast.error(responseData.data);
    } else if (response.status === 500) {
      toast.error("فهرست جدید اضافه نشد! خطایی وجود دارد.");
    }
  };


 //Save List
 const addList = async (e) => {
  if (!user_id) {
    toast.warning("وارد حساب کاربری خود شوید");
    return;
  }
  const formData = {
    media_id: media_id,
    user_id: user_id,
   };
   
   const id = e.target.value;

  const response = await fetch(`/api/users/watchlist/${id}`, {
    method: "PUT",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const responseData = await response.json();
  if (response.status === 200) {
    setReload(!reload);
  } else if (response.status === 402) {
    toast.error(responseData.data);
  } else if (response.status === 500) {
    toast.error("خطایی وجود دارد.");
  }
};



  return (
    <>
      <div>
        <button
          type="button"
          onClick={openModal}
          className="btn border-2 rounded-md px-6 py-2 border-white/60 text-white flex gap-2 "
        >
          <i className="text-white text-xl">
            <LuListPlus />
          </i>
          اضافه به لیست
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
              <div
                onClick={closeModal}
                className="absolute w-full min-h-screen top-0 transition-all transform bg-black/10  backdrop-blur-md"
              >
                <div className="relative">
                  <div className="fixed inset-0 z-20">
                    {/* start form  */}
                    <div className="h-screen flex items-center justify-center w-full ">
                      <div
                        className="bg-zinc-900 rounded-md w-4/5 md:max-w-xl "
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="bg-red-600 text-gray-50 rounded-md rounded-b-none p-3 flex justify-between w-full">
                          <div className="font-bold">
                            اضافه کردن <span>{media_title}</span> در فهرست شما
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

                        <div className="flex flex-col gap-4 p-4">
                          <h2>ساخت فهرست جدید</h2>
                          <form onSubmit={CreateList}>
                            <div class="flex items-center justify-items-center  gap-1">
                              <div class="flex flex-col flex-grow gap-2">
                                <input
                                  placeholder="عنوان فهرست جدید"
                                  ref={titleRef}
                                  type="text"
                                  class="flex px-4 py-2 text-gray-700 bg-white rounded-md"
                                  name="title"
                                />
                              </div>
                              <button
                                type="submit"
                                class="px-4 py-2  text-gray-50 bg-red-600  rounded-md focus:outline-none"
                              >
                                ساخت فهرست جدید
                              </button>
                            </div>
                          </form>
                          <div className="flex flex-col justify-start gap-2 mt-4">
                            <label className="text-sm">فهرست‌های موجود</label>
                            <ul class="flex h-60 flex-col items-start overflow-y-scroll border border-black/5 px-3 pt-3 dark:border-white/5">
                              {lists == -1 ? (
                                <Loading />
                              ) : lists == -2 ? (
                                <Loading />
                              ) : lists.length == 0 ? (
                                <span>
                                      شما هنوز هیچ فهرستی ندارید!
                                </span>
                              ) : (
                                lists.map((list, i) => (
                                  <li key={i} class="mb-1.5 flex w-full items-center justify-between">
                                    <span class="flex items-center">
                                      <input
                                        type="checkbox"
                                        class="accent-red-600"
                                        id={`list_${i}`}
                                        defaultChecked={list.media_id.includes(media_id)}
                                        value={list._id}
                                        onChange={addList}
                                        name={list._id}
                                      />
                                      <label
                                        for={`list_${i}`}
                                        class="mr-2 flex items-center text-sm"
                                      >
                                       {list.title}
                                      </label>
                                    </span>
                                  </li>
                                ))
                              )}
                            </ul>
                          </div>
                        </div>
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
