import { Component, input, ViewEncapsulation } from "@angular/core";

@Component({
  selector: "agentjds-background",
  templateUrl: "./background.html",
  styleUrl: "./background.scss",
  encapsulation: ViewEncapsulation.None,
  standalone: true,
})
export class BackgroundComponent {
  color = input<string>("var(--agentj-color-bg, #ffffff)");
}
