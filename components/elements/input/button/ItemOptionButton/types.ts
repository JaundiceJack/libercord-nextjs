export interface IOButtonProps {
  title?: string;
  icon: React.ReactNode;
  color: string;
  onClick?: () => void;
  disabled?: boolean;
}

export interface IOButtonHintProps {
  label?: string;
}

export type ItemOptionButtonProps = IOButtonProps &
  IOButtonHintProps & {
    className?: string;
  };
