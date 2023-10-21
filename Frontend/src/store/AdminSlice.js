import { createSlice } from '@reduxjs/toolkit';
import { SERVER, Token } from '../GlobalFunctions';


//----------- Admin Specific Slice to handle admin 

const AdminSlice = createSlice({
    name: 'admin',
    initialState: {
        users: [],
        courses: [],
        lectures : [],
    },
    reducers: {
        
        //-------- set the all the users, who are used our app
        setUser(state, action) {
            state.users = action.payload;
        },

        //Function to remove the user
        removeUser(state,action){
           return state.users.filter(item => item._id !== action.payload);
        },

        //------Function to changet the role of the users
        changeUserRole(state,action){
            state.users.map(item => {
                if(item._id === action.payload){
                    if(item.role === 'admin')
                        item.role = 'user'
                    else item.role = 'admin';
                }
            })
        },

        //------------- Stuff to handle the api requests
        // Set stuff during api call
        setLoading(state, action) {
            state.loading = action.payload;
        },

        setSuccess(state, action) {
            state.success = action.payload
        },

        setMsg(state, action) {
            state.msg = action.payload;
        },

        //Removing all the stuff after api call
        removeLoading(state) {
            state.loading = false;
        },

        removeSuccess(state) {
            state.success = false;
        },

        removeMsg(state) {
            state.msg = "";
        },

        //-------- Clear msg,success and loading stuff from the admin states
        adminClearAll(state){
            state.loading = false;
            state.success = false;
            state.msg = false;
        },

        //-------------- Admin Courses Specific Stuff, to handle course specific login
        setCourses(state,action){ //loading
            state.courses = action.payload;
        },

        //---------------- Set the lectures by the admin
        setLectures(state,action){
            state.lectures = action.payload
        }

        // setCourseData(state)
    }
});

export const { setLoading, setMsg, setSuccess, setUser,adminClearAll,removeUser,changeUserRole,setCourses,setLectures } = AdminSlice.actions;
export default AdminSlice.reducer;

//------------------ Thunk Specific Stuff
//----------- Function to fetch the all the users who used app
export const fetchAllUsers = () => async (dispatch, getState) => {
    dispatch(setLoading(true))

    try {
        const url = `${SERVER}/admin/fetchAllUsers`;
        const options = {
            headers: {
                "auth-token": Token
            }
        };

        const res = await fetch(url, options);
        const data = await res.json();

        console.log('fetch suers ',data);

        if (data.success === true) {
            dispatch(setUser(data.users));
            dispatch(setSuccess(true));
        }

        else {
            dispatch(setUser([]));
            dispatch(setSuccess(false));
        }

        dispatch(setMsg(data.msg));

    } catch (error) {
        dispatch(setSuccess(false));

        dispatch(setMsg(error))
    }

    dispatch(setLoading(false))
}

//---------- Function to change the role of the users
export const ChangeUserRole = (id) => async dispatch => {
    dispatch(setLoading(true))

    try {
        const url = `${SERVER}/admin/updateUserProfile/${id}`;
        const options = {
            headers: {
                "auth-token": Token
            }
        };

        const res = await fetch(url, options);
        const data = await res.json();

        console.log('change role users ', data);

        if (data.success === true) {
            dispatch(setSuccess(true));
        }

        else {
            dispatch(setSuccess(false));
        }

        dispatch(setMsg(data.msg));

    } catch (error) {
        dispatch(setSuccess(false));

        dispatch(setMsg(error))
    }

    dispatch(setLoading(false))
}

//---------- Function to change the role of the users
export const DeleteUser = (id) => async dispatch => {
    dispatch(setLoading(true))

    try {
        const url = `${SERVER}/admin/deleteUser/${id}`;
        const options = {
            headers: {
                "auth-token": Token
            }
        };

        const res = await fetch(url, options);
        const data = await res.json();

        console.log('delete users ', data);

        if (data.success === true) {
            dispatch(setSuccess(true));
        }

        else {
            dispatch(setSuccess(false));
        }

        dispatch(setMsg(data.msg));

    } catch (error) {
        dispatch(setSuccess(false));

        dispatch(setMsg(error))
    }

    dispatch(setLoading(false))
}

//---------Function to add new lecture by the admin
export const AddNewLecture = (body) => async dispatch =>{

    try {
        
  
    const url = `${SERVER}/admin/addLecture`;
    const options = {
        headers : {
            "auth-token" : Token
        },
        body : JSON.stringify(body)
    };

    const res = await fetch(url,options);
    const data = await res.json();

    console.log('add new lecture ',data);

    

} catch (error) {
        
}
}

 //----------------------- Function to fetch the courses from the api
//  const FetchCourses = ()  =>  async dispatch =>{
//     try {
//         const url = `${SERVER}/course/fetchcourses`;
        
//         const res = await fetch(url);
//         const data = await res.json();

//         console.log('fetch courses ',data);

//         if(data.success === true){
//             toast.success(data.msg);
//         }
//         else toast.error(data.msg);


//     } catch (error) {
//         toast.error(error.response.data.messsage);
//         console.log(error.response.data.messsage);
//     }
// }