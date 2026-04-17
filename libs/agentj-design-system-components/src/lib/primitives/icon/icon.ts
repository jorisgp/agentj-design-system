import { Component, input, ViewEncapsulation } from "@angular/core";

export type IconName =
  | "close"
  | "check"
  | "info"
  | "warning"
  | "error"
  | "search"
  | "menu"
  | "arrow-down"
  | "arrow-up"
  | "star"
  | "plus"
  | "minus";

export type IconSize = "xs" | "sm" | "md" | "lg" | "xl";
export type IconColor =
  | "primary"
  | "secondary"
  | "danger"
  | "success"
  | "warning"
  | "inherit";

export const ICON_PATHS: Record<IconName, string> = {
  close:
    "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z",
  check: "M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z",
  info: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z",
  warning: "M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z",
  error:
    "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z",
  search:
    "M15.5 14h-.79l-.28-.27A6.47 6.47 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z",
  menu: "M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z",
  "arrow-down": "M7 10l5 5 5-5z",
  "arrow-up": "M7 14l5-5 5 5z",
  star: "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z",
  plus: "M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z",
  minus: "M19 13H5v-2h14v2z",
};

@Component({
  selector: "agentjds-icon",
  templateUrl: "./icon.html",
  styleUrl: "./icon.scss",
  encapsulation: ViewEncapsulation.None,
  standalone: true,
})
export class IconComponent {
  name = input<IconName>("info");
  size = input<IconSize>("md");
  color = input<IconColor>("inherit");
  ariaLabel = input<string>("");

  get path(): string {
    return ICON_PATHS[this.name()] ?? "";
  }
}
