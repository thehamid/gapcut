"use client";
import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import {toast} from 'react-toastify'

export default function Forget() {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm({
    reValidateMode: "onChange",
    mode: "onBlur",
    defaultValues: {
      email: "",
    },
  });

  const handleSubmitForm = async (data) => {
    try {
      const response = await axios.post("/api/users/forget", data);
         toast.success('لینک تغییر رمز به ایمیل شما ارسال شد')
    } catch (error) {
       toast.error('ایمیل وارد شده وجود ندارد')
    }
    // console.log("data: " + JSON.stringify(data));
  };

  return (
    <div className="flex items-center flex-col p-10 min-h-svh">
      <h2 className="font-black p-2 text-2xl">بازیابی رمز گپ کات</h2>
      <div></div>

      <div className="forget_form">
        <div className="relative flex flex-col items-center justify-center overflow-hidden ">
          <div className="w-full p-6 bg-zinc-800 rounded-md shadow-md lg:max-w-xl">
            <form onSubmit={handleSubmit(handleSubmitForm)} className="mt-6">
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-white text-right"
                >
                  ایمیل
                </label>
                <input
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  type="email"
                  label="Email"
                  placeholder="hello@example.com"
                  {...register("email", {
                    required: "وارد کردن ایمیل الزامی است",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "ایمیل خود را به درستی وارد کنید",
                    },
                  })}
                  error={errors.email?.message}
                />
              </div>

              <div className="mt-2">
                <button
                  disabled={!isDirty || !isValid}
                  type="submit"
                  className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-red-600 rounded-md hover:bg-red-800 focus:outline-none focus:bg-red-600"
                >
                  ارسال ایمیل بازیابی رمز
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
