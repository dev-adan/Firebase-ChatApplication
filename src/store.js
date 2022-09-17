import {configureStore} from '@reduxjs/toolkit';

import chatReducer from './features/chatSlicer'

export const store = configureStore({
    reducer : {
        chat : chatReducer,

        
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,
        }),
    
})