"use client";
import { useRef, useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";
import axios from "axios";
import Editor from "@/components/formElement/custom-editor";
import ImageSelector from "@/components/formElement/image-selector";
import Casting from "@/components/dashboard/medias/components/casting";
import Photos from "@/components/dashboard/medias/components/photos";
import Season from "@/components/dashboard/medias/components/season";
import Episode from "@/components/dashboard/medias/components/episode";
import WatchLink from "@/components/dashboard/medias/components/watchlink";
import { LuXSquare } from "react-icons/lu";

const EditMedia = () => {
  const [oldData, setoldData] = useState(-1);
  const [content, setContent] = useState("");
  const [poster, setPoster] = useState();
  const [header, setHeader] = useState();
  const [mediaID, setMediaID] = useState();
  const titleRef = useRef();
  const yearProductRef = useRef();
  const premiereDateRef = useRef();
  const statusRef = useRef();
  const productionRef = useRef();
  const LinkRef = useRef();
  const runtimeRef = useRef();
  const scheduleRef = useRef();
  const instagramRef = useRef();
  const slugRef = useRef();
  const tagsRef = useRef();
  const tizerRef = useRef();

  //get media
  const params = useParams();
  const med_id = params.slug[1];

  useEffect(() => {
    getData();
  },[]);
  //get
  async function getData() {
    await axios
      .get(`/api/dashboard/medias/${med_id}`)
      .then((d) => {
        setoldData(d.data.data);
        setPoster(d.data.data.poster);
        setHeader(d.data.data.header);
        setCheckGenres(d.data.data.genre);
        setCheckNets(d.data.data.network);
        setCheckStates(d.data.data.state);
        setContent(d.data.data.summary);
        setTag(d.data.data.tags);
        setMediaID(d.data.data.media_id)
      })
      .catch((e) => {
        console.log(e.response);
        setoldData(-2);
      });
  }

  //get tags
  const [tag, setTag] = useState([]);
  const tagAdder = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      let tagList = [...tag];
      const data = tagsRef.current.value;
      if (data.length > 0) {
        tagList = [...tag, data.replace(/\s+/g, "_").toLowerCase()];
        setTag(tagList);
        setTagReloder(true);
      }
      tagsRef.current.value = "";
    }
  };
  //tag Remove
  const [tagreloder, setTagReloder] = useState(false);
  const tagRemover = (indexToRemove) => {
    tag.splice(indexToRemove, 1);
    setTag(tag);
    setTagReloder(true);
  };
  useEffect(() => {
    setTag(tag);
    setTagReloder(false);
  }, [tag,tagreloder]);

  //get genre
  const [genres, setGenre] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/dashboard/medias/genres/");
      const data = await response.json();
      setGenre(data);
    }
    fetchData();
  }, []);
  const [checkgenres, setCheckGenres] = useState([]);
  const catSelect = (e) => {
    let myCats = [...checkgenres];
    if (e.target.checked) {
      myCats = [...checkgenres, e.target.value];
    } else {
      myCats.splice(genres.indexOf(e.target.value), 1);
    }
    setCheckGenres(myCats);
  };

  //get network
  const [networks, setNet] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/dashboard/medias/networks/");
      const data = await response.json();
      setNet(data);
    }
    fetchData();
  }, []);
  const [checknets, setCheckNets] = useState([]);
  const netSelect = (e) => {
    let myCats = [...checknets];
    if (e.target.checked) {
      myCats = [...checknets, e.target.value];
    } else {
      myCats.splice(networks.indexOf(e.target.value), 1);
    }
    setCheckNets(myCats);
  };


 //get HomeStates
 const [homeStates, setHomeStates] = useState([]);
 useEffect(() => {
   async function fetchData() {
     const response = await fetch("/api/dashboard/medias/states/");
     const data = await response.json();
     setHomeStates(data);
   }
   fetchData();
 }, []);
 const [checkStates, setCheckStates] = useState([]);
 const stateSelect = (e) => {
   let myCats = [...checkStates];
   if (e.target.checked) {
     myCats = [...checkStates, e.target.value];
   } else {
     myCats.splice(homeStates.indexOf(e.target.value), 1);
   }
   setCheckStates(myCats);
   addtoState(e)
 };


  //Save Media
  const SendArticle = async (e) => {
    e.preventDefault();
    let finalSlug =
      slugRef.current.value == ""
        ? titleRef.current.value
        : slugRef.current.value;
    finalSlug = finalSlug.replace(/\s+/g, "-").toLowerCase();
    const imgPoster = { poster };
    const imgHeader = { header };
    const formData = {
      title: titleRef.current.value,
      summary: content,
      title: titleRef.current.value,
      yearProduct: yearProductRef.current.value,
      premiereDate: premiereDateRef.current.value,
      status: statusRef.current.value,
      production: productionRef.current.value,
      link: LinkRef.current.value,
      runtime: runtimeRef.current.value,
      schedule: scheduleRef.current.value,
      videoTizer:tizerRef.current.value,
      instagram: instagramRef.current.value,
      tags: tag,
      genre: checkgenres,
      network: checknets,
      state: checkStates,
      slug: finalSlug,
      poster:
        imgPoster.poster == "" ? "/image/avatr-holder.jpg" : imgPoster.poster,
      header:
        imgHeader.header == "" ? "/image/avatr-holder.jpg" : imgHeader.header,
    };

    
    const response = await fetch(`/api/dashboard/medias/${med_id}`, {
      method: "PUT",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseData = await response.json();
    if (response.status === 200) {
      toast.success("سریال به روز شد");
      // router.push("/dashboard/medias");
    } else if (response.status === 402) {
      toast.error(responseData.data);
    } else if (response.status === 500) {
      toast.error("تغییرات ذخیره نشد! خطایی وجود دارد.");
    }
  };


 //Save List
 const addtoState = async (e) => {

  const formData = {
    media_id: med_id,
   };
   
   const id = e.target.value;

  const response = await fetch(`/api/dashboard/medias/states/${id}`, {
    method: "PUT",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const responseData = await response.json();
  if (response.status === 200) {
      toast.success("  جایگاه آپدیت شد");
  } else if (response.status === 402) {
    toast.error(responseData.data);
  } else if (response.status === 500) {
    toast.error("خطایی وجود دارد.");
  }
};




  return (
    <div>
      <h2 className="mb-4 text-xl border-b-[1px] border-zinc-600">
        ویرایش سریال
      </h2>
      {oldData == -1 ? (
        <p>Loading...</p>
      ) : oldData == -2 ? (
        <p>Error...</p>
      ) : (
        <div className="py-1">
          <div className="main max-w-7xl mx-auto sm:px-1 lg:px-1">
            <div className="bg-zinc-800 overflow-hidden shadow-sm sm:rounded-lg">
              <div className="p-6 bg-zinc-800 ">
                <form onSubmit={SendArticle}>
                  <div className="grid grid-rows-3 grid-flow-col gap-4">
                    {/* main */}
                    <div className="col-span-2 pt-4 md:max-w-[700px]">
                      <div className="mb-4">
                        <label className="text-sm">
                          عنوان مدیا <span className="text-red-500">*</span>
                        </label>
                        <input
                          ref={titleRef}
                          defaultValue={oldData.title}
                          type="text"
                          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md"
                          name="title"
                        />
                      </div>
                      <div className="mb-8">
                        <label className="text-sm">خلاصه داستان</label>
                        <Editor
                          valueEditor={setContent}
                          defaultValue={content}
                        />
                      </div>
                    </div>

                        <div class="row-span-2 col-span-2 md:max-w-[700px] ">
                        <div className="flex flex-col gap-1 bg-zinc-700 p-4 mb-3 rounded-md ">
                        <Episode media_id={mediaID} />
                      </div>


                      <div className="flex flex-col gap-1 bg-zinc-700 p-4 mb-3 rounded-md ">
                      <Season media_id={mediaID} />
                      </div>
                    
                      <div className="flex flex-col gap-1 bg-zinc-700 p-4 mb-3 rounded-md ">
                            {/* photos */}
                      <Photos media_id={med_id} episode_id={0} />
                      </div>
                     
                          <div className="flex flex-col gap-1 bg-zinc-700 p-4 mb-3 rounded-md ">
                            {/* casting */}
                        <Casting media_id={med_id} />
                      </div>

                      <div className="flex flex-col gap-1 bg-zinc-700 p-4 mb-3 rounded-md ">
                            {/* WatchLink */}
                        <WatchLink media_id={med_id} />
                      </div>


                    </div>

                    {/* sidebar */}
                    <div className="row-span-3 bg-zinc-700 p-4 rounded-md md:max-w-72">
                      <div className="flex p-1">
                        <button
                          type="submit"
                          className=" w-full p-3 text-white bg-red-600 rounded-md hover:bg-red-800 focus:outline-none focus:bg-red-600"
                        >
                          ذخیره و انتشار
                        </button>
                      </div>

                      <div className="mb-4">
                        <label className="text-sm">سال تولید</label>
                        <input
                          ref={yearProductRef}
                          defaultValue={oldData.yearProduct}
                          type="text"
                          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md"
                          name="yearProduct"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="text-sm">تاریخ پخش</label>
                        <input
                          ref={premiereDateRef}
                          defaultValue={oldData.premiereDate}
                          type="text"
                          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md"
                          name="premiereDate"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="text-sm">وضعیت</label>
                        <input
                          ref={statusRef}
                          defaultValue={oldData.status}
                          type="text"
                          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md"
                          name="statusDate"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="text-sm">تولید کننده</label>
                        <input
                          ref={productionRef}
                          defaultValue={oldData.production}
                          type="text"
                          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md"
                          name="production"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="text-sm">سایت رسمی</label>
                        <input
                          ref={LinkRef}
                          defaultValue={oldData.link}
                          type="text"
                          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md"
                          name="Link"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="text-sm">مدت زمان</label>
                        <input
                          ref={runtimeRef}
                          defaultValue={oldData.runtime}
                          type="text"
                          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md"
                          name="runtime"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="text-sm">
                          زمان نمایش (روز و ساعت)
                        </label>
                        <input
                          ref={scheduleRef}
                          defaultValue={oldData.schedule}
                          type="text"
                          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md"
                          name="schedule"
                        />
                      </div>

                      <div className="mb-4">
                        <label className="text-sm">اینستاگرام</label>
                        <input
                          ref={instagramRef}
                          defaultValue={oldData.instagram}
                          type="text"
                          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md"
                          name="instagram"
                        />
                      </div>
                 
                      <div className="mb-4">
                        <label className="text-sm">لینک تیزر</label>
                        <input
                          ref={tizerRef}
                          defaultValue={oldData.videoTizer}
                          type="text"
                          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md"
                          name="tizerLink"
                        />
                      </div>

                      <div className="mb-4">
                        <label className="text-sm">نامک</label>
                        <input
                          ref={slugRef}
                          defaultValue={oldData.slug}
                          type="text"
                          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md"
                          name="excerpt"
                        />
                      </div>

                      <div className="mb-4">
                        <label className="text-sm">برچسب </label>
                        <input
                          placeholder="بعد از وارد کردن هر کلمه اینتر بزنید"
                          ref={tagsRef}
                          type="text"
                          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md"
                          name="tag"
                          onKeyDown={tagAdder}
                        />
                        <div className="flex gap-2 flex-wrap justify-start mt-2">
                          {tag.map((t, index) => {
                            return (
                              <div
                                key={index}
                                className="text-sm flex gap-1 border-[1px]  border-gray-500 rounded-md p-1 "
                              >
                                <i
                                  className="flex gap-1 cursor-pointer"
                                  onClick={() => {
                                    tagRemover(index);
                                  }}
                                >
                                  <span>{t}</span>
                                  <LuXSquare />
                                </i>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <div className="mb-4">
                        <label className="text-sm">ژانر</label>
                        <div className="flex flex-col justify-between border-[1px] border-gray-500 rounded-lg p-2 ">
                          {genres.length < 1 ? (
                            <small>دسته‌ای موجود نیست</small>
                          ) : (
                            genres.map((cat, index) => (
                              <div key={index} className="flex gap-2 text-sm">
                                <input
                                  defaultChecked={checkgenres.includes(cat._id)}
                                  value={cat._id}
                                  onChange={catSelect}
                                  className="p-2"
                                  type="checkbox"
                                  name={cat._id}
                                  id={cat._id}
                                />
                                <label htmlFor={cat._id}>{cat.title}</label>
                              </div>
                            ))
                          )}
                        </div>
                      </div>

                      <div className="mb-4">
                        <label className="text-sm">شبکه نمایش</label>
                        <div className="flex flex-col justify-between border-[1px] border-gray-500 rounded-lg p-2 ">
                          {networks.length < 1 ? (
                            <small>دسته‌ای موجود نیست</small>
                          ) : (
                            networks.map((cat, index) => (
                              <div key={index} className="flex gap-2 text-sm">
                                <input
                                  defaultChecked={checknets.includes(cat._id)}
                                  value={cat._id}
                                  onChange={netSelect}
                                  className="p-2"
                                  type="checkbox"
                                  name={cat._id}
                                  id={cat._id}
                                />
                                <label htmlFor={cat._id}>{cat.title}</label>
                              </div>
                            ))
                          )}
                        </div>
                      </div>

                      <div className="mb-4">
                        <label className="text-sm">جایگاه صفحه اصلی</label>
                        <div className="flex flex-col justify-between border-[1px] border-gray-500 rounded-lg p-2 ">
                          {homeStates.length < 1 ? (
                            <small>دسته‌ای موجود نیست</small>
                          ) : (
                            homeStates.map((cat, index) => (
                              <div key={index} className="flex gap-2 text-sm">
                                <input
                                  defaultChecked={checkStates.includes(cat._id)}
                                  value={cat._id}
                                  onChange={stateSelect}
                                  className="p-2"
                                  type="checkbox"
                                  name={cat._id}
                                  id={cat._id}
                                />
                                <label htmlFor={cat._id}>{cat.title}</label>
                              </div>
                            ))
                          )}
                        </div>
                      </div>   



                      <div className="mb-4">
                        <label className="text-sm">پوستر</label>
                        <ImageSelector saveImage={setPoster} src={poster} />
                      </div>
                      <div className="mb-4">
                        <label className="text-sm">سربرگ</label>
                        <ImageSelector saveImage={setHeader} src={header} />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditMedia;
