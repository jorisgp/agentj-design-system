import { Component, input, ViewEncapsulation } from "@angular/core";

export type BadgeVariant =
  | "neutral"
  | "primary"
  | "success"
  | "warning"
  | "danger";
export type BadgeSize = "sm" | "md";

@Component({
  selector: "jaids-badge",
  templateUrl: "./badge.html",
  styleUrl: "./badge.scss",
  encapsulation: ViewEncapsulation.None,
  standalone: true,
})
export class BadgeComponent {
  text = input<string>("Badge");
  variant = input<BadgeVariant>("neutral");
  size = input<BadgeSize>("md");
}
