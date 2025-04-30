"use client";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axios from "axios";
import Editor from '@/components/formElement/custom-editor'
import ImageUpload from '@/components/formElement/imageupload'
import { LuXSquare } from "react-icons/lu";
import Cookies from 'js-cookie'


const NewArticle = () => {
  const [content, setContent] = useState("");
  const [img, setImage] = useState();
  const router = useRouter();
  const date = new Date();
  const titleRef = useRef();
  const excerptRef = useRef();
  const tagsRef = useRef();
  const sourceRef = useRef();
  const slugRef = useRef();

  //get category
  const [cats,setCats] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/dashboard/articles/category/");
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

  //get tags
  const [tag, setTag] = useState([])
  const tagAdder = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      let tagList = [...tag]
      const data = tagsRef.current.value
      if (data.length > 0) {
        tagList = [...tag, data.replace(/\s+/g, '_').toLowerCase()]
        setTag(tagList)
        setTagReloder(true)
      }
      tagsRef.current.value=""
    }
  }
  //tag Remove
  const [tagreloder, setTagReloder] = useState(false)
  const tagRemover = (indexToRemove) => {
    tag.splice(indexToRemove, 1)
    setTag(tag)
    setTagReloder(true)
  }
  useEffect(() => {
    setTag(tag)
    setTagReloder(false)
  },[tagreloder,tag])



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


  //Save Article
  const SendArticle = async (e) => {
    e.preventDefault();
    let finalSlug = slugRef.current.value == "" ? titleRef.current.value : slugRef.current.value
    finalSlug = finalSlug.replace(/\s+/g, '-').toLowerCase()
    const pic={img}
    const formData = {
      title: titleRef.current.value,
      excerpt:excerptRef.current.value,
      content: content,
      tags:tag,
      cats:checkcats,
      author:Cookies.get("token_id"),
      source: sourceRef.current.value,
      slug:finalSlug,
      imgArticle: pic.img == "" ? '/image/avatr-holder.jpg' : pic.img,
      createdAt: date.toLocaleDateString("fa-IR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    };

    const response = await fetch(`/api/dashboard/articles`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseData = await response.json();
    if (response.status === 200) {
      toast.success("مطلب جدید ذخیره شد");
      router.push("/dashboard/articles");
    } else if(response.status === 402) {
      toast.error(responseData.data);
    } else if(response.status === 500) {
      toast.error("مطلب ذخیره نشد! خطایی وجود دارد.");
    }
  
    
    
  };

  return (
    <div>
      <h2 className="mb-4 text-xl border-b-[1px] border-zinc-600">مطلب جدید</h2>
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
                        عنوان <span className="text-red-500">*</span>
                      </label>
                      <input
                        ref={titleRef}
                        type="text"
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md"
                        name="title"
                      />
                    </div>
                    <div className="mb-8">
                      <label className="text-sm">متن اصلی</label>
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
                      <label className="text-sm">چکیده</label>
                      <input
                        ref={excerptRef}
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
                            <div key={index} className="text-sm flex gap-1 border-[1px]  border-gray-500 rounded-md p-1 ">
                              <i className="flex gap-1 cursor-pointer" onClick={()=>{tagRemover(index)}}>
                                <span>{t}</span>
                                <LuXSquare/>
                              </i>
                              </div>
                            )
                          })}
                      </div>
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
                      <label className="text-sm">منبع</label>
                      <input
                        ref={sourceRef}
                        type="text"
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md"
                        name="excerpt"
                      />
                    </div>

                    <div className="mb-4">
                      <label className="text-sm">تصویر شاخص</label>
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

export default NewArticle;
