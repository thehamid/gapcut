"use client";
import React from "react";
import { useDispatch } from "react-redux";
import { setAvatarValue } from "@/lib/redux/slices/user/avatarSlice";
import { logedToTrue } from "@/lib/redux/slices/user/logedSlice";
import { setRoleValue } from "@/lib/redux/slices/user/roleSlice";

const UserDefaultValueSetter = ({ setter }) => {
  const dispatch = useDispatch();
  
  dispatch(setAvatarValue(setter.data?.avatar));
  dispatch(logedToTrue());
  dispatch(setRoleValue(setter.data?.roles));


  return <div className="w-0"></div>;
};

export default UserDefaultValueSetter;
