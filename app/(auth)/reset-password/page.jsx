"use client";
import { useForm } from "react-hook-form";
import React, { useRef, useEffect } from "react";
import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function ResetPassword() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();
  const password = useRef({});



  useEffect(() => {
    if (!token) {
      router.push("/");
    }
  }, [token, router]);

  // React hook form
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    watch,
  } = useForm({
    reValidateMode: "onChange",
    mode: "onBlur",
    defaultValues: {
      password: "",
      token: "",
    },
  });
  password.current = watch("password", "");

  const handleSubmitForm = async (data) => {
    try {
      data.token = token;
      const response = await axios.post("/api/users/reset-password", data);
      toast.success('تغییر رمز با موفقیت انجام شد')
      router.push("/login");
    } catch (error) {
      toast.error('تغییر رمز با خطا مواجه شد')
     
    }

    // console.log("data: " + JSON.stringify(data));
  };

  return (
    <div className="flex items-center flex-col p-10 min-h-svh">
      <h2 className="font-black text-2xl mb-2">تغییر رمز گپ کات</h2>

      <div className="reset_form">
        <div className="relative flex flex-col items-center justify-center overflow-hidden ">
          <div className="w-full p-6 bg-zinc-800 rounded-md shadow-md lg:max-w-xl">
            <form className="mt-6" onSubmit={handleSubmit(handleSubmitForm)}>
              <div className="flex sm:flex-row flex-col justify-center">
                <div className="mb-2 sm:mx-1">
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-white text-right"
                  >
                    رمز جدید
                  </label>
                  <input
                    {...register("password", { required: true, minLength: 6 })}
                    type="password"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                  {errors.password?.type === "required" && (
                    <small>وارد کردن رمز الزامی است</small>
                  )}
                  {errors.password?.type === "minLength" && (
                    <small role="alert">رمز باید حداقل 6 کاراکتر باشد</small>
                  )}
                </div>
                <div className="mb-2 sm:mx-1">
                  <label
                    htmlFor="confirmpassword"
                    className="block text-sm font-semibold text-white text-right"
                  >
                    تکرار رمز جدید
                  </label>
                  <input
                    {...register("confirmpassword", {
                      validate: (value) =>
                        value === password.current ||
                        "The passwords do not match",
                    })}
                    type="password"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                  {errors.confirmpassword && (
                    <small>تکرار رمز صحیح نمی باشد</small>
                  )}
                </div>
              </div>
              <div className="mt-2">
                <button
                  disabled={!isDirty || !isValid}
                  type="submit"
                  className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-red-600 rounded-md hover:bg-red-800 focus:outline-none focus:bg-red-600"
                >
                  تغییر رمز
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
