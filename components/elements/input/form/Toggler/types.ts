export interface TogglerProps {
  label: string;
  defaultChecked: boolean;
  onClick: () => void;
  className?: string;
}
