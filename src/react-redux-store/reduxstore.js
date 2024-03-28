import { configureStore } from "@reduxjs/toolkit";
import classslicereducer from "../reducers/classesinfo"
import drawerinforeducer from "../reducers/drawerinfo";
// import { configure } from "@testing-library/react";

export const store = configureStore({
    reducer:{
        classesarray:classslicereducer,
        drawer:drawerinforeducer
    }
})