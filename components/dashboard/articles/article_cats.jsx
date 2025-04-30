'use client'
import { useRef, useState, useEffect } from "react";
import { toast } from "react-toastify";
import Link from "next/link";
import { LuTrash, LuPen, LuEye } from "react-icons/lu";

const ArticleCategory = () => {
  const titleRef = useRef();
  const slugRef = useRef();

  const [cats, setCats] = useState([]);
  const [reload, setReload] = useState(false);
  const [edit, setEdit] = useState(false);
  const [id, setID] = useState();


  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/dashboard/articles/category/");

      const data = await response.json();
      setCats(data);
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
    };

    const response = await fetch(`/api/dashboard/articles/category`, {
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
    } else if(response.status === 402) {
      toast.error(responseData.data);
    } else if(response.status === 500) {
      toast.error("دسته ذخیره نشد! خطایی وجود دارد.");
    }


   
    };
    

      // Delete Cat
  const edithandler = (id,title,slug) => {
    setEdit(true);
    setID(id);
      titleRef.current.value = title;
      slugRef.current.value = slug;  
      
    
  };

     //Edit Category
  const EditCategory = async (e) => {
    e.preventDefault();
    const formData = {
      title: titleRef.current.value == "" ? undefined : titleRef.current.value,
      slug: slugRef.current.value == "" ? undefined : slugRef.current.value,
    };

    const response = await fetch(`/api/dashboard/articles/category/${id}`, {
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
    await fetch(`/api/dashboard/articles/category/${id}`, {
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

  return (
    <div>
      <h2 className="mb-4 text-xl border-b-[1px] border-zinc-600">
        {" "}
        دسته جدید
          </h2>
          {!edit ?
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
      :
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
}       
      <h2 className="mb-4 text-xl border-b-[1px] border-zinc-600">
        {" "}
        دسته‌بندی مطالب
      </h2>
      <div class="flex items-center justify-center">
        <div class="w-full col-span-12">
          <div class="overflow-auto lg:overflow-visible ">
            <table class="table w-full text-gray-400 border-separate space-y-6 text-sm">
              <thead class="bg-zinc-800 text-gray-300 text-center rounded-lg">
                <tr>
                  <th class="p-3">عنوان دسته</th>
                  <th class="p-3 ">نامک</th>
                  <th class="p-3 ">تعداد مطلب</th>
                  <th class="p-3 ">عملیات</th>
                </tr>
              </thead>
              <tbody>
                {cats.map((item, index) => (
                  <tr key={index} class="bg-zinc-800 text-center">
                    <td class="p-3">
                      <div class="font-bold text-white">{item.title}</div>
                    </td>
                    <td class="p-3">{item.slug}</td>
                    <td class="p-3">0</td>

                    <td class="p-3 flex justify-center">
                            <Link
                        href={`/articles/category/${item.slug}`}
                        class="text-gray-400 hover:text-gray-100 mr-2"
                      >
                                <LuEye />
                                <small>نمایش</small>
                      </Link>
                      <span
                         onClick={() => edithandler(item._id,item.title,item.slug)}
                        class="text-gray-400 hover:text-gray-100  mx-2 cursor-pointer"
                      >
                                <LuPen />
                                <small>ویرایش</small>
                      </span>
                      <span    
                        onClick={() => deletehandler(item._id)}
                        class="text-gray-400 hover:text-gray-100  ml-2 cursor-pointer"
                      >
                                <LuTrash/>
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

export default ArticleCategory;
