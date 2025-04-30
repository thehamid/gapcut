"use client";
import { useRef, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { LuPlus, LuMinus, LuTrash, LuPen } from "react-icons/lu";
import axios from "axios";

const Season = ({ media_id }) => {
  const nameRef = useRef();
  const premiereRef = useRef();
  const numberRef = useRef();
  const endDateRef = useRef();
  const [addSeason, setAddSeason] = useState(false);
  const [allSeason, setallSeason] = useState(-1);
  const [reload, setReload] = useState(false);
  const [edit, setEdit] = useState(false);
  const [id, setID] = useState();
  const [name, setName] = useState();
  const [number, setNumber] = useState();
  const [prDate, setprDate] = useState();
  const [eDate, setEDate] = useState();
  const [done, setDone] = useState(false);

  useEffect(() => {
    getData();
  }, [addSeason, reload]);
  //get
  async function getData() {
    await axios
      .get(`/api/dashboard/medias/seasons/${media_id}`)
      .then((d) => {
        setallSeason(d.data.data);
        setReload(false);
      })
      .catch((e) => {
        console.log(e.response);
        setallSeason(-2);
      });
  }

  //Save Cast
  const SendSeason = async () => {
    const formData = {
      media_id,
      name: nameRef.current.value,
      number: numberRef.current.value,
      premiereDate: premiereRef.current.value,
      endDate: endDateRef.current.value,
      completed: done,
    };
    const response = await fetch(`/api/dashboard/medias/seasons`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(formData);
    const responseData = await response.json();
    if (response.status === 200) {
      toast.success(" فصل جدیداضافه شد");
      togglePlus();
      setReload(true);
    } else if (response.status === 402) {
      toast.error(responseData.data);
    } else if (response.status === 500) {
      toast.error("خطایی وجود دارد.");
    }
  };

  const togglePlus = () => {
    setAddSeason((current) => !current);
  };

  const doneCheck = (e) => {
    if (e.target.checked) {
      setDone(true);
    } else {
      setDone(false);
    }
  };

  // Delete Season
  const deletehandler = async (id) => {
    await fetch(`/api/dashboard/medias/seasons/${id}`, {
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
    toast.warning("فصل حذف شد");
    setReload(true);
  };

  const edithandler = (id,name,number,pridate,endDate,comp) => {
    setEdit(true);
    setID(id);
    setName(name)
    setNumber(number)
    setprDate(pridate)
    setEDate(endDate)
    setDone(comp)

  };


  //Edit Cast
  const EditSeason = async (edid) => {
    if (!edit) {
      return;
    }

    const formData = {
      name: nameRef.current.value,
      number: numberRef.current.value,
      premiereDate: premiereRef.current.value,
      endDate: endDateRef.current.value,
      completed: done,
    };

    const response = await fetch(`/api/dashboard/medias/seasons/${edid}`, {
      method: "PUT",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();
    if (response.status === 200) {
      toast.success(" فصل ویرایش شد");
      setEdit(false);
      setReload(true);
    } else if (response.status === 402) {
      toast.error(responseData.data);
    } else if (response.status === 500) {
      toast.error("خطایی وجود دارد.");
    }
  };

  return (
    <div>
      <div className="flex flex-row justify-between">
        <label className="text-sm"> فصل‌ها </label>
        <span
          className="text-gray-400 hover:text-gray-100 p-1 cursor-pointer"
          onClick={togglePlus}
        >
          {addSeason ? <LuMinus /> : <LuPlus />}
        </span>
      </div>
      {!addSeason ? (
        ""
      ) : edit ? (
        ""
      ) : (
        <div className="plus-card">
          <div className="flex flex-row justify-between">
            <div className="flex flex-col">
              <div className="mb-4">
                <label className="text-sm">نام</label>
                <input
                  ref={nameRef}
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md"
                  name="name"
                />
              </div>
              <div className="mb-4">
                <label className="text-sm">شماره فصل</label>
                <input
                  ref={numberRef}
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md"
                  name="number"
                />
              </div>
            </div>
            <div className="text-sm ">
              <input
                onChange={doneCheck}
                className="ml-2"
                type="checkbox"
                name="completed"
              />
              <label htmlFor="completed">یایان یافته</label>
            </div>

            <div className="flex flex-col">
              <div className="mb-4">
                <label className="text-sm">تاریخ شروع پخش</label>
                <input
                  ref={premiereRef}
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md"
                  name="premiere"
                />
              </div>
              <div className="mb-4">
                <label className="text-sm">تاریخ پایان پخش</label>
                <input
                  ref={endDateRef}
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md"
                  name="endDate"
                />
              </div>
            </div>
          </div>

          <div class="col-span-4 mt-4">
            <button
              onClick={SendSeason}
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
          <div className="flex flex-row justify-between">
            <div className="flex flex-col">
              <div className="mb-4">
                <label className="text-sm">نام</label>
                <input
                    ref={nameRef}
                    defaultValue={name}
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md"
                  name="name"
                />
              </div>
              <div className="mb-4">
                <label className="text-sm">شماره فصل</label>
                  <input
                    ref={numberRef}
                    defaultValue={number}
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md"
                  name="number"
                />
              </div>
              </div>
              <div className="text-sm ">
                <input
                    defaultChecked={done}
                onChange={doneCheck}
                className="ml-2"
                type="checkbox"
                name="completed"
              />
              <label htmlFor="completed">یایان یافته</label>
            </div>

            <div className="flex flex-col">
              <div className="mb-4">
                <label className="text-sm">تاریخ شروع پخش</label>
                <input
                    ref={premiereRef}
                    defaultValue={prDate}
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md"
                  name="premiere"
                />
              </div>
              <div className="mb-4">
                <label className="text-sm">تاریخ پایان پخش</label>
                <input
                    ref={endDateRef}
                    defaultValue={eDate}
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md"
                  name="endDate"
                />
              </div>
            </div>
          </div>

          <div class="flex flex-ro gap-2 mt-4">
            <button
              onClick={() => EditSeason(id)}
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
        {allSeason == -1 ? (
          <p>Loading...</p>
        ) : allSeason == -2 ? (
          <p>Error...</p>
        ) : (
          allSeason.map((s, i) => (
            <div
              key={i}
              className="flex justify-between bg-zinc-800 p-4 w-full"
            >
              <div className="flex justify-start">
                <span className="p-2">{s.number}</span>
                <span className="p-2">-</span>
                <span className="p-2">{s.name}</span>
              </div>
              <div className="flex justify-end">
                <span
                  onClick={() => edithandler(s._id,s.name,s.number,s.premiereDate,s.endDate,s.completed)}
                  class="text-gray-400 hover:text-gray-100  mx-2 cursor-pointer"
                >
                  <LuPen />
                  <small>ویرایش</small>
                </span>
                <span
                  onClick={() => deletehandler(s._id)}
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

export default Season;
