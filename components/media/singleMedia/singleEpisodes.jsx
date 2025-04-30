"use client";
import { Fragment, useState, useEffect } from "react";
import EpisodeCard from "@/components/media/episodes/card";
import Loading from "@/components/elements/loading";
import axios from "axios";
import { Listbox, Transition } from "@headlessui/react";
import { LuArrowUpDown, LuCheck, LuEye } from "react-icons/lu";

const defaultSeasons = [{ _id: "0", name: "فصل اول", number: 1 }];
//const CustomModal = ({id, name, number}) => {}

const SingleEpisodes = ({ media_id, media }) => {
  const [selected, setSelected] = useState(defaultSeasons[0]);
  const [allSeason, setallSeason] = useState(-1);
  const [allEpisode, setallEpisode] = useState(-1);

  useEffect(() => {
    getSe();
    getEp();
  }, [selected]);
  //get Seasons
  async function getSe() {
    await axios
      .get(`/api/medias/seasons/${media_id}`)
      .then((d) => {
        setallSeason(d.data.data);
      })
      .catch((e) => {
        console.log(e.response);
        setallSeason(-2);
      });
  }

  //Episodes
  async function getEp() {
    if (!selected) {
      return;
    }

    await axios
      .get(`/api/medias/seasons/${media_id}/${selected.number}`)
      .then((d) => {
        setallEpisode(d.data.data);
      })
      .catch((e) => {
        console.log(e.response);
        setallEpisode(-2);
      });
  }

  return (
    <div className="col-span-8 space-y-6 lg:col-span-6 mt-5">
      <div className="flex justify-start  ">
        {allSeason == -1 ? (
          <Loading />
        ) : allSeason == -2 ? (
          <Loading />
        ) : (
          <Listbox value={selected} onChange={setSelected}>
            <div className="relative mt-1">
              <Listbox.Button className="relative min-w-[200px]  cursor-default rounded-lg bg-zinc-800 py-2 pl-10 pr-3 text-right shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                <span className="block truncate">{selected.name}</span>
                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
                  <LuArrowUpDown
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-zinc-800 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                  {allSeason.map((se, i) => (
                    <Listbox.Option
                      key={i}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active ? "bg-zinc-500 text-gray-100" : "text-gray-200"
                        }`
                      }
                      value={se}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {se.name}
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-red-600">
                              <LuCheck className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        )}
      </div>

      <div className="grid grid-cols-1 min-[480px]:grid-cols-2 md:grid-cols-3  xl:grid-cols-4 gap-4 place-content-center">
        {allEpisode == -1 ? (
          <Loading />
        ) : allEpisode == -2 ? (
          <Loading />
        ) : (
          allEpisode.map((ep, i) => (
            <EpisodeCard key={i} data={ep} media={media} />
          ))
        )}
      </div>
    </div>
  );
};

export default SingleEpisodes;
