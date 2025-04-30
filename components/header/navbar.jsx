"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import DropDown from "./DropDown";
import { Menu, Transition } from "@headlessui/react";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { CgClose, CgSearch } from "react-icons/cg";
import { useRouter } from "next/navigation";

function Navbar() {
  const { data: session } = useSession();
  const avatar = useSelector((store) => store.avatarSlice);
  const role = useSelector((store) => store.roleSlice);
  const [isOpen, setIsOpen] = useState(false);
  const [searchOn, setSearchOn] = useState(false);
  const [inputValue, setValue] = useState("");
  const [allMedia, setallMedia] = useState(-1);
  const [filteredMedias, setFilteredMedias] = useState([]);
  const router = useRouter();

  function logoutHandler() {
    Cookies.set("token_id", "", { expires: 0 });

    signOut({ callbackUrl: "/login" });
  }

  // fetch the medias
  useEffect(() => {
    if (searchOn) {
      fetch("/api/medias/search")
        .then((response) => response.json())
        // save the complete list of users to the new state
        .then((data) => setallMedia(data.data))
        // if there's an error we log it to the console
        .catch((err) => console.log(err));
    }
  }, [searchOn]);

  const handleSearchChange = (e) => {
  
    const inputValue = e.target.value;

    setValue(inputValue);

    // filter the items using the apiMedias state
    const filteredItems = allMedia.filter((media) =>
      media.title.toLowerCase().includes(inputValue.toLowerCase())
    );

    inputValue ? setFilteredMedias(filteredItems) : setFilteredMedias([]);
  };

  const handleSearch = () => {
    setSearchOn(!searchOn)
    setValue('')
    setFilteredMedias([])
    if (inputValue) return router.push(`/search/?q=${inputValue}`);
    if (!inputValue) return router.push("/"); 
  };

  const handleSearchPress = (event) => {
    if (event.key === "Enter") return handleSearch();
  };

  return (
    <nav className="bg-zinc-900">
      <div className="container m-auto p-5 flex justify-between items-center h-16">
        <div className="relative  flex items-center gap-5">
          <Link href="/" className="flex justify-center items-center">
            <Image
              src="/images/logo.png"
              alt="gapcut.ir"
              width={50}
              height={50}
              className="object-contain"
              priority
            />
          </Link>

          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-0 focus:ring-white focus:outline-hidden focus:ring-inset"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">فهرست</span>

              {!isOpen ? (
                <svg
                  className="block size-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              ) : (
                <svg
                  className="block size-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>

          <div className="hidden gap-10 text-sm font-light text-gray-300 md:flex">
            <Link href="/explore" className="text-white">
              سریال‌ها
            </Link>
            <Link href="/blog" className="text-white">
              مطالب
            </Link>
            <Link href="/reviews" className="text-white">
              بررسی‌ها
            </Link>
            <Link href="/calender" className="text-white">
              تقویم
            </Link>
          </div>
        </div>

        <div className="relative  flex items-center gap-5">
          <button
            onClick={() => setSearchOn(!searchOn)}
            type="button"
            className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-0 focus:ring-white focus:outline-hidden focus:ring-inset"
            aria-controls="search-bar"
          >
            <CgSearch />
          </button>
          {!session ? (
            <>
              <div>
                <Link
                  href="/login"
                  className="border border-white px-2 py-1 m-1 rounded-lg"
                >
                  ورود
                </Link>
                <Link
                  href="/register"
                  className="border border-red-600 bg-red-600  text-white px-2 py-1 m-1 rounded-lg"
                >
                  عضویت
                </Link>
              </div>
            </>
          ) : (
            <>
              <Menu as="div" className="relative inline-block">
                <Menu.Button className="text-white-500">
                  <Image
                    src={
                      avatar.value ? avatar.value : "/images/avatar-holder.jpg"
                    }
                    alt={session.user.name}
                    width={50}
                    height={50}
                    className="aspect-square rounded-md w-[20px] sm:w-[36px] object-cover"
                  />
                </Menu.Button>
                <Transition
                  enter="transition duration-100 ease-out"
                  enterFrom="transform scale-95 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-75 ease-out"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-95 opacity-0"
                >
                  <Menu.Items
                    transition
                    className="absolute z-10 left-0 mt-2 w-56 bg-zinc-600 origin-top-right rounded-md py-1  border-w border-slate-100 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                  >
                    <div className="flex flex-row p-1 justify-start">
                      <div>
                        <Image
                          src={
                            avatar.value
                              ? avatar.value
                              : "/images/avatar-holder.jpg"
                          }
                          alt={session.user.name}
                          width={50}
                          height={50}
                          className="aspect-square rounded-md w-[20px] sm:w-[36px] object-cover"
                        />
                      </div>
                      <div className="flex flex-col mr-2">
                        <small>{session.user.name}</small>
                        <small className="text-gray-400">
                          {session.user.username}@
                        </small>
                      </div>
                    </div>
                    <Menu.Item>
                      <DropDown
                        className="flex p-2 border-t border-zinc-500 hover:text-slate-300"
                        href={`/user/${session.user.username}`}
                      >
                        صفحه من
                      </DropDown>
                    </Menu.Item>
                    <Menu.Item>
                      <DropDown
                        className="flex p-2 border-t border-zinc-500 hover:text-slate-300"
                        href="/profile"
                      >
                        تنظیمات
                      </DropDown>
                    </Menu.Item>
                    <Menu.Item>
                      <Link
                        className="flex p-2 border-t border-zinc-500  hover:text-slate-300"
                        href="#"
                        onClick={logoutHandler}
                      >
                        خروج
                      </Link>
                    </Menu.Item>
                    {role.value == 100 && (
                      <Menu.Item>
                        <DropDown
                          className="flex p-2 border-t border-zinc-500  hover:text-slate-300"
                          href="/dashboard"
                        >
                          پیشخوان مدیریت
                        </DropDown>
                      </Menu.Item>
                    )}
                  </Menu.Items>
                </Transition>
              </Menu>
            </>
          )}
        </div>
      </div>
      {/* Mobile menu, show/hide based on menu state. */}
      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="space-y-1 px-2 pb-3 pt-2">
            <Link
              href="/explore"
              className="block rounded-md bg-zinc-900 px-3 py-2 text-base font-medium text-white"
            >
              سریال‌ها
            </Link>
            <Link
              href="/blog"
              className="block rounded-md bg-zinc-900 px-3 py-2 text-base font-medium text-white"
            >
              مطالب
            </Link>
            <Link
              href="/reviews"
              className="block rounded-md bg-zinc-900 px-3 py-2 text-base font-medium text-white"
            >
              بررسی‌ها
            </Link>
            <Link
              href="/calender"
              className="block rounded-md bg-zinc-900 px-3 py-2 text-base font-medium text-white"
            >
              تقویم
            </Link>
          </div>
        </div>
      )}

      {/* Mobile menu, show/hide based on menu state. */}
      {searchOn && (
        <div
          id="search-bar"
          className="dropdown absolute left-0 right-0 top-16 w-full bg-zinc-900 border-t border-solid border-zinc-700 z-40 "
        >
          <div
            onClick={() => setSearchOn(!searchOn)}
            className="fixed w-full min-h-lvh top-0 overscroll-y-none transition-all transform bg-black/10  backdrop-blur-md z-30"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="space-y-1 px-2 pb-3 pt-2 bg-zinc-900"
            >
              <div className="search__input  flex flex-row items-center gap-2 py-1 px-5">
                <button onClick={handleSearch} htmlFor="inputId">
                  <CgSearch />
                </button>

                <input
                  type="text"
                  id="inputId"
                  placeholder="جستجو در سریال‌ها..."
                  value={inputValue ?? ""}
                  onChange={handleSearchChange}
                  onKeyDown={handleSearchPress}
                  autocomplete="off"
                  className="bg-[transparent] outline-none border-none w-full py-3 pl-2 pr-3"
                />
                <button onClick={() => setSearchOn(!searchOn)} htmlFor="inputId">
                  <CgClose />
                </button>
              </div>
              <ul className="grid md:grid-cols-4 gap-3">
                {filteredMedias.slice(0, 8).map((item) => (
                  <li key={item.id} className="col-span-1">
                    <Link href={`/media/${item.slug}`} className="flex gap-2 items-center">
                      <Image
                        src={item.poster}
                        width={50}
                        height={75}
                        className="rounded-sm object-cover"
                        alt={item.title}
                      />
                      <span>
                        <h2>{item.title}</h2>
                        <small className="text-sm text-gray-400">
                          ({item.yearProduct})
                        </small>
                          
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
