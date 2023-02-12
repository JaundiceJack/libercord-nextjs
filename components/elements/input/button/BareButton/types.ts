export interface BareButtonProps {
  label?: string;
  title?: string;
  icon?: React.ReactNode;
  color: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  active?: boolean;
}
