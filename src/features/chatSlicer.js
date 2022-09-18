import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user : null,
    authIsReady : false,

    chatId : null,
    chatUser : {},

}


export const chatSlice =  createSlice({
    name : 'chat',
    initialState,


    reducers : {
        setUser : (state,action) => {
            state.authIsReady = true;
            state.user = action.payload;
        },

        userChat : (state,action) => {

 
            state.chatUser = action.payload;
            state.chatId = state.user.uid > action.payload.uid ? state.user.uid + action.payload.uid : action.payload.uid + state.user.uid;
        }
    },
})

export const {setUser,userChat} = chatSlice.actions;
export default chatSlice.reducer;