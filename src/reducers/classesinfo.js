import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { useSelector } from "react-redux";

// const token = localStorage.getItem('token'); 

export const fetchdata = createAsyncThunk(
    'classesarray/fetchdata',
    async () => {
        const token = localStorage.getItem('token');
        const type = localStorage.getItem('type');

        if (type === 'teacher') {
            const response = await fetch("http://127.0.0.1:8000/teacherclasses/", {
                method: "GET",
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            console.log('this is the data we fetched', data);
            // console.log('this is the token we fetched',token);
            return data;
        } else {
            const response = await fetch("http://127.0.0.1:8000/studentclasses/", {
                method: "GET",
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            console.log('this is the data we fetched', data);
            // console.log('this is the token we fetched',token);
            return data;
        }
    }
);

const classslice = createSlice({
    name: "classesarray",
    initialState: {
        data: [],
        status: 'idle',
        error: null
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchdata.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchdata.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchdata.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})

// export { fetchdata };

export default classslice.reducer;