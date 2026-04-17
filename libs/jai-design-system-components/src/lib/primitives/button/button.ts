import { Component, input, output, ViewEncapsulation } from "@angular/core";

export type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

@Component({
  selector: "jaids-button",
  templateUrl: "./button.html",
  styleUrl: "./button.scss",
  encapsulation: ViewEncapsulation.None,
  standalone: true,
})
export class ButtonComponent {
  type = input<"button" | "submit" | "reset">("button");
  variant = input<ButtonVariant>("primary");
  size = input<ButtonSize>("md");
  disabled = input<boolean>(false);

  clicked = output<MouseEvent>();
}
