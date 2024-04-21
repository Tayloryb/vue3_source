export interface Tutorial {
  target: HTMLElement | string;
  title?: string;
  content?: string;
  placement?: "top" | "bottom" | "left" | "right";
  offset?: number;
  delay?: number;
  disabled?: boolean;
}


