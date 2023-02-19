export type GraphOptionToggleProps = {
  label: string;
  selected: string;
  options: string[];
  toggleOption: (option: string) => void;
  className?: string;
};
