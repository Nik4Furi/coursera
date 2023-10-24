import { createSlice } from "@reduxjs/toolkit";

//Global Function Stuff
import { SERVER, Token } from "../GlobalFunctions";


//------------- Course Slice, will used to help in courses arrangments
const CourseSlice = createSlice({
    name: 'course',
    initialState: {
        courses: [],
        lectures: []
    },
    reducers: {
        //--------------- Create Course Specific Stuff
        createCourseRequest(state) {
            state.loading = true;
        },

        createCourse(state, action) {
            state.loading = false;
            state.success = true;
            state.msg = action.payload.msg;
            state.courses.unshift(action.payload.course);
        },

        createCourseError(state, action) {
            state.success = false;
            state.loading = false;
            state.msg = action.payload;
        },
        //------------------ Create Course Specific Stuff

        //--------------- remove Course Specific Stuff
        removeCourseRequest(state) {
            state.loading = true;
        },

        removeCourse(state, action) {
            state.loading = false;
            state.success = true;
            state.msg = action.payload.msg;
            state.courses = state.courses.filter(course => course._id !== action.payload.id);
        },

        removeCourseError(state, action) {
            state.success = false;
            state.loading = false;
            state.msg = action.payload;
        },
        //------------------ Create Course Specific Stuff

        //--------- Fetch Courses Specific Stuff
        fetchCourseRequest(state) {
            state.loading = true;
        },
        setCourse(state, action) {
            state.loading = false;
            state.success = true;
            // state.msg = action.payload.msg;
            state.courses = action.payload.courses;
        },
        fetchCourseError(state, action) {
            state.loading = false;
            state.success = false;
            state.msg = action.payload;
        },
        //-------------- Fetch courses specific stuff----------------X

        //--------- Fetch Lectures Specific Stuff
        fetchLectureRequest(state) {
            state.loading = true;
        },
        setLectures(state, action) {
            state.loading = false;
            state.success = true;
            // state.msg = action.payload.msg;
            state.lectures = action.payload;
            // state.lectures.views += state.lectures.length;
        },
        fetchLectureError(state, action) {
            state.loading = false;
            state.success = false;
            state.msg = action.payload;
        },
        //-------------- Fetch courses specific stuff----------------X

        //--------- Add new Lectures Specific Stuff
        addLectureRequest(state) {
            state.loading = true;
        },
        addLectures(state, action) {
            state.loading = false;
            state.success = true;
            state.msg = action.payload.msg;
            if (!state.lectures) state.lectures = action.payload.lecture;
            else
                state.lectures.push(action.payload.lecture);
        },
        addLectureError(state, action) {
            state.loading = false;
            state.success = false;
            state.msg = action.payload;
        },
        //-------------- Add new lecture specific stuff----------------X

        //--------- remove Lecture Specific Stuff
        removeLectureRequest(state) {
            state.loading = true;
        },
        removeLectures(state, action) {
            state.loading = false;
            state.success = true;
            state.msg = action.payload.msg;
            state.lectures = state.lectures.filter(item => item._id !== action.payload.id);
            state.courses = state.courses.map(item => {
                if (item._id === action.payload.course_id)
                    item.totalVideos -= 1;
            })
        },
        removeLectureError(state, action) {
            state.loading = false;
            state.success = false;
            state.msg = action.payload;
        },
        //-------------- Fetch courses specific stuff----------------X


        clearCoursesError(state) { //Clear all the stuff which is ecncomplish during request or api call
            state.loading = null;
            state.success = null;
            state.msg = null;
        }

    }
})

export const { createCourse, createCourseError, createCourseRequest, removeCourse, removeCourseError, removeCourseRequest, setCourse, fetchCourseError, fetchCourseRequest, clearCoursesError, fetchLectureError, fetchLectureRequest, setLectures, addLectureError, addLectureRequest, addLectures, removeLectureError, removeLectureRequest, removeLectures } = CourseSlice.actions;
export default CourseSlice.reducer

//-------------------- Course Specific Stuff
//-----------Function to fetch all the courses-------------X
export const fetchCourses = () => async dispatch => {

    dispatch(fetchCourseRequest());

    try {
        const url = `${SERVER}/course/fetchcourses`;

        const res = await fetch(url);
        const data = await res.json();

        if (data.success === true)
            dispatch(setCourse({ courses: data.courses }))
        // dispatch(setCourse({ courses: data.courses, msg: data.msg }))
        else dispatch(fetchCourseError(data.msg))

    } catch (error) {
        dispatch(fetchCourseError(error))
    }
}

//--------------- Adding new course by the admin
export const handleAddNewCourse = (body) => async dispatch => {
    dispatch(createCourseRequest());

    try {
        const url = `${SERVER}/course/addCourse`;
        const options = {
            method: 'POST',
            headers: {
                "auth-token": Token
            },
            body: body
        };

        const res = await fetch(url, options);
        const data = await res.json();

        if (data.success === true)
            dispatch(createCourse({ course: data.course, msg: data.msg }))
        else dispatch(createCourseError(data.msg));

    } catch (error) {
        dispatch(createCourseError(error));
    }
}

//---------- Function to delete the course 
export const handleDeleteCourse = (id) => async dispatch => {

    dispatch(removeCourseRequest());

    try {
        const url = `${SERVER}/course/removeCourse/${id}`;
        const options = {
            method: 'DELETE',
            headers: {
                "auth-token": Token
            }
        };

        const res = await fetch(url, options);
        const data = await res.json();

        if (data.success === true) {

            dispatch(removeCourse({ id, msg: data.msg }));
        }
        else dispatch(removeCourseError(data.msg))

    } catch (error) {
        dispatch(removeCourseError(error))
    }
}
//----------------- Course Specific Stuff


//-------------------- Lecture Specific Stuff-------------
//-----------Function to fetch all the lectures-------------X
export const fetchLectures = (id) => async dispatch => {

    dispatch(fetchCourseRequest());

    try {
        const url = `${SERVER}/course/fetchLectures?course_id=${id}`;
        const options = {
            headers: { 'auth-token': Token }
        }

        const res = await fetch(url, options);
        const data = await res.json();

        if (data.success === true)
            dispatch(setLectures(data.lectures))

        else dispatch(fetchLectureError(data.msg))

    } catch (error) {
        dispatch(fetchLectureError(error))
    }
}

//--------------- Adding new lecture by the admin
export const handleAddNewLecture = (id, body) => async dispatch => {
    dispatch(addLectureRequest());

    try {
        const url = `${SERVER}/course/addLecture?course_id=${id}`;
        const options = {
            method: 'POST',
            headers: {
                "auth-token": Token
            },
            body: body
        };

        const res = await fetch(url, options);
        const data = await res.json();

        if (data.success === true)
            dispatch(addLectures({ lecture: data.lecture, msg: data.msg }))
        else dispatch(addLectureError(data.msg));

    } catch (error) {
        dispatch(addLectureError(error));
    }
}
//--------------- Remvoing the lecture by the admin
export const handleRemoveLecture = (course_id, lecture_id) => async dispatch => {
    dispatch(removeLectureRequest());

    try {
        const url = `${SERVER}/course/removeLecture?course_id=${course_id}&lecture_id=${lecture_id}`;
        const options = {
            method: 'DELETE',
            headers: {
                "auth-token": Token
            }
        };

        const res = await fetch(url, options);
        const data = await res.json();

        if (data.success === true)
            dispatch(removeLectures({ id: lecture_id, msg: data.msg, course_id }))
        else dispatch(removeLectureError(data.msg));

    } catch (error) {
        dispatch(removeLectureError(error));
    }
}

