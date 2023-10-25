import { createSlice } from '@reduxjs/toolkit'

import { DayToValidate, SERVER, Token, setWithExpiry } from '../GlobalFunctions';

//-------------- Create the slice of the users, where we handle all the state respect of the users
const UserSlice = createSlice({
    name: 'user',
    initialState: {
        user: {},
        isAuthenticated: false,
        playlist: [],
        subscription: {}
    },
    reducers: {
        //---------- Set the users, i.e. store user detail in state
        //------------------- Login Request Specific Stuff
        loginUserRequest(state) {
            state.loading = true;
        },
        loginUser(state, action) {
            state.loading = false;
            state.success = true;
            state.msg = action.payload.msg;
            // state.isAuthenticated = true;
            state.token = action.payload.token;
        },
        loginUserError(state, action) {
            state.loading = false;
            state.success = false;
            state.msg = action.payload;
        },
        //------------ Login User Specific Stuff-------------------X

        //---------------- Set User Specific Stufff-------------------
        getUserRequest(state) {
            state.loading = true;
        },
        setUser(state, action) {
            state.loading = false;
            state.success = true;
            state.msg = action.payload.msg;
            state.isAuthenticated = true;
            state.user = action.payload.user;
        },
        logoutUser(state) {
            state.isAuthenticated = false;
            state.user = {};
            state.token = null;
        },
        getUserError(state, action) {
            state.loading = false;
            state.success = false;
            state.token = null;
            state.msg = action.payload;
        },
        //------------- SetUser Specific Stuff----------------X


        //---------------- Register User Specific Stufff-------------------
        registerUserRequest(state) {
            state.loading = true;
        },
        registerUser(state, action) {
            state.loading = false;
            state.success = true;
            state.msg = action.payload;
        },
        registerUserError(state, action) {
            state.loading = false;
            state.success = false;
            state.msg = action.payload;
        },
        //------------- register Specific Stuff----------------X

        //---------------- update password Specific Stufff-------------------
        updateUserPasswordRequest(state) {
            state.loading = true;
        },
        updateUserPassword(state, action) {
            state.loading = false;
            state.success = true;
            state.msg = action.payload;
        },
        updateUserPasswordError(state, action) {
            state.loading = false;
            state.success = false;
            state.msg = action.payload;
        },
        //------------- update password Specific Stuff----------------X

        //---------------- course add to playlist Specific Stufff-------------------
        courseAddToPlaylistRequest(state) {
            state.loading = true;
        },
        courseAddToPlaylist(state, action) {
            state.loading = false;
            state.success = true;
            state.msg = action.payload.msg;
            state.user.playlist.push(action.payload.id);
        },
        courseAddToPlaylistError(state, action) {
            state.loading = false;
            state.success = false;
            state.msg = action.payload;
        },
        //------------- course add to playlist Specific Stuff----------------X

        //---------------- fetch playlist Specific Stufff-------------------
        fetchUserCoursePlaylistRequest(state) {
            state.loading = true;
        },
        fetchUserCoursePlaylist(state, action) {
            state.loading = false;
            state.success = true;
            // state.msg = action.payload.msg;
            state.playlist = action.payload.courses;
        },
        fetchUserCoursePlaylistError(state, action) {
            state.loading = false;
            state.success = false;
            state.msg = action.payload;
        },
        //------------- fetch playlist Specific Stuff----------------X

        //---------------- course remove to playlist Specific Stufff-------------------
        courseRemoveToPlaylistRequest(state) {
            state.loading = true;
        },
        courseRemoveToPlaylist(state, action) {
            state.loading = false;
            state.success = true;
            state.msg = action.payload.msg;
            state.user.playlist = state.user.playlist.filter(item => item !== action.payload.id);
            state.playlist = state.playlist.filter(item => item._id !== action.payload.id);

        },
        courseRemoveToPlaylistError(state, action) {
            state.loading = false;
            state.success = false;
            state.msg = action.payload;
        },
        //------------- corse remove to playlist Specific Stuff----------------X

        //---------------- subscription Specific Stufff-------------------
        subscribeRequest(state) {
            state.loading = true;
        },
        subscribe(state, action) {
            state.loading = false;
            state.success = true;
            state.msg = action.payload.msg;
            state.subscription.id = action.payload.id;

        },
        subscribeError(state, action) {
            state.loading = false;
            state.success = false;
            state.msg = action.payload;
        },
        //------------- subscribe Specific Stuff----------------X

        //---------------- subscription Specific Stufff-------------------
        cancelSubscriptionRequest(state) {
            state.loading = true;
        },
        cancelSubscription(state, action) {
            state.loading = false;
            state.success = true;
            state.msg = action.payload;
            state.subscription = {};
            state.user.subscription = null;
        },
        cancelSubscriptionError(state, action) {
            state.loading = false;
            state.success = false;
            state.msg = action.payload;
        },
        //------------- cancel subscription Specific Stuff----------------X

        //------------- Update profile 
        updateProfile(state, action) {
            state.user.name = action.payload.name;
            state.user.email = action.payload.email
        },

        //-------------- Update the profile picture of the user
        updateProfilePicture(state, action) {
            state.user.avatar.url = action.payload;
        },

        clearUserError(state) { //Clear all the stuff which is ecncomplish during request or api call
            state.loading = null;
            state.success = null;
            state.msg = null;
        }

    }
});

