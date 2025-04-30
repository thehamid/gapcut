import { createSlice } from '@reduxjs/toolkit'

const roleSlice = createSlice({
    name: "role", // User: 200, UserPro:220, Super Admin: 100, Admin: 110 Author: 111  Visitor:0
    initialState: {value:0},
    reducers: {
        setRoleValue: (state,action) => void (state.value=action.payload),
    }
});

export const { setRoleValue } = roleSlice.actions;
export default roleSlice.reducer;