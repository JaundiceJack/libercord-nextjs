interface ContentProps {
  title?: string;
  showClose?: boolean;
  children?: React.ReactNode;
}

export interface ToggleProps {
  opened: boolean;
  toggle: () => void;
}

export type ModalProps = ContentProps & ToggleProps;
