import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import saveAs from "file-saver";
import { formatDateMMDDYYYY } from "../helpers/dates";
import {
  DistributionChartPreference,
  SequentialChartPreference,
} from "../models/types";
import type { ReduxState } from "./store";

export interface PreferenceState {
  preferencesLoading: boolean;
  preferencesError: string | undefined;
  initialSavings: number;
  defaultSequentialChartType: SequentialChartPreference;
  defaultDistributionChartType: DistributionChartPreference;
}

const initialState: PreferenceState = {
  preferencesLoading: false,
  preferencesError: undefined,
  initialSavings: 0,
  defaultSequentialChartType: "line",
  defaultDistributionChartType: "pie",
};

// Get a user's incomes (to run upon page-load)
export const getInitialPreferences = createAsyncThunk(
  "preferences/load",
  async () => {
    try {
      const preferences = await (await fetch("/api/income")).json();
      return preferences;
    } catch (e) {
      throw e;
    }
  }
);

// TODO: Add functions to edit the preferences

export const preferenceSlice = createSlice({
  name: "preference",
  initialState,
  reducers: {
    resetPreferences: (state: PreferenceState) => {
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      // Initial Preferences Reducer
      .addCase(getInitialPreferences.pending, (state: PreferenceState) => {
        state = { ...state, preferencesLoading: true };
      })
      .addCase(
        getInitialPreferences.fulfilled,
        (state: PreferenceState, action) => {
          state = { ...state, preferencesLoading: false, ...action.payload };
        }
      )
      .addCase(
        getInitialPreferences.rejected,
        (state: PreferenceState, action) => {
          state = {
            ...state,
            preferencesLoading: false,
            preferencesError: String(action.error.message),
          };
        }
      );
  },
});

export const { resetPreferences } = preferenceSlice.actions;
export const selectPreference = (state: ReduxState) => state.preference;
export default preferenceSlice.reducer;
