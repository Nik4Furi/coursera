import { createSlice } from "@reduxjs/toolkit";


//------------- Course Slice, will used to help in courses arrangments
const CourseSlice = createSlice({
    name : 'course',
    initialState : {
        courses : []
    },
    reducers : {
        //------- Set course to in users state
        setCourse(state,action){
            state.courses = action.payload
        },

        //-------- Removing a course
        removeCourse(state,action){
            state.courses.filter(item => item._id !== action.payload);
        }
    }
})

export const {setCourse,removeCourse} = CourseSlice.actions;
export default CourseSlice.reducer