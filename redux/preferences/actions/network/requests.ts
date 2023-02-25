import { createAsyncThunk } from "@reduxjs/toolkit";
import { PreferenceType } from "../../../../models/Preferences";
import { EditPreferencesProps } from "./types";

const preferencesRequest =
  (method: string) =>
  async (props?: EditPreferencesProps): Promise<PreferenceType> => {
    try {
      return await (
        await fetch("/api/preferences", {
          method,
          body: props ? JSON.stringify(props) : undefined,
        })
      ).json();
    } catch (e) {
      throw new Error(`Preferences Error: ${e}`);
    }
  };

export const getInitialPreferences = createAsyncThunk(
  "preferences/load",
  preferencesRequest("GET")
);

export const editPreferences = createAsyncThunk(
  "preferences/edit",
  preferencesRequest("PUT")
);
