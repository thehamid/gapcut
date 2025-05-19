"use client";
import { useRef, useState, useEffect } from "react";
import { toast } from "react-toastify";
import ImageSelector from "@/components/formElement/image-selector";
import Photos from "./photos";
import { LuPlus, LuMinus, LuTrash, LuPen } from "react-icons/lu";
import axios from "axios";
import Image from "next/image";

const Episode = ({ media_id }) => {
  const nameRef = useRef();
  const slugRef = useRef();
  const sumEpisodeRef = useRef();
  const episodeNumberRef = useRef();
  const seasonNumberRef = useRef();
  const airdateRef = useRef();
  const [cover, setCover] = useState("");
  const [addEpisode, setAddEpisode] = useState(false);
  const [allEpisode, setallEpisode] = useState(-1);
  const [reload, setReload] = useState(false);
  const [edit, setEdit] = useState(false);
  const [id, setID] = useState();
  const [namevalue, setNameValue] = useState(-1);
  const [slugvalue, setSlugValue] = useState(-1);
  const [sumepivalue, setSumEpiValue] = useState(-1);
  const [epNumvalue, setEpNumValue] = useState(-1);
  const [seasonnumvalue, setSeasonNumValue] = useState(-1);
  const [airdatevalue, setAirdateValue] = useState(-1);


  useEffect(() => {
    getData();
  }, [addEpisode,reload]);
  //get
  async function getData() {
    await axios
      .get(`/api/dashboard/medias/episodes/${media_id}`)
      .then((d) => {
        setallEpisode(d.data.data);
        setReload(false)
      })
      .catch((e) => {
        console.log(e.response);
        setallEpisode(-2);
      });
  }

  //Save Episode
  const SendEpisode = async () => {
    const formData = {
      media_id,
      name: nameRef.current.value,
      slug: slugRef.current.value,
      summary_episode: sumEpisodeRef.current.value,
      episode_number: episodeNumberRef.current.value,
      season_number: seasonNumberRef.current.value,
      airdate: airdateRef.current.value,
      cover:cover == "" ? "/image/avatar-holder.jpg" : cover,
     
    };
    const response = await fetch(`/api/dashboard/medias/episodes`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();
    if (response.status === 200) {
      toast.success(" قسمت دیگری اضافه شد");
      togglePlus();
      setReload(true)
    } else if (response.status === 402) {
      toast.error(responseData.data);
    } else if (response.status === 500) {
      toast.error("خطایی وجود دارد.");
    }
  };

  const togglePlus = () => {
    setAddEpisode((current) => !current);
  };



     
  // Delete Cat
  const deletehandler = async (id) => {
    await fetch(`/api/dashboard/medias/episodes/${id}`, {
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
    toast.warning("دسته حذف شد");  
    setReload(true);
  };


  const edithandler = (id,name,slug,summary,episode_number,season_number,airdate,cover) => {
    setEdit(true);
      setID(id)
      setNameValue(name)
      setSlugValue(slug)
      setSumEpiValue(summary)
      setEpNumValue(episode_number)
      setSeasonNumValue(season_number)
      setAirdateValue(airdate)
      setCover(cover)
  
  }



   //Edit Episode
  const EditCast = async (edid) => {
      
    if (!edit) {
      return
    }

    const formData = {
        name: nameRef.current.value,
        slug: slugRef.current.value,
        summary_episode: sumEpisodeRef.current.value,
        episode_number: episodeNumberRef.current.value,
        season_number: seasonNumberRef.current.value,
        airdate: airdateRef.current.value,
        cover:cover == "" ? "/image/avatar-holder.jpg" : cover,
    };

    const response = await fetch(`/api/dashboard/medias/episodes/${edid}`, {
      method: "PUT",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();
    if (response.status === 200) {
      toast.success("با موفقیت ویرایش شد");
      setEdit(false);
      setReload(true)
    } else if (response.status === 402) {
      toast.error(responseData.data);
    } else if (response.status === 500) {
      toast.error("خطایی وجود دارد.");
    }
  };

  return (
    <div>
      <div className="flex flex-row justify-between">
        <label className="text-sm">  قسمت‌ها</label>
        <span className="text-gray-400 hover:text-gray-100 p-1 cursor-pointer" onClick={togglePlus}>
          {addEpisode ? <LuMinus /> : <LuPlus />}
        </span>
      </div>
      {!addEpisode ? ("") : edit ?("") : (
        <div className="plus-card">
      
          <div className="flex flex-row">
            <div className="ml-3 w-[50%]">
              <div className="mb-4">
                <label className="text-sm">کاور قسمت</label>
                <ImageSelector saveImage={setCover} src={cover} />
              </div>
            </div>
            <div className="flex-1">
              <div className="mb-4">
                <label className="text-sm">نام قسمت</label>
                <input
                  ref={nameRef}
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md"
                  name="name"
                />
              </div>
              <div className="mb-4">
                <label className="text-sm">نامک</label>
                <input
                  ref={slugRef}
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md"
                  name="slug"
                />
                          </div>
                          <div className="mb-4">
                <label className="text-sm">خلاصه قسمت</label>
                <input
                  ref={sumEpisodeRef}
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md"
                  name="summary_episode"
                />
              </div>            
                      </div>   
          </div>
          <div className="flex flex-row gap-2">
              <div className="mb-4">
                <label className="text-sm">شماره قسمت</label>
                <input
                  ref={episodeNumberRef}
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md"
                  name="episode_number"
                />
              </div>
              <div className="mb-4">
                <label className="text-sm">شماره فصل</label>
                <input
                  ref={seasonNumberRef}
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md"
                  name="season_number"
                />
                          </div>
                          <div className="mb-4">
                <label className="text-sm">تاریخ پخش</label>
                <input
                  ref={airdateRef}
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md"
                  name="airdate"
                />
              </div>            
            </div>
           

          <div class="col-span-4 mt-4">
            <button
              onClick={SendEpisode}
              type="submit"
              class=" w-full px-4 py-2  text-gray-200 bg-red-500 rounded-md hover:bg-gray-400 focus:outline-none focus:bg-gray-300"
            >
              اضافه شدن
            </button>
          </div>
        </div>
      )}

{!edit ? (
        ""
      ) : (
        <div className="plus-card">
        <div className="flex flex-row">
            <div className="ml-3">
              <div className="mb-4">
                <label className="text-sm">کاور قسمت</label>
                <ImageSelector saveImage={setCover} src={cover} />
              </div>
            </div>
            <div className="flex-1">
              <div className="mb-4">
                <label className="text-sm">نام قسمت</label>
                <input
                   defaultValue={namevalue}                   
                  ref={nameRef}
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md"
                  name="name"
                />
              </div>
              <div className="mb-4">
                <label className="text-sm">نامک</label>
                                  <input
                                      defaultValue={slugvalue}
                  ref={slugRef}
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md"
                  name="slug"
                />
                          </div>
                          <div className="mb-4">
                <label className="text-sm">خلاصه قسمت</label>
                                  <input
                                      defaultValue={sumepivalue}
                  ref={sumEpisodeRef}
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md"
                  name="summary_episode"
                />
              </div>            
                      </div>   
          </div>
          <div className="flex flex-row gap-2">
              <div className="mb-4">
                <label className="text-sm">شماره قسمت</label>
                              <input
                                  defaultValue={epNumvalue}
                  ref={episodeNumberRef}
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md"
                  name="episode_number"
                />
              </div>
              <div className="mb-4">
                <label className="text-sm">شماره فصل</label>
                              <input
                                  defaultValue={seasonnumvalue}
                  ref={seasonNumberRef}
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md"
                  name="season_number"
                />
                          </div>
                          <div className="mb-4">
                <label className="text-sm">تاریخ پخش</label>
                              <input
                                  defaultValue={airdatevalue}
                  ref={airdateRef}
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md"
                  name="airdate"
                />
              </div>            
            </div>
          <Photos media_id={media_id} episode_id={id} />
          <div class="flex flex-ro gap-2 mt-4">
            <button
              onClick={() => EditCast(id)}
              type="submit"
              class=" w-full px-4 py-2  text-gray-200 bg-red-500 rounded-md"
            >
              ویرایش
            </button>
            <button
              onClick={() => setEdit(false)}
              type="submit"
              class=" w-full px-4 py-2  text-gray-200 bg-gray-500 rounded-md"
            >
              انصراف
            </button>
          </div>
        </div>
      )}

      

      <div className="flex flex-col gap-3 mt-2">
        {allEpisode == -1 ? (
          <p>Loading...</p>
        ) : allEpisode == -2 ? (
          <p>Error...</p>
        ) : (
          allEpisode.map((e, i) => (
            <div
              key={i}
              className="flex justify-between bg-zinc-800 p-4 w-full"
            >
              <div className="flex justify-start">
                <Image
                  src={e.cover}
                  width={70}
                  height={70}
                  className="rounded-sm aspect-square p-2"
                  alt="episode"
                />
                <span className="p-2">{e.name}</span>
                <span className="p-2">-</span>
                <span className="p-2">{e.slug}</span>
              </div>
              <div className="flex justify-end">
                <span
                  onClick={() => edithandler(e._id,e.name,e.slug,e.summary_episode,e.episode_number,e.season_number,e.airdate,e.cover)}
                  class="text-gray-400 hover:text-gray-100  mx-2 cursor-pointer"
                >
                  <LuPen />
                  <small>ویرایش</small>
                </span>
                <span
                  onClick={() => deletehandler(e._id)}
                  class="text-gray-400 hover:text-gray-100  ml-2 cursor-pointer"
                >
                  <LuTrash />
                  <small>حذف</small>
                </span>
              </div>
            </div>
          ))
        )}
      </div>

    

    </div>
  );
};

export default Episode;
