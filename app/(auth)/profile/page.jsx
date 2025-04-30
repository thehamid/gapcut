"use client";
import { useState,useEffect,useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { redirect } from "next/navigation";
import { Tab } from "@headlessui/react";
import axios from "axios";
import { toast } from 'react-toastify';
import ImageUpload from '@/components/formElement/imageupload'
import { useDispatch,useSelector } from 'react-redux'
import { setAvatarValue } from "@/lib/redux/slices/user/avatarSlice";
import { useForm } from "react-hook-form";


function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Profile = () => {
  const [img, setImage] = useState();
  const [reload, setReload] = useState(false);
  const [userData,setUserData] = useState(-1);
  const dispatch=useDispatch()
  const avatar = useSelector(store => store.avatarSlice)
  const loged=useSelector(store=>store.logedSlice.value);
  const nameRef = useRef();
  const mobileRef = useRef();
  const bioRef = useRef();
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();
  const user_id = session?.user?.id;
 
  if (sessionStatus !== "authenticated") {
    router.replace("/login");
  }
 
  

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const newpassword = useRef({});
  newpassword.current = watch("newpassword", "");

  if (!loged) {  
    redirect("/login");
  }
 
  useEffect(() => {
    getData()
   
  }, [reload])


    //get userData from DB
    async function getData() {
        await axios
      .get(`/api/users/${user_id}`)
      .then(
        (d) => {
          setUserData(d.data.data)
          dispatch(setAvatarValue(d.data.data.avatar))
        }
      )
      .catch((e) => console.log(e.response));
 
  }

  //uploade Avatar
  const  uploadAvatar = (props) => {
    const data= new FormData()
    data.append('file', props)
    
    axios
      .post("/api/upload", data)
      .then(
        (d) => {
          setImage(d.data.data)
          toast.success("تصویر پروفایل آپلود شد");
        }
      )
      .catch((e) => console.log(e.response));
  }

  //update Setting User
  const updateSubmit = async (e) => {
    e.preventDefault();
    const pic={img}
    const formData = {
      name: nameRef.current.value == "" ? undefined : nameRef.current.value,
      mobile: mobileRef.current.value == "" ? undefined : mobileRef.current.value,
      bio: bioRef.current.value == "" ? undefined : bioRef.current.value,
      avatar: pic.img == "" ? undefined : pic.img,
   }
    
    dispatch(setAvatarValue(pic.img))
    const response = await fetch(`/api/users/${user_id}`, {
      method: "PUT",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();
    toast.success("اطلاعات ذخیره شد");
    setReload(true)
  };


  const changePassword = async (data) => {
    const reqBody = data;
    try {
      const res = await fetch(`/api/users/setting/${user_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqBody),
      });
      if (res.status === 400) {
        toast.error('ایمیل وارد شده وجود دارد')
      }
      if (res.status === 402) {
        toast.error('رمز فعلی صحیح نمی باشد')
      }
      if (res.status === 200) {
        toast.success('تغییر رمز با موفقیت انجام شد')
      }
    } catch (error) {
      toast.error('مشکلی وجود دارد، مجدد تلاش کنید')
    }
  };




  
  return (
    <div className="setting-page my-2 min-h-screen">
      <div className="xl:container mx-auto">
       
        <div className="w-full max-w-2xl mx-auto px-2 py-16 sm:px-0">
        <Tab.Group>
          <Tab.List className="flex space-x-1 rounded-xl bg-black text-white p-1">
            <Tab
              className={({ selected }) =>
                classNames(
                  "w-full  py-2.5 text-sm font-medium leading-5",
                  selected
                    ? "bg-black text-gray-50 border-b-2 border-red-600"
                    : "text-gray-400 hover:bg-white/[0.12] hover:text-white"
                )
              }
            >
              پروفایل
            </Tab>

            <Tab
              className={({ selected }) =>
                classNames(
                  "w-full  py-2.5 text-sm font-medium leading-5",
                  selected
                    ? "bg-black text-gray-50 border-b-2 border-red-600"
                    : "text-gray-400 hover:bg-white/[0.12] hover:text-white"
                )
              }
            >
              تنظیمات
            </Tab>

            {/* <Tab
              className={({ selected }) =>
                classNames(
                  "w-full  py-2.5 text-sm font-medium leading-5",
                  selected
                    ? "bg-black text-gray-50 border-b-2 border-red-600"
                    : "text-gray-400 hover:bg-white/[0.12] hover:text-white"
                )
              }
            >
              واچ لیست
            </Tab>
            <Tab
              className={({ selected }) =>
                classNames(
                  "w-full  py-2.5 text-sm font-medium leading-5",
                  selected
                    ? "bg-black text-gray-50 border-b-2 border-red-600"
                    : "text-gray-400 hover:bg-white/[0.12] hover:text-white"
                )
              }
            >
              فعالیت‌ها
            </Tab> */}
          </Tab.List>
          <Tab.Panels className="mt-2">
            {/* profile */}
              <Tab.Panel className="p-3">
              <div className="p-5 mt-4 bg-gray-800 rounded-xl ">
              <form className="mt-6" onSubmit={updateSubmit}>
                <div className="my-4 flex gap-6 sm:flex-row flex-col">
                 
                    <div className="relative flex flex-col items-center justify-center">
                      <ImageUpload onInput={uploadAvatar} src={avatar.value}/>
                    
                    </div>
                 
                  <div className="flex-1 space-y-3">
                    <div className="mb-4">
                      <label
                        htmlFor="name"
                        className="block text-sm font-semibold text-white text-right"
                      >
                        نام شما
                      </label>
                      <input
                        ref={nameRef}
                        type="text"
                        defaultValue={userData.name}
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="name"
                        className="block text-sm font-semibold text-white text-right"
                      >
                        شماره موبایل
                      </label>
                      <input
                        ref={mobileRef}
                        type="number"
                        defaultValue={userData.mobile}
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-white text-right"
                  >
                    بیوگرافی
                  </label>
                  <textarea
                    ref={bioRef}
                    placeholder="کمی درباره خودت بگو"
                    defaultValue={userData.bio}
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  ></textarea>
                </div>

                <div className="mt-2">
                  <button
                    type="submit"
                    className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-primary rounded-md "
                  >
                    ذخیره تغییرات
                  </button>
                </div>
                </form>
                </div>
            </Tab.Panel>

              <Tab.Panel className="p-3">
                {/* setting */}
                <div className="p-5 mt-4 bg-gray-800 rounded-xl ">
                  <h2 className="text-xl font-bold">تغییر رمز</h2>
                <form className="mt-6" onSubmit={handleSubmit(changePassword)}>
                <div className="mb-2 sm:mx-1">
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-white text-right"
                  >
                      رمز فعلی
                   </label>
                  <input
                    {...register("currentpassword", { required: true })}
                    type="password"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                  {errors.currentpassword?.type === "required" && (
                    <small>وارد کردن رمز فعلی الزامی است</small>
                  )}
                
                </div>

               
                <div className="mb-2 sm:mx-1">
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-white text-right"
                  >
                    رمز جدید
                  </label>
                  <input
                    {...register("newpassword", { required: true, minLength: 6 })}
                    type="password"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                  {errors.newpassword?.type === "required" && (
                    <small>وارد کردن رمز جدید الزامی است</small>
                  )}
                  {errors.newpassword?.type === "minLength" && (
                    <small role="alert">رمز باید حداقل 6 کاراکتر باشد</small>
                  )}
                </div>
                <div className="mb-2 sm:mx-1">
                  <label
                    htmlFor="confirmpassword"
                    className="block text-sm font-semibold text-white text-right"
                  >
                    تکرار رمز جدید
                  </label>
                  <input
                    {...register("confirmpassword", {
                      validate: (value) =>
                        value === newpassword.current ||
                        "The passwords do not match",
                    })}
                    type="password"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                  {errors.confirmpassword && (
                    <small>تکرار رمز صحیح نمی باشد</small>
                  )}
                </div>
                 
                  <div className="mt-5">
                  <button
                    type="submit"
                    className="px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-primary rounded-md"
                  >
                    تغییر رمز
                  </button>
                </div>
                </form>
                    </div>

            </Tab.Panel>
            {/* <Tab.Panel className="p-3">واچ لیست</Tab.Panel>
            <Tab.Panel className="p-3">فعالیت ها</Tab.Panel> */}
          </Tab.Panels>
        </Tab.Group>
        </div>
        
      
        </div>
    </div>
  );
};

export default Profile;

function callbackFn(link) {
  throw new Error("Function not implemented.");
}
