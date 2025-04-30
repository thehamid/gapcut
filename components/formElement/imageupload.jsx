import React from "react";
import { FaFileImage } from "react-icons/fa6"
import Image from 'next/image'
import {useState,useEffect } from "react";


const ImageUpload = ({onInput,src}) => {
  const [previewUrl, setPreviewUrl] = useState(src ? src : "/images/avatar-holder.jpg");
  const [file, setFile] = useState()
  const [isValid, setIsValid] = useState(false)
  
  useEffect(() => {
  
    if (!file) {
        return
    }

    const fileReader = new FileReader()
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result)
    }
    fileReader.readAsDataURL(file)

}, [file])



    function handleAvatarImageChange(event) { 
      let pickedFile
      let fileIsValid = isValid

      if (event.target.files && event.target.files.length === 1) {
          pickedFile = event.target.files[0]
          setFile(pickedFile)
          setIsValid(true)
          fileIsValid = true
      } else {
          setIsValid(false)
          fileIsValid = false
      }

      onInput(pickedFile, fileIsValid)
    }

  return (
    <div className="relative mt-4 w-[128px] h-[128px]">
      <div className="overflow-hidden h-full rounded-lg border-4 border-white shadow shadow-black/50">
        <Image
          className="w-full h-full object-cover"
          src={previewUrl}
          alt={"avatar"}
          width={128}
          height={128}
        />
      </div>
      <label
        htmlFor="avatarIn"
        className="absolute bottom-0 -right-2 bg-primary p-2 rounded-full shadow shadow-black/50 aspect-square flex items-center cursor-pointer"
      >
        <FaFileImage />
      </label>
      <input
        onChange={handleAvatarImageChange}
        id="avatarIn"
        type="file"
        className="hidden"
        name="file"
      />
     
    </div>
  );
};

export default ImageUpload;
