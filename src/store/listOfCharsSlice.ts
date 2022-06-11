// there I imported rootState from store because i use it in selectors for this inner state

/* eslint-disable import/no-cycle */

// Redux Toolkit allows us to write "mutating" logic in reducers. It
// doesn't actually mutate the state because it uses the Immer library,
// which detects changes to a "draft state" and produces a brand new
// immutable state based off those changes

/* eslint-disable no-param-reassign */

// i use action before initialization in thunk so i need it to off warning of linter

/* eslint-disable @typescript-eslint/no-use-before-define */

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';
import { getCharacters } from '../api/api';
import { Character } from '../types/Character';

interface ListOfCharsState {
  charactersPage: Array<Character>;
  isListLoading: boolean;
}

const initialState: ListOfCharsState = {
  charactersPage: [],
  isListLoading: true,
};

export const loadCharactersPage = createAsyncThunk(
  'listOfChars/loadCharactersPage',
  async (pageNumber: string, thunkAPI) => {
    const { dispatch } = thunkAPI;

    dispatch(setIsListLoading(true));

    const response = await getCharacters(pageNumber);

    dispatch(setIsListLoading(false));

    return response.results;
  },
);

export const listOfChars = createSlice({
  name: 'listOfPosts',
  initialState,
  reducers: {
    setCharacters: (state, action: PayloadAction<Array<Character>>) => {
      state.charactersPage = action.payload;
    },
    setIsListLoading: (state, action: PayloadAction<boolean>) => {
      state.isListLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadCharactersPage.fulfilled, (state, action) => {
      state.charactersPage = action.payload;
    });
  },
});

export const {
  setCharacters,
  setIsListLoading,
} = listOfChars.actions;

export const selectors = {
  getCharactersPage: (state: RootState) => state.listOfChars.charactersPage,
  getIsListLoading: (state: RootState) => state.listOfChars.isListLoading,
};

export default listOfChars.reducer;
