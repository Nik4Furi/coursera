import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./UserSlice";
import CourseSlice from "./CourseSlice";
import AdminSlice from "./AdminSlice";

//------------- Create the store to handle the states of app
const Store = configureStore({
    reducer : {
        user: UserSlice,
        course : CourseSlice,
        admin : AdminSlice
    }
})

export default Store;