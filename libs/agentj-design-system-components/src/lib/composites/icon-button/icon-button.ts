import { Component, input, output, ViewEncapsulation } from "@angular/core";
import { ButtonSize, ButtonVariant } from "../../primitives/button/button";
import { IconComponent, IconName } from "../../primitives/icon/icon";

export type IconButtonShape = "circle" | "square";

@Component({
  selector: "agentjds-icon-button",
  templateUrl: "./icon-button.html",
  styleUrl: "./icon-button.scss",
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [IconComponent],
})
export class IconButtonComponent {
  icon = input<IconName>("plus");
  variant = input<ButtonVariant>("secondary");
  size = input<ButtonSize>("md");
  shape = input<IconButtonShape>("square");
  disabled = input<boolean>(false);
  type = input<"button" | "submit" | "reset">("button");
  ariaLabel = input<string>("");

  clicked = output<MouseEvent>();
}
