import { TbPlayerSkipForwardFilled } from "react-icons/tb";


const NotFound = () => {
  return (
     <div className=" flex flex-col justify-center items-center min-h-svh ">
        <TbPlayerSkipForwardFilled className="text-4xl md:text-7xl text-red-500 mb-5" />
      <div className="text-4xl uppercase md:text-7xl">
        <span className="text-red-500">404 Not Found</span>
      </div>

      <span>صفحه یافت نشد...</span>
    </div>
  );
};

export default NotFound;
