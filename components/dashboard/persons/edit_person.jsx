"use client";
import { useRef, useState, useEffect } from "react";
import { useRouter,useParams } from "next/navigation";
import { toast } from "react-toastify";
import axios from "axios";
import Editor from '@/components/formElement/custom-editor'
import ImageUpload from '@/components/formElement/imageupload'



const EditPerson = (req) => {
  const [content, setContent] = useState('');
  const [img, setImage] = useState();
  const [srcImg,setSrcImg] = useState();
  const [oldData, setoldData] = useState(-1);
  const router = useRouter();
  const nameRef = useRef();
  const birthRef = useRef();
  const socialRef = useRef();
    const slugRef = useRef();
    
   
   //get article
    const params = useParams()
   const person_id=params.slug[1]
  useEffect(() => {
    getData()
    
  },[])
  //get 
  async function getData() {
    await axios
      .get(`/api/dashboard/persons/${person_id}`)
      .then(
        (d) => {
          setoldData(d.data.data)
          setSrcImg(d.data.data.imgPerson)
          setCheckCats(d.data.data.cats)
          setContent(d.data.data.bio)
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


  //Save Article
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

    const response = await fetch(`/api/dashboard/persons/${person_id}`, {
      method: "PUT",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseData = await response.json();
    if (response.status === 200) {
      toast.success("اطلاعات ویرایش شد");
      router.push("/dashboard/persons");
    } else if(response.status === 402) {
      toast.error(responseData.data);
    } else if(response.status === 500) {
      toast.error("اطلاعات ذخیره نشد! خطایی وجود دارد.");
    }
  
    
    
  };

  return (
    <div>
      <h2 className="mb-4 text-xl border-b-[1px] border-zinc-600">ویرایش اطلاعات شخص</h2>
      {(oldData == -1) ? <p>Loading...</p> : (oldData == -2) ? <p>Error...</p> :
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
                        نام <span className="text-red-500">*</span>
                      </label>
                      <input
                        ref={nameRef}
                        defaultValue={oldData.name}
                        type="text"
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md"
                        name="name"
                      />
                    </div>
                    <div className="mb-8">
                      <label className="text-sm">بیوگرافی</label>
                      <Editor valueEditor={setContent} defaultValue={content} />
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
                        defaultValue={oldData.birthday}
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
                            <input defaultChecked={checkcats.includes(cat._id)} value={cat._id} onChange={catSelect} className="p-2" type="checkbox" name={cat._id} id={cat._id} />
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
                        defaultValue={oldData.slug}
                        type="text"
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md"
                        name="slug"
                      />
                    </div>

                

                    <div className="mb-4">
                      <label className="text-sm">اینستاگرام</label>
                      <input
                        ref={socialRef}
                        defaultValue={oldData.social}
                        type="text"
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md"
                        name="social"
                      />
                    </div>

                    <div className="mb-4">
                      <label className="text-sm">تصویر شخص</label>
                      <ImageUpload onInput={uploadImage} src={srcImg}/>
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

export default EditPerson;
