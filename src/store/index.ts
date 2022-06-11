/* eslint-disable import/no-cycle */
import { configureStore } from '@reduxjs/toolkit';
import listOfCharsReducer from './listOfCharsSlice';
import characterDetailsReducer from './characterDetailsSlice';

export const store = configureStore({
  reducer: {
    listOfChars: listOfCharsReducer,
    characterDetails: characterDetailsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
