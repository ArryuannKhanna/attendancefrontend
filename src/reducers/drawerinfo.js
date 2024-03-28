import {createSlice} from "@reduxjs/toolkit";

const drawerslice = createSlice({
    name: "drawer",
    initialState:{
        value:true
    },
    reducers:{
        turnon: (state) => {
            state.value = true;
        },
        turnoff: (state) => {
            state.value = false;
        }
    },
})

export const {turnon,turnoff} = drawerslice.actions;
export default drawerslice.reducer;