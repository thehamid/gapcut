import { configureStore } from "@reduxjs/toolkit";

import logedSlice from "./slices/user/logedSlice";
import roleSlice from "./slices/user/roleSlice";
import activeSlice from "./slices/user/activeSlice";
import avatarSlice from "./slices/user/avatarSlice";

const store = configureStore({
    reducer: {
        logedSlice: logedSlice,
        roleSlice: roleSlice,
        activeSlice: activeSlice,
        avatarSlice:avatarSlice,
    }
});

export default store;