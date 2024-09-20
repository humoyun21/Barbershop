import {createSlice, PayloadAction } from "@reduxjs/toolkit";

type TInitialState = {
    token: string
}

const initialState: TInitialState = {
    token: localStorage.getItem("token") as string
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signIn: (state, action: PayloadAction<{token: string}>) => {
            state.token = action.payload.token
            localStorage.setItem("token", state.token)
        },
        signOut: (state) => {
            state.token = ""
            localStorage.removeItem("token")
        }
    }
});

export const {signIn, signOut} = authSlice.actions;
export default authSlice.reducer