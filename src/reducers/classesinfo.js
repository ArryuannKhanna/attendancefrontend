import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { useSelector } from "react-redux";

// const token = localStorage.getItem('token');

export const fetchdata = createAsyncThunk(
  "classesarray/fetchdata",
  async () => {
    const token = localStorage.getItem("token");
    const type = localStorage.getItem("type");
    let fetch_point = "";
    if (type === "Student") {
      fetch_point = "http://127.0.0.1:8000/studentclasses/";
    } else {
      fetch_point = "http://127.0.0.1:8000/teacherclasses/";
    }
    const response = await fetch(fetch_point, {
      method: "GET",
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("Not a JSON response");
    }

    const data = await response.json();
    // console.log("this is the data we fetched", data);
    return data;
  }
);

const classslice = createSlice({
  name: "classesarray",
  initialState: {
    data: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchdata.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchdata.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchdata.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// export { fetchdata };

export default classslice.reducer;
