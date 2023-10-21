import { createSlice } from '@reduxjs/toolkit'

//----------- User Slice, or can say auth slice to handle controlling user configurations

const UserSlice = createSlice({
    name: 'user',
    initialState: {
        isAuthenticated: false,
        user: [],
        lectures : []
    },

    reducers: {
        //------- set the user state data
        setUser(state, action) {
            state.user = action.payload;

            state.isAuthenticated = true;
        },

        removIsAuthenticated(state) {
            state.isAuthenticated = false;
        },

        //------------- Set at the authenticated;
        setLectures(state,action){
            state.lectures = action.payload;

        },

        //------------- Set at the authenticated;
        addLecture(state,action){
            state.lectures.push(action.payload);

        }
    }
});

export const { setUser, removIsAuthenticated,setLectures,addLecture } = UserSlice.actions;
export default UserSlice.reducer;