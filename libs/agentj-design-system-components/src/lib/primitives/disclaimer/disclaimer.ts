import { Component, input, ViewEncapsulation } from "@angular/core";

@Component({
  selector: "agentjds-disclaimer",
  templateUrl: "./disclaimer.html",
  styleUrl: "./disclaimer.scss",
  encapsulation: ViewEncapsulation.None,
  standalone: true,
})
export class DisclaimerComponent {
  text = input<string>("");
  centered = input<boolean>(false);
}
