import { CatalogState, initialState } from "../../slice";

export default {
  resetCatalog: (state: CatalogState) => {
    state = initialState;
  },
  toggleAddingCatalog: (state: CatalogState) => {
    state.catalogMode = "adding";
  },
  toggleEditingCatalog: (state: CatalogState) => {
    state.catalogMode = "editing";
  },
  toggleDeletingCatalog: (state: CatalogState) => {
    state.catalogMode = "deleting";
  },
  clearCatalogError: (state: CatalogState) => {
    state.catalogError = undefined;
  },
};
