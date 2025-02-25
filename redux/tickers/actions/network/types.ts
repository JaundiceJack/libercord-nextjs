interface TickersRequestCommons {
  section: string;
  field: string;
}

interface TickersRequestItem {
  item: string;
}

interface TickersRequestEditItem {
  oldItem: string;
  newItem: string;
}

export type AddRemoveProps = TickersRequestCommons & TickersRequestItem;

export type EditProps = TickersRequestCommons & TickersRequestEditItem;
