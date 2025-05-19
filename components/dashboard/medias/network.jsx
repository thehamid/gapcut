"use client";
import { useRef, useState, useEffect } from "react";
import { toast } from "react-toastify";
import Link from "next/link";
import { LuTrash, LuPen, LuEye } from "react-icons/lu";
import ImageSelector from "@/components/formElement/image-selector";
import Image from "next/image";

const Network = () => {
  const titleRef = useRef();
  const slugRef = useRef();
  const colorRef = useRef();

  const [networks, setNetwork] = useState([]);
  const [reload, setReload] = useState(false);
  const [edit, setEdit] = useState(false);
  const [id, setID] = useState();
  const [selectedType, setSelectedType] = useState('');
  const [logo, setLogo] = useState('');

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/dashboard/medias/networks/");

      const data = await response.json();
      setNetwork(data);
      setReload(false);
    }
    fetchData();
  }, [reload]);

  //Save Category
  const SendCategory = async (e) => {
    e.preventDefault();
    const formData = {
      title: titleRef.current.value == "" ? undefined : titleRef.current.value,
      slug: slugRef.current.value == "" ? undefined : slugRef.current.value,
      type: selectedType,
      color: colorRef.current.value == "" ? undefined : colorRef.current.value,
      logo: logo == "" ? "/image/avatar-holder.jpg" : logo,
    };

    const response = await fetch(`/api/dashboard/medias/networks`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();
    if (response.status === 200) {
      toast.success("دسته جدید ذخیره شد");
      setReload(true);
      titleRef.current.value = "";
      slugRef.current.value = "";
      colorRef.current.value = "";
    } else if (response.status === 402) {
      toast.error(responseData.data);
    } else if (response.status === 500) {
      toast.error("دسته ذخیره نشد! خطایی وجود دارد.");
    }
  };

  // Delete Cat
  const edithandler = (id, title, slug , type,color,logo) => {
    setEdit(true);
    setID(id);
    titleRef.current.value = title;
    slugRef.current.value = slug;
    colorRef.current.value = color;
    setLogo(logo);
    setSelectedType(type);
  };

  //Edit Category
  const EditCategory = async (e) => {
    e.preventDefault();
    const formData = {
      title: titleRef.current.value == "" ? undefined : titleRef.current.value,
      slug: slugRef.current.value == "" ? undefined : slugRef.current.value,
      type: selectedType,
      color: colorRef.current.value == "" ? undefined : colorRef.current.value,
      logo: logo == "" ? "/image/avatar-holder.jpg" : logo,
    };

    const response = await fetch(`/api/dashboard/medias/networks/${id}`, {
      method: "PUT",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();
    console.log(responseData);
    toast.success("دسته ویرایش شد");
    setReload(true);
    setEdit(false);
    titleRef.current.value = "";
    slugRef.current.value = "";
  };

  // Delete Cat
  const deletehandler = async (id) => {
    await fetch(`/api/dashboard/medias/networks/${id}`, {
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


  //radio buttons handler
  const handletypeChange = (event) => {
    setSelectedType(event.target.value);
  };



  return (
    <div>
      <h2 className="mb-4 text-xl border-b-[1px] border-zinc-600">
        {" "}
        دسته جدید
      </h2>
      {!edit ? (
        //add cat form
        <form onSubmit={SendCategory}>
          <div class="flex justify-center gap-1">
            <div class="col-span-4 pt-4">
              <div class="mb-4">
                <label class="text-sm">
                  عنوان <span class="text-red-500">*</span>
                </label>
                <input
                  ref={titleRef}
                  type="text"
                  class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md"
                  name="title"
                />
              </div>
            </div>
            <div class="col-span-4 pt-4">
              <div class="mb-4">
                <label class="text-sm">
                  نامک <span class="text-red-500">*</span>
                </label>
                <input
                  ref={slugRef}
                  type="text"
                  class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md"
                  name="slug"
                />
              </div>
            </div>
            <div class="col-span-4 pt-4">
              <div class="mb-4">
                <label class="text-sm">
                  نوع خدمات
                </label>
                <div className="flex flex-col gap-2">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio h-5 w-5 text-red-600"
                      name="radio-group"
                      value="free"
                      checked={selectedType === 'free'}
                      onChange={handletypeChange}
                    />
                    <span className="ml-2 text-sm text-gray-300">رایگان</span>
                  </label>

                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio h-5 w-5 text-red-600"
                      name="radio-group"
                      value="subscription"
                      checked={selectedType === 'subscription'}
                      onChange={handletypeChange}
                    />
                    <span className="ml-2 text-sm text-gray-300">اشتراکی</span>
                  </label>
                </div>
              </div>
            </div>
            <div class="col-span-4 pt-4">
              <div class="mb-4">
                <label class="text-sm">
                  رنگ سازمانی
                </label>
                <input
                  ref={colorRef}
                  placeholder="bg-zinc-600"
                  type="text"
                  class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md"
                  name="slug"
                />
              </div>
            </div>
            <div class="col-span-4 pt-4">
              <div className="mb-4 max-w-16">
                <label className="text-sm">لوگو</label>
                <ImageSelector saveImage={setLogo} src={logo} />
              </div>
            </div>
            <div class="col-span-4 mt-12">
              <button
                type="submit"
                class=" w-full px-4 py-2  text-white bg-red-600 rounded-md hover:bg-red-800 focus:outline-none focus:bg-red-600"
              >
                ایجاد دسته
              </button>
            </div>
          </div>
        </form>
      ) : (
        //edit cat form
        <form onSubmit={EditCategory}>
          <div class="flex justify-center gap-1">
            <div class="col-span-4 pt-4">
              <div class="mb-4">
                <label class="text-sm">
                  عنوان <span class="text-red-500">*</span>
                </label>
                <input
                  ref={titleRef}
                  type="text"
                  class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md"
                  name="title"
                />
              </div>
            </div>
            <div class="col-span-4 pt-4">
              <div class="mb-4">
                <label class="text-sm">
                  نامک <span class="text-red-500">*</span>
                </label>
                <input
                  ref={slugRef}
                  type="text"
                  class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md"
                  name="slug"
                />
              </div>
            </div>
                   <div class="col-span-4 pt-4">
              <div class="mb-4">
                <label class="text-sm">
                  نوع خدمات
                </label>
                <div className="flex flex-col gap-2">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio h-5 w-5 text-red-600"
                      name="radio-group"
                      value="free"
                      checked={selectedType === 'free'}
                      onChange={handletypeChange}
                    />
                    <span className="ml-2 text-sm text-gray-300">رایگان</span>
                  </label>

                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio h-5 w-5 text-red-600"
                      name="radio-group"
                      value="subscription"
                      checked={selectedType === 'subscription'}
                      onChange={handletypeChange}
                    />
                    <span className="ml-2 text-sm text-gray-300">اشتراکی</span>
                  </label>
                </div>
              </div>
            </div>
            <div class="col-span-4 pt-4">
              <div class="mb-4">
                <label class="text-sm">
                  رنگ سازمانی
                </label>
                <input
                  ref={colorRef}
                  type="text"
                  class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md"
                  name="slug"
                />
              </div>
            </div>
            <div class="col-span-4 pt-4">
              <div className="mb-4 max-w-16">
                <label className="text-sm">لوگو</label>
                <ImageSelector saveImage={setLogo} src={logo} />
              </div>
            </div>
            <div class="col-span-4 mt-12">
              <button
                type="submit"
                class=" w-full px-4 py-2  text-red-600 bg-gray-200 rounded-md hover:bg-gray-400 focus:outline-none focus:bg-gray-300"
              >
                ویرایش دسته
              </button>
            </div>
            <div class="col-span-4 mt-14">
              <span
                onClick={() => setEdit(false)}
                class=" w-full px-4 py-1 cursor-pointer  text-gray-300 bg-gray-600 rounded-md hover:bg-gray-400 focus:outline-none focus:bg-gray-300"
              >
                انصراف
              </span>
            </div>
          </div>
        </form>
      )}
      <h2 className="mb-4 text-xl border-b-[1px] border-zinc-600">
        دسته‌بندی شبکه‌های نمایش
      </h2>
      <div class="flex items-center justify-center">
        <div class="w-full col-span-12">
          <div class="overflow-auto lg:overflow-visible ">
            <table class="table w-full text-gray-400 border-separate space-y-6 text-sm">
              <thead class="bg-zinc-800 text-gray-300 text-center rounded-lg">
                <tr>
                  <th class="p-3">عنوان دسته</th>
                  <th class="p-3 ">نامک</th>
                  <th class="p-3 "> نوع/ رنگ</th>
                  <th class="p-3 ">تعداد مدیا</th>
                  <th class="p-3 ">عملیات</th>
                </tr>
              </thead>
              <tbody>
                {networks.map((item, index) => (
                  <tr key={index} class="bg-zinc-800 text-center">
                    <td class=" flex items-center gap-3 p-3">
                      <Image src={item.logo || "/images/avatar-holder.jpg"} alt={item.title} width={50} height={50} />
                      <div class="font-bold text-white">{item.title}</div>
                    </td>
                    <td class="p-3">{item.slug}</td>
                    <td class="p-3">
                      <span
                        className={`text-xs px-2 py-0.5 text-white rounded-full ${item.color || "bg-zinc-600"}`}
                      >
                        {item.type}
                      </span>

                    </td>


                    <td class="p-3">0</td>
                    <td class="p-3 flex justify-center">
                      <Link
                        href={`/media/networks/${item.slug}`}
                        class="text-gray-400 hover:text-gray-100 mr-2"
                      >
                        <LuEye />
                        <small>نمایش</small>
                      </Link>
                      <span
                        onClick={() =>
                          edithandler(item._id, item.title, item.slug , item.type, item.color, item.logo)
                        }
                        class="text-gray-400 hover:text-gray-100  mx-2 cursor-pointer"
                      >
                        <LuPen />
                        <small>ویرایش</small>
                      </span>
                      <span
                        onClick={() => deletehandler(item._id)}
                        class="text-gray-400 hover:text-gray-100  ml-2 cursor-pointer"
                      >
                        <LuTrash />
                        <small>حذف</small>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Network;
