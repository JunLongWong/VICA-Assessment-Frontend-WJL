import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { IUser } from "../Api/model/types";
import { api } from "../Api/api";


type UserListState = {
    userList: IUser[];
    isSuccess: boolean | undefined;
    isLoading: boolean | undefined;
    isError: boolean | undefined;
    error: string | null;
    totalUserCount: number
};

const slice = createSlice({
    name: "user",
    initialState: {
        userList: [],
        isSuccess: undefined,
        isLoading: undefined,
        isError: undefined,
        error: null,
        totalUserCount: 0
    } as UserListState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(
            api.endpoints.getAllUser.matchFulfilled,
            (state, action) => {
                state.userList = action.payload.users.user;
                state.isSuccess = true;
                state.totalUserCount = action.payload.users.user.length;
            }
        );

        builder.addMatcher(
            api.endpoints.deleteUser.matchFulfilled,
            (state, action) => {
                state.userList = state.userList.filter(userObj => userObj._id !== action.payload.user._id)
            }
        );

        builder.addMatcher(
            api.endpoints.createUser.matchFulfilled,
            (state, action) => {
                state.userList.push(action.payload.user)
            }
        );
        builder.addMatcher(
            api.endpoints.updateUser.matchFulfilled,
            (state, action) => {
                state.userList = state.userList.map(user => user._id !== action.payload.user._id ? user : action.payload.user)
            }
        );


    },
});


export default slice.reducer;

// for use selectors to get state in components
export const getAllUserList = (state: RootState) => state.user.userList;


