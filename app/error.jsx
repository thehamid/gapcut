'use client'
import { TbBroadcastOff } from "react-icons/tb";

const Error = () => {
   return (
        <div className=" flex flex-col justify-center items-center min-h-svh ">
             <TbBroadcastOff  className="text-4xl md:text-7xl text-red-500 mb-5" />
           <div className="text-4xl uppercase md:text-7xl">
             <span className="text-red-500">Error</span>
           </div>
     
           <span>  خطایی در دریافت اطلاعات وجود دارد</span>
         </div>
   );
}

export default Error;