import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { PreferencesState } from "../../slice";
import { editPreferences, getInitialPreferences } from "./requests";
import { fulfilled, pending, rejected } from "./resolvers";

export default (builder: ActionReducerMapBuilder<PreferencesState>) => {
  builder
    // Initial Preferences Reducer
    .addCase(getInitialPreferences.pending, pending)
    .addCase(getInitialPreferences.fulfilled, fulfilled)
    .addCase(getInitialPreferences.rejected, rejected)
    // Edit Preferences Reducer
    .addCase(editPreferences.pending, pending)
    .addCase(editPreferences.fulfilled, fulfilled)
    .addCase(editPreferences.rejected, rejected);
};
