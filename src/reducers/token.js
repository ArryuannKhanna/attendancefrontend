import { createSlice } from "@reduxjs/toolkit";

const tokenslice = createSlice({
    name: "token",
    initialState:{
        value:''
    },
    reducers:{
        removetoken: (state) => {
            state.value = '';
        },
        settoken: (state,action) => {
            state.value = action.payload;
        }
    },
})

export const {settoken,removetoken} = tokenslice.actions;

export default tokenslice.reducer;