export const { loginUser, loginUserError, loginUserRequest, clearUserError, setUser, logoutUser, getUserError, getUserRequest, registerUser, registerUserError, registerUserRequest, updateProfile, updateUserPassword, updateUserPasswordError, updateUserPasswordRequest, updateProfilePicture, courseAddToPlaylist, courseAddToPlaylistError, courseAddToPlaylistRequest, courseRemoveToPlaylist, courseRemoveToPlaylistError, courseRemoveToPlaylistRequest, fetchUserCoursePlaylist, fetchUserCoursePlaylistError, fetchUserCoursePlaylistRequest, removeCourseToPlaylist, subscribe, subscribeError, subscribeRequest, cancelSubscription, cancelSubscriptionError, cancelSubscriptionRequest } = UserSlice.actions;
export default UserSlice.reducer;



//------------function ot login the user, during login page
export const handleLoginUser = (formData) => async dispatch => {

    dispatch(loginUserRequest());

    try {
        const url = `${SERVER}/user/login`;
        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        };
        const res = await fetch(url, options);
        const data = await res.json();

        if (data.success === true) {

            setWithExpiry('token', data.token, DayToValidate);

            dispatch(loginUser({ token: data.token, msg: data.msg }));
        }
        else dispatch(loginUserError(data.msg));

    } catch (error) {
        dispatch(loginUserError(error))
    }
}


//-------------- Fetch the user only logged in user by the api --------X
export const getUser = () => async dispatch => {

    dispatch(getUserRequest());

    try {
        const url = `${SERVER}/user/getUser`;
        const options = {
            headers: {
                'auth-token': Token
            }
        };

        const res = await fetch(url, options);
        const data = await res.json();

        if (data.success === true) {
            dispatch(setUser({ user: data.user }));
            // dispatch(setUser({ user: data.user, msg: data.msg }));
        }
        else dispatch(getUserError(data.msg));

    } catch (error) {
        dispatch(getUserError(error));
    }
};



//---------- Function to submit the form data or can say login the users 
export const handleRegisterUser = (formData) => async dispatch => {

    dispatch(registerUserRequest());

    //-------------Now call the api to register the new user
    try {
        const url = `${SERVER}/user/register`;
        const options = {
            method: 'POST',
            body: formData
        };

        const res = await fetch(url, options);
        const data = await res.json();

        if (data.success === true) {
            dispatch(registerUser(data.msg));
        }
        else dispatch(registerUserError(data.msg));

    } catch (error) {
        dispatch(registerUserError(error.response.data.message));
    }
}

