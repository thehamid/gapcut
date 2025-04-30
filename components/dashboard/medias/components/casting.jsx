"use client";
import { useRef, useState, useEffect } from "react";
import { toast } from "react-toastify";
import ImageSelector from "@/components/formElement/image-selector";
import { LuPlus, LuMinus, LuTrash, LuPen } from "react-icons/lu";
import axios from "axios";
import Image from "next/image";
import dynamic from 'next/dynamic'

const PersonSearchBar = dynamic(() => import("@/components/dashboard/persons/personsearchbar"), { ssr: false });

const Casting = ({ media_id }) => {
  const roleRef = useRef();
  const positionRef = useRef();
  const catRef = useRef();
  const [collabs, setCollabs] = useState("");
  const [thumbCast, setthumbCast] = useState("");
  const [addCast, setAddCast] = useState(false);
  const [allCast, setallCast] = useState(-1);
  const [reload, setReload] = useState(false);
  const [edit, setEdit] = useState(false);
  const [id, setID] = useState();
  const [role_value, setRoleValue] = useState(-1);
  const [pos_value, setPosValue] = useState(-1);
  const [cat_value, setCatValue] = useState(-1);

  useEffect(() => {
    getData();
  }, [addCast, reload]);
  //get
  async function getData() {
    await axios
      .get(`/api/dashboard/medias/casts/${media_id}`)
      .then((d) => {
        setallCast(d.data.data);
        setReload(false);
      })
      .catch((e) => {
        console.log(e.response);
        setallCast(-2);
      });
  }

  //Save Cast
  const SendCast = async () => {
    const formData = {
      media_id: media_id,
      person_id: collabs._id,
      role_name: roleRef.current.value,
      position: positionRef.current.value,
      person_cat: catRef.current.value,
      thumb: thumbCast == "" ? "/image/avatr-holder.jpg" : thumbCast,
    };
    const response = await fetch(`/api/dashboard/medias/casts`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();
    if (response.status === 200) {
      toast.success(" به عوامل اضافه شد");
      togglePlus();
      setReload(true);
    } else if (response.status === 402) {
      toast.error(responseData.data);
    } else if (response.status === 500) {
      toast.error("خطایی وجود دارد.");
    }
  };

  const togglePlus = () => {
    setAddCast((current) => !current);
  };

  // Delete Cat
  const deletehandler = async (id) => {
    await fetch(`/api/dashboard/medias/casts/${id}`, {
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

  const edithandler = (id, role, pos, cat, person_id, thumb) => {
    setEdit(true);
    setID(id);
    setRoleValue(role);
    setPosValue(pos);
    setCatValue(cat);
    setCollabs(person_id);
    setthumbCast(thumb);
  };
  useEffect(() => {
    setCollabs(collabs);
    setthumbCast(thumbCast);
  }, [collabs,thumbCast,edit]);

  //Edit Cast
  const EditCast = async (edid) => {
    if (!edit) {
      return;
    }

    const formData = {
      media_id: media_id,
      person_id: collabs._id,
      role_name: roleRef.current.value,
      position: positionRef.current.value,
      person_cat: catRef.current.value,
      thumb: thumbCast == "" ? "/image/avatr-holder.jpg" : thumbCast,
    };

    const response = await fetch(`/api/dashboard/medias/casts/${edid}`, {
      method: "PUT",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();
    if (response.status === 200) {
      toast.success(" به عوامل اضافه شد");
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
        <label className="text-sm"> بازیگر و عوامل</label>
        <span
          className="text-gray-400 hover:text-gray-100 p-1 cursor-pointer"
          onClick={togglePlus}
        >
          {addCast ? <LuMinus /> : <LuPlus />}
        </span>
      </div>
      {!addCast ? (
        ""
      ) : edit ? (
        ""
      ) : (
        <div className="plus-card">
          <div className="mb-4">
            <label className="text-sm">جستجو در اشخاص</label>
            <PersonSearchBar setCollabs={setCollabs} />
          </div>
          <div className="mb-4 flex flex-row justify-between">
            <label className="text-sm"> {collabs.name} </label>
            <label className="text-sm"> {collabs._id}</label>
          </div>
          <div class="grid grid-rows-3 grid-flow-col gap-4">
            <div class="row-span-3 ">
              <div className="mb-4">
                <label className="text-sm">تصویر شخص</label>
                <ImageSelector saveImage={setthumbCast} src={thumbCast} />
              </div>
            </div>
            <div class="col-span-2 ">
              <div className="mb-4">
                <label className="text-sm">نقش شخص</label>
                <input
                  ref={roleRef}
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md"
                  name="role"
                />
              </div>
            </div>
            <div class="row-span-2 col-span-2 ">
              <div className="flex flex-row">
                <div className="p-1">
                  <label className="text-sm">موقعیت</label>
                  <input
                    ref={positionRef}
                    type="text"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md"
                    name="position"
                  />
                </div>
                <div className="p-1">
                  <label className="text-sm">سمت</label>
                  <input
                    ref={catRef}
                    type="text"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md"
                    name="person_cat"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="col-span-4 mt-4">
            <button
              onClick={SendCast}
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
          <div className="mb-4">
            <label className="text-sm">جستجو در اشخاص</label>
            <PersonSearchBar setCollabs={setCollabs} />
          </div>
          <div className="mb-4 flex flex-row justify-between">
            <label className="text-sm"> {collabs.name} </label>
            <label className="text-sm"> {collabs._id}</label>
          </div>
          <div className="flex flrx-row">
            <div className="ml-3">
              <div className="mb-4">
                <label className="text-sm">تصویر شخص</label>
                <ImageSelector saveImage={setthumbCast} src={thumbCast} />
              </div>
            </div>
            <div className="flex-1">
              <div className="mb-4">
                <label className="text-sm">نقش شخص</label>
                <input
                  ref={roleRef}
                  defaultValue={role_value}
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md"
                  name="role"
                />
              </div>
              <div className="mb-4">
                <div className="flex flex-row">
                  <div className="p-1">
                    <label className="text-sm">موقعیت</label>
                    <input
                      ref={positionRef}
                      defaultValue={pos_value}
                      type="text"
                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md"
                      name="position"
                    />
                  </div>
                  <div className="p-1">
                    <label className="text-sm">سمت</label>
                    <input
                      ref={catRef}
                      defaultValue={cat_value}
                      type="text"
                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md"
                      name="person_cat"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

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
        {allCast == -1 ? (
          <p>Loading...</p>
        ) : allCast == -2 ? (
          <p>Error...</p>
        ) : (
          allCast.map((c, i) => (
            <div
              key={i}
              className="flex justify-between bg-zinc-800 p-4 w-full"
            >
              <div className="flex justify-start">
                <Image
                  src={c.thumb}
                  width={70}
                  height={70}
                  className="rounded-sm aspect-square p-2"
                  alt={c.person_id.name}
                />
                <span className="p-2">{c.person_id.name}</span>
                <span className="p-2">-</span>
                <span className="p-2">{c.role_name}</span>
              </div>
              <div className="flex justify-end">
                <span
                  onClick={() =>
                    edithandler(
                      c._id,
                      c.role_name,
                      c.position,
                      c.person_cat,
                      c.person_id,
                      c.thumb
                    )
                  }
                  class="text-gray-400 hover:text-gray-100  mx-2 cursor-pointer"
                >
                  <LuPen />
                  <small>ویرایش</small>
                </span>
                <span
                  onClick={() => deletehandler(c._id)}
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

export default Casting;
