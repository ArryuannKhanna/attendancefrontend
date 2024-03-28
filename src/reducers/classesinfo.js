import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchdata = createAsyncThunk(
    'classesarray/fetchdata',
    async () => {
        const response = await fetch("https:3000/getdata");
        const data = response.json();
        return data;
    }
);

const classslice = createSlice({
    name: "classesarray",
    initialState:{
        data:[],
        status:'idle',
        error: null
    },
    reducers:{

    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchdata.pending,(state) => {
            state.status = 'loading';
        })
        .addCase(fetchdata.fulfilled,(state,action) => {
            state.status = 'succeeded';
            state.data = action.payload;
        })
        .addCase(fetchdata.rejected,(state,action) => {
            state.status = 'failed';
            state.error = action.error.message;
        })
    }
})

export default classslice.reducer;