//---------- Function to submit the form data or can say login the users 
export const handleUpdateUserPassword = (formData) => async dispatch => {

    dispatch(updateUserPasswordRequest());

    //-------------Now call the api to register the new user
    try {
        const url = `${SERVER}/user/changePassword`;
        const options = {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "auth-token": Token
            },
            body: JSON.stringify(formData)
        };

        const res = await fetch(url, options);
        const data = await res.json();

        if (data.success === true) {
            dispatch(updateUserPassword(data.msg));
        }
        else dispatch(updateUserPasswordError(data.msg));

    } catch (error) {
        dispatch(updateUserPasswordError(error.response.data.message));
    }
}

//----------- Function to add course into playlist
export const handleAddToPlaylist = (id) => async dispatch => {

    dispatch(courseAddToPlaylistRequest());

    try {
        const url = `${SERVER}/playlist/addToPlaylist/${id}`;
        const options = {
            method: 'PUT',
            headers: { "auth-token": Token }
        }

        const res = await fetch(url, options);
        const data = await res.json();

        if (data.success === true)
            dispatch(courseAddToPlaylist({ id, msg: data.msg }));
        else dispatch(courseAddToPlaylistError(data.msg))

    } catch (error) {
        dispatch(courseAddToPlaylistError(error))

    }
}

//----------- Function to fetch the user course playlist
export const handleFetchUserCoursePlaylist = (id) => async dispatch => {

    dispatch(fetchUserCoursePlaylistRequest());

    try {
        const url = `${SERVER}/playlist/fetchPlaylist`;
        const options = {
            headers: { "auth-token": Token }
        }

        const res = await fetch(url, options);
        const data = await res.json();

        if (data.success === true)
            dispatch(fetchUserCoursePlaylist({ courses: data.courses }));
            // dispatch(fetchUserCoursePlaylist({ courses: data.courses, msg: data.msg }));
        else dispatch(fetchUserCoursePlaylistError(data.msg))

    } catch (error) {
        dispatch(fetchUserCoursePlaylistError(error))
    }
}
//----------- Function to remove a course from playlist
export const handleCourseRemoveToPlaylist = (id) => async dispatch => {

    dispatch(courseRemoveToPlaylistRequest());

    try {
        const url = `${SERVER}/playlist/removeToPlaylist/${id}`;
        const options = {
            method: 'DELETE',
            headers: { "auth-token": Token }
        }

        const res = await fetch(url, options);
        const data = await res.json();

        if (data.success === true) {

            dispatch(courseRemoveToPlaylist({ id, msg: data.msg }));
        }
        else dispatch(courseRemoveToPlaylistError(data.msg))

    } catch (error) {
        dispatch(courseRemoveToPlaylistError(error))
    }
}


//----------------Function to subscribe the users
export const handleSubscription = () => async dispatch => {

    dispatch(subscribeRequest());

    try {
        const url = `${SERVER}/payment/subscribe`;
        const options = {
            headers: {
                'auth-token': Token
            }

        };
        const res = await fetch(url, options);
        const data = await res.json();

        if (data.success === true) {
            dispatch(subscribe({ msg: data.msg, id: data.subscriptionId }));
        }
        else dispatch(subscribeError(data.msg));

    } catch (error) {
        dispatch(subscribeError(error));
    }
}

//----------------Function to cancel the subscription
export const handleCancelSubscription = () => async dispatch => {

    dispatch(cancelSubscriptionRequest());

    try {
        const url = `${SERVER}/payment/cancelSubscription`;
        const options = {
            method: 'POST',
            headers: {
                'auth-token': Token
            }

        };
        const res = await fetch(url, options);
        const data = await res.json();

        if (data.success === true) {
            dispatch(cancelSubscription(data.msg));
        }
        else dispatch(cancelSubscriptionError(data.msg));

    } catch (error) {
        dispatch(cancelSubscriptionError(error));
    }
}