"use client";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import axios from "axios";
import ImageUpload from "@/components/formElement/imageupload";
import Image from "next/image";

export default function ImageSelector({ saveImage, src }) {
  let [isOpen, setIsOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(
    src ? src : "/images/avatar-holder.jpg"
  );
  const [files, setFiles] = useState(-1);
  const [img, setImage] = useState();
  const [reload, setReload] = useState(false);
  const [itemID, setItemID] = useState();

  const initialItemList = 18; // Number of items to display initially
  const incrementInitialItemList = 18; // Number of items to add each time
  const [displayItems, setDisplayItems] = useState(initialItemList);

  const loadMore = () => {
    setDisplayItems(displayItems + incrementInitialItemList);
  };

  function closeModal() {
    setPreviewUrl(img ? img : "/images/avatar-holder.jpg");
    saveImage(img);
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/dashboard/gallery/");

      const data = await response.json();
      setFiles(data);
      setReload(false);
    }
    fetchData();
  }, [reload]);

  //upload Image
  const uploadImage = (props) => {
    const data = new FormData();
    data.append("file", props);

    axios
      .post("/api/upload", data)
      .then((d) => {
        setImage(d.data.data);
        setReload(true);
      })
      .catch((e) => console.log(e.response));
  };

  const selectImage = (img) => {
    setImage(img.url);
    setItemID(img._id);
  };

  const deletehandler = async (id) => {
    await fetch(`/api/dashboard/gallery/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((messages) => {
        console.log("messages");
      });
    setReload(true);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div className="overflow-hidden h-full rounded-lg border-4 border-white shadow shadow-black/50">
          <Image
            className="w-full h-full object-cover"
            src={previewUrl}
            alt={"avatar"}
            width={128}
            height={128}
          />
        </div>

        <button
          type="button"
          onClick={openModal}
          className="rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
        >
          {img ? "جایگزینی تصویر" : " انتخاب تصویر"}
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-zinc-700 text-gray-200 p-6  align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-200"
                  >
                    انتخاب تصویر از گالری
                  </Dialog.Title>
                  <div className="mt-2">
                    <div>
                      <div className="flex flex-row justify-around p-2 mb-4 bg-zinc-900 rounded-lg">
                        <div className="p-2">
                          <ImageUpload
                            onInput={uploadImage}
                            src="/images/avatar-holder.jpg"
                          />
                        </div>
                        <div className="p-2 text-center">
                          <label htmlFor="Imageurl">آدرس تصویر انتخابی</label>
                          <input
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md"
                            type="text"
                            name="Imageurl"
                            defaultValue={img}
                          />
                          <span
                            onClick={() => deletehandler(itemID)}
                            className="text-red-600 text-sm pt-6 cursor-pointer"
                          >
                            حذف تصویر از گالری
                          </span>
                          <div className="mt-4">
                            <button
                              type="button"
                              className=" w-full p-3 text-white bg-red-600 rounded-md hover:bg-red-800 focus:outline-none focus:bg-red-600"
                              onClick={closeModal}
                            >
                              جایگذاری تصویر
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="p-2  bg-zinc-900 rounded-lg">
                        {files == -1 ? (
                          <p>Loading...</p>
                        ) : files == -2 ? (
                          <p>Error...</p>
                        ) : (
                          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                            {files.slice(0, displayItems).map((item, i) => (
                              <div key={i} className="relative">
                                <Image
                                  onClick={() => selectImage(item)}
                                  className="block h-full w-full rounded-lg object-cover object-center cursor-pointer"
                                  style={{
                                    border:
                                      itemID === item._id
                                        ? "3px solid #FF0032"
                                        : "none",
                                  }}
                                  src={item.url}
                                  width={200}
                                  height={200}
                                  alt={item._id}
                                  priority={true}
                                />
                              </div>
                            ))}

                            {displayItems < files.length ? (
                                  <button
                                     className="col-start-3 col-end-5 text-sm p-1 text-white bg-red-600 rounded-md hover:bg-red-800 focus:outline-none focus:bg-red-600"
                                    onClick={loadMore}
                                  >
                                  بیشتر ...
                              </button>
                            ) : null}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
