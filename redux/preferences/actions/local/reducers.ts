import { PreferencesState, initialState } from "../../slice";

export default {
  resetPreferences: (state: PreferencesState) => {
    state = initialState;
  },
};
