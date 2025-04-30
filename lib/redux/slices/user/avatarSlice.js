import { createSlice } from '@reduxjs/toolkit'

const avatarSlice = createSlice({
    name: "avatar", // User: 200, UserPro:220, Super Admin: 100, Admin: 110 Author: 111  Visitor:0
    initialState:{value:'/images/avatar-holder.jpg'},
    reducers: {
        setAvatarValue: (state,action) => void (state.value=action.payload),
    }
});

export const { setAvatarValue } = avatarSlice.actions;
export default avatarSlice.reducer;