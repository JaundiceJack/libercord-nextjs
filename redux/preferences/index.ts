import { ReduxState } from "../store";
import { preferencesSlice } from "./slice";

export {
  getInitialPreferences,
  editPreferences,
} from "./actions/network/requests";

export const selectPreferences = (state: ReduxState) => state.preferences;

export const { resetPreferences } = preferencesSlice.actions;

export default preferencesSlice.reducer;
