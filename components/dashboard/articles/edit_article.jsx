"use client";
import { useRef, useState, useEffect } from "react";
import { useRouter,useParams } from "next/navigation";
import { toast } from "react-toastify";
import axios from "axios";
import Editor from '@/components/formElement/custom-editor'
import ImageSelector from '@/components/formElement/image-selector'
import { LuXSquare } from "react-icons/lu";
import Cookies from 'js-cookie'


const EditArticle = (req) => {
  const [content, setContent] = useState('');
  const [img, setImage] = useState();
  const [thumb, setThumb] = useState();
  const [oldData, setoldData] = useState(-1);
  const router = useRouter();
  const date = new Date();
  const titleRef = useRef();
  const excerptRef = useRef();
  const tagsRef = useRef();
  const sourceRef = useRef();
    const slugRef = useRef();
    
   
   //get article
    const params = useParams()
   const article_id=params.slug[1]
  useEffect(() => {
    getData()
    
  }, [getData])
  //get 
  async function getData() {
    await axios
      .get(`/api/dashboard/articles/${article_id}`)
      .then(
        (d) => {
          setoldData(d.data.data)
          setThumb(d.data.data.imgArticle)
          setCheckCats(d.data.data.cats)
          setTag(d.data.data.tags)
          setContent(d.data.data.content)
        }
      )
      .catch((e) => {
        console.log(e.response)
        setoldData(-2)
      });
  
   
    }
    

    
   
    
    
    
    
    
    
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



  //Save Article
  const SendArticle = async (e) => {
    e.preventDefault();
    let finalSlug = slugRef.current.value == "" ? titleRef.current.value : slugRef.current.value
    finalSlug = finalSlug.replace(/\s+/g, '-').toLowerCase()
    const imgThumb = { thumb };
    const formData = {
      title: titleRef.current.value,
      excerpt:excerptRef.current.value,
      content: content,
      tags:tag,
      cats:checkcats,
      author:Cookies.get("token_id"),
      source: sourceRef.current.value,
      slug:finalSlug,
      imgArticle: imgThumb.thumb == "" ? "/image/avatr-holder.jpg" : imgThumb.thumb,
      createdAt: date.toLocaleDateString("fa-IR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    };

    const response = await fetch(`/api/dashboard/articles/${article_id}`, {
      method: "PUT",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseData = await response.json();
    if (response.status === 200) {
      toast.success("مطلب ویرایش شد");
      router.push("/dashboard/articles");
    } else if(response.status === 402) {
      toast.error(responseData.data);
    } else if(response.status === 500) {
      toast.error("مطلب ذخیره نشد! خطایی وجود دارد.");
    }
  
    
    
  };

  return (
    <div>
      <h2 className="mb-4 text-xl border-b-[1px] border-zinc-600">ویرایش مطلب</h2>
      {(oldData == -1) ? <p>Loading...</p> : (oldData == -2) ? <p>Error...</p> :
        <div class="py-1">
        <div class="main max-w-7xl mx-auto sm:px-1 lg:px-1">
          <div class="bg-zinc-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div class="p-6 bg-zinc-800 ">
              <form onSubmit={SendArticle}>
                <div class="grid grid-rows-3 grid-flow-col gap-4">
                  {/* main */}
                  <div class="col-span-2 pt-4">
                    <div class="mb-4">
                      <label class="text-sm">
                        عنوان <span class="text-red-500">*</span>
                      </label>
                      <input
                        ref={titleRef}
                        defaultValue={oldData.title}
                        type="text"
                        class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md"
                        name="title"
                      />
                    </div>
                    <div class="mb-8">
                      <label class="text-sm">متن اصلی</label>
                      <Editor valueEditor={setContent} defaultValue={content} />
                    </div>
                  </div>

                  {/* sidebar */}
                  <div class="row-span-3 bg-zinc-700 p-4 rounded-md">
                    <div class="flex p-1">
                      <button
                        type="submit"
                        class=" w-full p-3 text-white bg-red-600 rounded-md hover:bg-red-800 focus:outline-none focus:bg-red-600"
                      >
                        ذخیره و انتشار
                      </button>
                    </div>

                    <div class="mb-4">
                      <label class="text-sm">چکیده</label>
                      <input
                        ref={excerptRef}
                        defaultValue={oldData.excerpt}
                        type="text"
                        class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md"
                        name="excerpt"
                      />
                    </div>

                    <div class="mb-4">
                      <label class="text-sm">برچسب </label>
                      <input
                        placeholder="بعد از وارد کردن هر کلمه اینتر بزنید"
                        ref={tagsRef}
                        type="text"
                        class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md"
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

                    <div class="mb-4">
                      <label class="text-sm">دسته‌بندی</label>
                      <div className="flex flex-col justify-between border-[1px] border-gray-500 rounded-lg p-2 ">
                        {
                          cats.length<1 ? <small>دسته‌ای موجود نیست</small> :
                          cats.map((cat, index) => (
                            <div key={index} className="flex gap-2 text-sm">
                            <input defaultChecked={checkcats.includes(cat._id)} value={cat._id} onChange={catSelect} className="p-2" type="checkbox" name={cat._id} id={cat._id} />
                            <label htmlFor={cat._id}>{cat.title}</label>
                            </div>
                          ))  
                        }
                     </div>
                    </div>

                    <div class="mb-4">
                      <label class="text-sm">نامک</label>
                      <input
                        ref={slugRef}
                        defaultValue={oldData.slug}
                        type="text"
                        class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md"
                        name="excerpt"
                      />
                    </div>

                

                    <div class="mb-4">
                      <label class="text-sm">منبع</label>
                      <input
                        ref={sourceRef}
                        defaultValue={oldData.source}
                        type="text"
                        class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md"
                        name="excerpt"
                      />
                    </div>

                    <div class="mb-4">
                      <label class="text-sm">تصویر شاخص</label>
                      <ImageSelector saveImage={setThumb} src={thumb} />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
     }
      
    </div>
  );
};

export default EditArticle;
