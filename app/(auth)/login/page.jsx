"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setAvatarValue } from "@/lib/redux/slices/user/avatarSlice";
import { logedToTrue } from "@/lib/redux/slices/user/logedSlice";
import Loading from "@/components/elements/loading";

export default function Login() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const [error, setError] = useState("");
  const { data: session, status: sessionStatus } = useSession();
  const dispatch = useDispatch();

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      toast.success("به گپ کات خوش آمدید");
      dispatch(setAvatarValue(session.user.avatar));
      dispatch(logedToTrue());
      router.replace("/");
    }
  }, [sessionStatus, router, dispatch, session?.user?.avatar]);

  const onSubmit = async (data) => {
    const res = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (res?.error) {
      setError("ایمیل یا رمز عبور اشتباه است!");
      if (res?.url) router.replace("/");
    } else {
      setError("");
    }
  };

  

  if (sessionStatus === "loading") {
    return <Loading style={'h-screen'} />;
  }
  return (
    sessionStatus !== "authenticated" && (
      <div className="flex items-center flex-col p-10 min-h-svh">
        <h2 className="font-black text-2xl">ورود به حساب گپ کات</h2>
        <div>
          <span>در گپ کات حساب ندارید؟</span>
          <Link href="/register" className="text-red-600">
            ثبت نام کن
          </Link>
        </div>

        <div className="login_form">
          <div className="relative flex flex-col items-center justify-center overflow-hidden ">
            <div className="w-full p-6 bg-zinc-800 rounded-md shadow-md lg:max-w-xl">
              <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-white text-right"
                  >
                    ایمیل
                  </label>
                  <input
                    {...register("email", { required: true })}
                    type="email"
                    placeholder="salam@kelaket360.ir"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                  {errors.email && <span>وارد کردن ایمیل الزامی است</span>}
                </div>
                <div className="mb-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-white text-right"
                  >
                    رمز عبور
                  </label>
                  <input
                    {...register("password", { required: true })}
                    type="password"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                  {errors.password && <span>وارد کردن رمز الزامی است</span>}
                </div>
                <Link
                  href="/forget"
                  className="text-xs text-right text-red-700  hover:underline"
                >
                  فراموشی رمز؟
                </Link>
                <div className="mt-2">
                  <button
                    type="submit"
                    className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-red-600 rounded-md hover:bg-red-800 focus:outline-none focus:bg-red-600"
                  >
                    ورود به حساب
                  </button>
                  <p className="text-red-600 text-[16px] mb-4">
                    {error && error}
                  </p>
                </div>
              </form>

              <div className="relative flex items-center justify-center w-full mt-6 border border-t">
                <div className="absolute px-5 bg-zinc-800 text-gray-200">
                  ورود با حساب
                </div>
              </div>
              <div className="flex mt-4 gap-x-2">
                <button
                  onClick={() => signIn('google')}
                  className="flex items-center justify-center w-full p-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-offset-1 focus:ring-violet-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="74"
                    height="24"
                    viewBox="0 0 74 24"
                  >
                    <path
                      fill="#4285F4"
                      d="M9.24 8.19v2.46h5.88c-.18 1.38-.64 2.39-1.34 3.1-.86.86-2.2 1.8-4.54 1.8-3.62 0-6.45-2.92-6.45-6.54s2.83-6.54 6.45-6.54c1.95 0 3.38.77 4.43 1.76L15.4 2.5C13.94 1.08 11.98 0 9.24 0 4.28 0 .11 4.04.11 9s4.17 9 9.13 9c2.68 0 4.7-.88 6.28-2.52 1.62-1.62 2.13-3.91 2.13-5.75 0-.57-.04-1.1-.13-1.54H9.24z"
                    />
                    <path
                      fill="#EA4335"
                      d="M25 6.19c-3.21 0-5.83 2.44-5.83 5.81 0 3.34 2.62 5.81 5.83 5.81s5.83-2.46 5.83-5.81c0-3.37-2.62-5.81-5.83-5.81zm0 9.33c-1.76 0-3.28-1.45-3.28-3.52 0-2.09 1.52-3.52 3.28-3.52s3.28 1.43 3.28 3.52c0 2.07-1.52 3.52-3.28 3.52z"
                    />
                    <path
                      fill="#4285F4"
                      d="M53.58 7.49h-.09c-.57-.68-1.67-1.3-3.06-1.3C47.53 6.19 45 8.72 45 12c0 3.26 2.53 5.81 5.43 5.81 1.39 0 2.49-.62 3.06-1.32h.09v.81c0 2.22-1.19 3.41-3.1 3.41-1.56 0-2.53-1.12-2.93-2.07l-2.22.92c.64 1.54 2.33 3.43 5.15 3.43 2.99 0 5.52-1.76 5.52-6.05V6.49h-2.42v1zm-2.93 8.03c-1.76 0-3.1-1.5-3.1-3.52 0-2.05 1.34-3.52 3.1-3.52 1.74 0 3.1 1.5 3.1 3.54.01 2.03-1.36 3.5-3.1 3.5z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M38 6.19c-3.21 0-5.83 2.44-5.83 5.81 0 3.34 2.62 5.81 5.83 5.81s5.83-2.46 5.83-5.81c0-3.37-2.62-5.81-5.83-5.81zm0 9.33c-1.76 0-3.28-1.45-3.28-3.52 0-2.09 1.52-3.52 3.28-3.52s3.28 1.43 3.28 3.52c0 2.07-1.52 3.52-3.28 3.52z"
                    />
                    <path fill="#34A853" d="M58 .24h2.51v17.57H58z" />
                    <path
                      fill="#EA4335"
                      d="M68.26 15.52c-1.3 0-2.22-.59-2.82-1.76l7.77-3.21-.26-.66c-.48-1.3-1.96-3.7-4.97-3.7-2.99 0-5.48 2.35-5.48 5.81 0 3.26 2.46 5.81 5.76 5.81 2.66 0 4.2-1.63 4.84-2.57l-1.98-1.32c-.66.96-1.56 1.6-2.86 1.6zm-.18-7.15c1.03 0 1.91.53 2.2 1.28l-5.25 2.17c0-2.44 1.73-3.45 3.05-3.45z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
