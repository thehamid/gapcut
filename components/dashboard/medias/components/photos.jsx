"use client";
import { useRef, useState, useEffect } from "react";
import { toast } from "react-toastify";
import ImageSelector from "@/components/formElement/image-selector";
import { LuPlus, LuMinus, LuBadgeX } from "react-icons/lu";
import axios from "axios";
import Image from "next/image";

const Photos = ({ media_id,episode_id }) => {
  const [urlPhoto, setUrlPhoto] = useState("");
  const [addPhoto, setAddPhoto] = useState(false);
  const [allPhoto, setallPhoto] = useState(-1);
  const [reload, setReload] = useState(false);


  useEffect(() => {
    getData();
  }, [addPhoto,reload]);
  //get
  async function getData() {
    await axios
      .get(`/api/dashboard/medias/photos/${media_id}/${episode_id}`)
      .then((d) => {
        setallPhoto(d.data.data);
        setReload(false)
      })
      .catch((e) => {
        console.log(e.response);
        setallPhoto(-2);
      });
  }

  //Save Photo
  const SendPhoto = async () => {
    const formData = {
      media_id,
      episode_id,
      url: urlPhoto == "" ? "/image/avatr-holder.jpg" : urlPhoto,
    };
    const response = await fetch('/api/dashboard/medias/photos', {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
      console.log(formData)
    const responseData = await response.json();
    if (response.status === 200) {
      toast.success(" تصویر اضافه شد");
      togglePlus()
      setReload(true)
    } else if (response.status === 402) {
      toast.error(responseData.data)
    } else if (response.status === 500) {
      toast.error("خطایی وجود دارد.")
    }
  };

  const togglePlus = () => {
    setAddPhoto((current) => !current);
  };



     
  // Delete Cat
  const deletehandler = async (id) => {
    await fetch(`/api/dashboard/medias/photos/${id}`, {
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
    toast.warning("تصویر حذف شد");  
    setReload(true);
  };



  return (
    <div>
      <div className="flex flex-row justify-between">
        <label className="text-sm"> تصاویر</label>
        <span className="text-gray-400 hover:text-gray-100 p-1 cursor-pointer" onClick={togglePlus}>
          {addPhoto ? <LuMinus /> : <LuPlus />}
        </span>
      </div>
      {!addPhoto ? ("") : (
        <div className="plus-card">     
          <div className="flex flrx-row justify-center">
            <div className="ml-3">
              <div className="mb-4 max-w-[50%]">
                <label className="text-sm">تصویر </label>
                <ImageSelector saveImage={setUrlPhoto} src={urlPhoto} />
              </div>
            </div>      
          </div>
          <div class="col-span-4 mt-4">
            <button
              onClick={SendPhoto}
              type="submit"
              class=" w-full px-4 py-2  text-gray-200 bg-red-500 rounded-md hover:bg-gray-400 focus:outline-none focus:bg-gray-300"
            >
              اضافه شدن
            </button>
          </div>
        </div>
      )}
 

      <div className="grid grid-cols-4 gap-4 mt-2">
        {allPhoto == -1 ? (
          <p>Loading...</p>
        ) : allPhoto == -2 ? (
          <p>Error...</p>
        ) : (
          allPhoto.map((p, i) => (
            <div
              key={i}
              className="flex bg-zinc-800 p-1"
            >
              <div className="p-1">
                <Image
                  src={p.url}
                  width={70}
                  height={70}
                  className="rounded-sm aspect-square"
                  alt="photo"
                />
             
              </div>
              <div className="mr-1">
                <span
                  onClick={() => deletehandler(p._id)}
                  class="text-gray-400 hover:text-gray-100  m-2 cursor-pointer"
                >
                  <LuBadgeX />
                </span>
              </div>
            </div>
          ))
        )}
      </div>

    

    </div>
  );
};

export default Photos;
