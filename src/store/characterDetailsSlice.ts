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
import { getCharacterById } from '../api/api';
import { Character } from '../types/Character';

interface ListOfCharsState {
  selectedCharacter: Character | null;
  isDetailsLoading: boolean;
}

const initialState: ListOfCharsState = {
  selectedCharacter: null,
  isDetailsLoading: true,
};

export const loadCharacterById = createAsyncThunk(
  'characterDetails/fetchUserPostsById',
  async (characterId: string, thunkAPI) => {
    const { dispatch } = thunkAPI;

    dispatch(setIsDetailsLoading(true));

    const response = await getCharacterById(characterId);

    dispatch(setIsDetailsLoading(false));

    return response;
  },
);

export const characterDetails = createSlice({
  name: 'listOfPosts',
  initialState,
  reducers: {
    setSelectedCharacter: (state, action: PayloadAction<Character>) => {
      state.selectedCharacter = action.payload;
    },
    setIsDetailsLoading: (state, action: PayloadAction<boolean>) => {
      state.isDetailsLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadCharacterById.fulfilled, (state, action) => {
      state.selectedCharacter = action.payload;
    });
  },
});

export const {
  setSelectedCharacter,
  setIsDetailsLoading,
} = characterDetails.actions;

export const selectors = {
  getSelectedCharacter: (state: RootState) => state.characterDetails.selectedCharacter,
  getIsDetailsLoading: (state: RootState) => state.characterDetails.isDetailsLoading,
};

export default characterDetails.reducer;
