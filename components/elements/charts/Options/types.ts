export interface OptionButtonProps {}

export interface OptionsProps {
  toggleFilter: () => void;
  toggleChart: () => void;
  filters: ("source" | "category" | "location")[];
  currentFilter: "source" | "category" | "location";
  currentChart: "bar" | "pie";
}
