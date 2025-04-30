"use client";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import ImageUpload from "@/components/formElement/imageupload";
import Image from "next/image";

const GalleryDash = () => {
  const [files, setFiles] = useState(-1);
  const [img, setImage] = useState();
  const [reload, setReload] = useState(false);
  const [itemID, setItemID] = useState();

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/dashboard/gallery/");

      const data = await response.json();
      setFiles(data);
      setReload(false);
    }
    fetchData();
  }, [reload]);

  //upload Image
  const uploadImage = (props) => {
    const data = new FormData();
    data.append("file", props);

    axios
      .post("/api/upload", data)
      .then((d) => {
        setImage(d.data.data);
        setReload(true);
      })
      .catch((e) => console.log(e.response));
  };

    const selectImage = (img) => {
    setImage(img.url);
    setItemID(img._id);
  };


	const deletehandler = async (id) => {
		await fetch(`/api/dashboard/gallery/${id}`, {
			method: 'DELETE',
			headers : { 
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			   }
		
			})
			.then((response) => response.json())
			.then((messages) => {console.log("messages");});
			setReload(true)
	}


  return (
    <div>
      <h2 className="mb-4 text-xl border-b-[1px] border-zinc-600">گالری</h2>
      <div className="flex flex-row justify-around p-2 mb-4 bg-zinc-900 rounded-lg">
        <div className="p-2">
          <ImageUpload onInput={uploadImage} src="/images/avatar-holder.jpg" />
        </div>
        <div className="p-2 text-center">
          <label htmlFor="Imageurl">آدرس تصویر انتخابی</label>
          <input
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md"
            type="text"
            name="Imageurl"
            defaultValue={img}
          />
                           <span
                                  onClick={() => deletehandler(itemID)}
                                  className="text-red-600 text-sm pt-6 cursor-pointer"
                                >
                                  حذف تصویر از گالری
                                </span> 
          
        </div>
      </div>
      <div className="p-2  bg-zinc-900 rounded-lg">
        {files == -1 ? (
          <p>Loading...</p>
        ) : files == -2 ? (
          <p>Error...</p>
        ) : (
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                {files.map((item, i) => (
             <div className="relative" key = { i }>
              < Image
                onClick = { () => selectImage(item) }
                      className="block h-full w-full rounded-lg object-cover object-center cursor-pointer"
                      style={{ border : itemID===item._id ? '3px solid #FF0032' : 'none' }}
                src = { item.url }
                width = { 200}
                height = { 200}
                alt = { item._id }
                priority = { true}
                  />
                  </div>
                  ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryDash;
