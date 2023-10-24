import { createSlice } from '@reduxjs/toolkit';
import { SERVER, Token } from '../GlobalFunctions';


//----------- Admin Specific Slice to handle admin 

const AdminSlice = createSlice({
    name: 'admin',
    initialState: {
        users: [],
        stats: { Counts: {}, Profit: {}, Percentage: {}, statsData: [{}] }
    },
    reducers: {
        //---------------- Fetch Users Specific Stuff-------------
        fetchUsersRequest(state) {
            state.loading = true;
        },
        setUsers(state, action) {
            state.loading = false;
            state.success = true;
            state.users = action.payload;
        },

        fetchUsersError(state, action) {
            state.loading = false;
            state.success = false;
            state.msg = action.payload;
        },
        //----------------- Fetch All Users Specific Stuff----------------X

        //---------------- Change user role Specific Stuff-------------
        changeUserRoleRequest(state) {
            state.loading = true;
        },
        changeUserRole(state, action) {
            state.loading = false;
            state.success = true;
            state.msg = action.payload.msg
            state.users = state.users.map(item => {
                if (item._id === action.payload.id) {
                    if (item.role === 'admin')
                        item.role = 'user';
                    else item.role = 'admin';
                }
                return item;
            });
        },

        changeUserRoleError(state, action) {
            state.loading = false;
            state.success = false;
            state.msg = action.payload;
        },
        //----------------- Update user role Specific Stuff----------------X

        //---------------- Delete users Specific Stuff-------------
        deleteUserRequest(state) {
            state.loading = true;
        },
        deleteUser(state, action) {
            state.loading = false;
            state.success = true;
            state.msg = action.payload.msg
            state.users = state.users.filter(item => item._id !== action.payload.id)
        },

        deleteUserError(state, action) {
            state.loading = false;
            state.success = false;
            state.msg = action.payload;
        },
        //----------------- delete users Specific Stuff----------------X

        //---------------- Dashboard Stats Specific Stuff-------------
        dashboardStatsRequest(state) {
            state.loading = true;
        },
        dashboardStats(state, action) {
            state.loading = false;
            state.success = true;
            state.stats = action.payload;
        },

        dashboardStatsError(state, action) {
            state.loading = false;
            state.success = false;
            state.msg = action.payload;
        },
        //----------------- Dashbaord Stats Specific Stuff----------------X


        //-------- Clear all api stuff
        clearAdminError(state) { //used to clear all the api stuffs
            state.loading = null;
            state.success = null;
            state.msg = null;
        },
    }
});

export const { fetchUsersRequest, fetchUsersError, setUsers, removeUser, changeUserRole, changeUserRoleError, changeUserRoleRequest, clearAdminError, deleteUser, deleteUserError, deleteUserRequest, dashboardStats, dashboardStatsError, dashboardStatsRequest } = AdminSlice.actions;
export default AdminSlice.reducer;

//------------------ Thunk Specific Stuff
//----------- Function to fetch the all the users who used app
export const fetchAllUsers = () => async dispatch => {

    dispatch(fetchUsersRequest())

    try {
        const url = `${SERVER}/admin/fetchAllUsers`;
        const options = {
            headers: {
                "auth-token": Token
            }
        };

        const res = await fetch(url, options);
        const data = await res.json();

        if (data.success === true)
            dispatch(setUsers(data.users));

        else dispatch(fetchUsersError(data.msg));

    } catch (error) {
        dispatch(fetchUsersError(error));
    }
}

//---------- Function to change the role of the users
export const handleChangeUserRole = (id) => async dispatch => {
    dispatch(changeUserRoleRequest(true))

    try {
        const url = `${SERVER}/admin/updateUserProfile/${id}`;
        const options = {
            method: 'PUT',
            headers: {
                "auth-token": Token
            }
        }


        const res = await fetch(url, options);
        const data = await res.json();

        if (data.success === true)
            dispatch(changeUserRole({ id, msg: data.msg }));

        else dispatch(changeUserRoleError(data.msg));

    } catch (error) {
        dispatch(changeUserRoleError(error));
    }

}

// ---------- Function to delet the users
export const handleDeleteUser = (id) => async dispatch => {
    dispatch(deleteUserRequest())

    try {
        const url = `${SERVER}/admin/deleteUser/${id}`;
        const options = {
            method: 'DELETE',
            headers: {
                "auth-token": Token
            }
        }

        const res = await fetch(url, options);
        const data = await res.json();

        if (data.success === true)
            dispatch(deleteUser({ id, msg: data.msg }));

        else dispatch(deleteUserError(data.msg));

    } catch (error) {
        dispatch(deleteUserError(error))
    }
}

//----------- Function to fetch the all the users who used app
export const handleFetchDashboardStats = () => async dispatch => {

    dispatch(dashboardStatsRequest())

    try {
        const url = `${SERVER}/admin/stats`;
        const options = {
            headers: {
                "auth-token": Token
            }
        };

        const res = await fetch(url, options);
        const data = await res.json();

        if (data.success === true)
            dispatch(dashboardStats(data.data));

        else dispatch(dashboardStatsError(data.msg));

    } catch (error) {
        dispatch(dashboardStatsError(error));
    }
}