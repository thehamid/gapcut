"use client";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axios from "axios";
import Editor from '@/components/formElement/custom-editor'
import ImageUpload from '@/components/formElement/imageupload'



const NewPerson = () => {
  const [content, setContent] = useState("");
  const [img, setImage] = useState();
  const router = useRouter();
  const nameRef = useRef();
  const birthRef = useRef();
  const socialRef = useRef();
  const slugRef = useRef();

  //get category
  const [cats,setCats] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/dashboard/persons/category/");
      const data = await response.json();
      setCats(data);        
    }
    fetchData();
  }, []);
  const [checkcats,setCheckCats] = useState([]);
  const catSelect = (e) => {
    let myCats = [...checkcats]
    if (e.target.checked) {
      myCats = [...checkcats,e.target.value]
    } else {
      myCats.splice(cats.indexOf(e.target.value),1)
    }  
    setCheckCats(myCats)
  }



    //upload Image
    const  uploadImage = (props) => {
      const data= new FormData()
      data.append('file', props)
      
      axios
        .post("/api/upload", data)
        .then(
          (d) => {
            setImage(d.data.data)
          }
        )
        .catch((e) => console.log(e.response));
    }


  //Save Person
  const SendArticle = async (e) => {
    e.preventDefault();
    let finalSlug = slugRef.current.value == "" ? nameRef.current.value : slugRef.current.value
    finalSlug = finalSlug.replace(/\s+/g, '-').toLowerCase()
    const pic={img}
    const formData = {
      name: nameRef.current.value,
      birthday:birthRef.current.value,
      bio: content,
      cats:checkcats,
      social: socialRef.current.value,
      slug:finalSlug,
      imgPerson: pic.img == "" ? '/image/avatr-holder.jpg' : pic.img,
    };

    const response = await fetch(`/api/dashboard/persons`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseData = await response.json();
    if (response.status === 200) {
      toast.success("شخص جدید ذخیره شد");
      router.push("/dashboard/persons");
    } else if(response.status === 402) {
      toast.error(responseData.data);
    } else if(response.status === 500) {
      toast.error("شخص ذخیره نشد! خطایی وجود دارد.");
    }
  
    
    
  };

  return (
    <div>
      <h2 className="mb-4 text-xl border-b-[1px] border-zinc-600">شخص جدید</h2>
      <div className="py-1">
        <div className="main max-w-7xl mx-auto sm:px-1 lg:px-1">
          <div className="bg-zinc-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-zinc-800 ">
              <form onSubmit={SendArticle}>
                <div className="grid grid-rows-3 grid-flow-col gap-4">
                  {/* main */}
                  <div className="col-span-2 pt-4">
                    <div className="mb-4">
                      <label className="text-sm">
                        نام شخص <span className="text-red-500">*</span>
                      </label>
                      <input
                        ref={nameRef}
                        type="text"
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md"
                        name="name"
                      />
                    </div>
                    <div className="mb-8">
                      <label className="text-sm">بیوگرافی</label>
                      <Editor valueEditor={ setContent} defaultValue={content} />
                    </div>
                  </div>

                  {/* sidebar */}
                  <div className="row-span-3 bg-zinc-700 p-4 rounded-md">
                    <div className="flex p-1">
                      <button
                        type="submit"
                        className=" w-full p-3 text-white bg-red-600 rounded-md hover:bg-red-800 focus:outline-none focus:bg-red-600"
                      >
                        ذخیره و انتشار
                      </button>
                    </div>

                    <div className="mb-4">
                      <label className="text-sm">تاریخ تولد</label>
                      <input
                        ref={birthRef}
                        type="text"
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md"
                        name="birthday"
                      />
                    </div>

                 

                    <div className="mb-4">
                      <label className="text-sm">دسته‌بندی</label>
                      <div className="flex flex-col justify-between border-[1px] border-gray-500 rounded-lg p-2 ">
                        {
                          cats.length<1 ? <small>دسته‌ای موجود نیست</small> :
                          cats.map((cat, index) => (
                            <div key={index} className="flex gap-2 text-sm">
                            <input value={cat._id} onChange={catSelect} className="p-2" type="checkbox" name={cat._id} id={cat._id} />
                            <label htmlFor={cat._id}>{cat.title}</label>
                            </div>
                          ))  
                        }
                     </div>
                    </div>

                    <div className="mb-4">
                      <label className="text-sm">نامک</label>
                      <input
                        ref={slugRef}
                        type="text"
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md"
                        name="excerpt"
                      />
                    </div>

                

                    <div className="mb-4">
                      <label className="text-sm">اینستاگرام</label>
                      <input
                        ref={socialRef}
                        type="text"
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md"
                        name="social"
                      />
                    </div>

                    <div className="mb-4">
                      <label className="text-sm">تصویر شخص</label>
                      <ImageUpload onInput={uploadImage} src='/images/avatar-holder.jpg'/>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPerson;
