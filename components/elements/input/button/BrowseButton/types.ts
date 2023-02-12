export interface BrowseButtonProps {
  type?: "button" | "submit" | "reset" | undefined;
  onClick: () => void;
  direction?: "next" | "prev";
  color?: string;
  title: string;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
}
