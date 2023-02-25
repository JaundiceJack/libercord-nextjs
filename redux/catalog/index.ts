import { ReduxState } from "../store";
import { catalogSlice } from "./slice";

export {
  getInitialCatalog,
  addItemToCatalog,
  editCatalogItem,
  deleteCatalogItem,
} from "./actions/network/requests";

export const selectCatalog = (state: ReduxState) => state.catalog;

export const {
  resetCatalog,
  toggleAddingCatalog,
  toggleEditingCatalog,
  toggleDeletingCatalog,
  clearCatalogError,
} = catalogSlice.actions;

export default catalogSlice.reducer;
