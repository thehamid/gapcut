import { MdMailOutline, MdSmartphone } from "react-icons/md";
import { SiInstagram } from "react-icons/si";
import { LiaTelegramPlane } from "react-icons/lia";

const Contact = () => {
  return (
    <div className="container mx-auto p-4 min-h-svh">
      <h1 className="pinline text-4xl font-bold mb-4">ارتباط با ما</h1>

      <span className="mb-4 text-sm/8">
          برای ارتباط با ما میتوانید از راه های زیر استفاده کنید
        </span>
      <div className="flex flex-row flex-wrap gap-4 p-2 ">
        

        <span className="flex justify-between items-center bg-zinc-800 min-w-60 h-full p-4 rounded-md mb-4 text-sm/8">
          <div>
            <strong className="ml-1">ایمیل:</strong>
            <a href="mailto:info@gapcut.ir" className="text-red-600">
              info@gapcut.ir
            </a>
          </div>
          <div>
            <MdMailOutline className="text-4xl text-zinc-700" />
          </div>
        </span>

        <span className="flex justify-between items-center bg-zinc-800 min-w-60 h-full p-4 rounded-md mb-4 text-sm/8">
          <div>
            <strong className="ml-1">تلفن:</strong>
            <a href="tel:+989981052535" className="text-red-600">
              09981052535
            </a>
          </div>
          <div>
            <MdSmartphone  className="text-4xl text-zinc-700" />
          </div>
        </span>

        <span className="flex justify-between items-center bg-zinc-800 min-w-60 h-full p-4 rounded-md mb-4 text-sm/8">
          <div>
            <strong className="ml-1">اینستاگرام:</strong>
            <a href="https://instagram.com/gapcut.ir" className="text-red-600">
              gapcut.ir
            </a>
          </div>
          <div>
            <SiInstagram   className="text-4xl text-zinc-700" />
          </div>
        </span>

        <span className="flex justify-between items-center bg-zinc-800 min-w-60 h-full p-4 rounded-md mb-4 text-sm/8">
          <div>
            <strong className="ml-1">تلگرام:</strong>
            <a href="https://t.me/gapcutir" className="text-red-600">
              gapcutir
            </a>
          </div>
          <div>
            <LiaTelegramPlane   className="text-4xl text-zinc-700" />
          </div>
        </span>



      </div>
    </div>
  );
};

export default Contact;
