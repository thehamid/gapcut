import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { LuPlayCircle, LuX } from "react-icons/lu";

export default function MyModal({ video }) {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div className="">
        <button
          type="button"
          onClick={openModal}
          className="bg-red-600 text-white rounded-lg w-full text-center p-3 mb-2"
        >
          <span className="flex justify-between">
            <p>نمایش تیزر</p>
            <LuPlayCircle className="text-2xl" />
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
              <div className="absolute w-full min-h-screen top-0 transition-all transform bg-black/10  backdrop-blur-md">
                <div className="relative">
                  <div className="fixed inset-0 z-10 ">
                    <button
                      type="button"
                      className="flex items-start justify-start px-4 py-2 text-xl font-medium text-white  hover:bg-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      <LuX />
                    </button>

                    <div className="h-screen flex items-center justify-center">
                      <iframe
                        src={`https://www.aparat.com/video/video/embed/videohash/${video}/vt/frame`}
                        frameborder="0"
                        allowfullscreen
                        width="640"
                        height="360"
                        loading="lazy"
                      />
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
