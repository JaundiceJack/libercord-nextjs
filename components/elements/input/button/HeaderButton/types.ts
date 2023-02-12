export interface HeaderButtonProps {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  current: string;
  showArrow?: boolean;
  className?: string;
}
