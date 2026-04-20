import { Component, input, ViewEncapsulation } from "@angular/core";

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type HeadingSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

@Component({
  selector: "agentjds-heading",
  templateUrl: "./heading.html",
  styleUrl: "./heading.scss",
  encapsulation: ViewEncapsulation.None,
  standalone: true,
})
export class HeadingComponent {
  level = input<HeadingLevel>(1);
  size = input<HeadingSize>("xl");
  muted = input<boolean>(false);
}
