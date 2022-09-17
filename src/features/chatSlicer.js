import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user : null,
    authIsReady : false,
}


export const chatSlice =  createSlice({
    name : 'chat',
    initialState,


    reducers : {
        setUser : (state,action) => {
            state.authIsReady = true;
            state.user = action.payload;
        }
    },
})

export const {setUser} = chatSlice.actions;
export default chatSlice.reducer;