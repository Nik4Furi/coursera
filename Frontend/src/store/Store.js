import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./UsersSlice";
import CourseSlice from "./CourseSlice";
import AdminSlice from "./AdminSlice";

//----------- Creating a store to handle all the states of the app
const Store = configureStore({
    reducer : {
        user : UserSlice,
        course:CourseSlice,
        admin : AdminSlice
    }
})

export default Store;