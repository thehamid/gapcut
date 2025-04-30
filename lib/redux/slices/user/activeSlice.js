import { createSlice } from '@reduxjs/toolkit'

const userActiveSlice = createSlice({
    name: "userActive",
    initialState: false,
    reducers: {
        userActiveToFalse: (state) => (state = false),
        userActiveToTrue: (state) => (state = true),
    }
});

export const { userActiveToFalse, userActiveToTrue } = userActiveSlice.actions;
export default userActiveSlice.reducer;