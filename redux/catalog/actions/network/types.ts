interface CatalogRequestCommons {
  section: string;
  field: string;
}

interface CatalogRequestItem {
  item: string;
}

interface CatalogRequestEditItem {
  oldItem: string;
  newItem: string;
}

export type AddRemoveProps = CatalogRequestCommons & CatalogRequestItem;

export type EditProps = CatalogRequestCommons & CatalogRequestEditItem;
