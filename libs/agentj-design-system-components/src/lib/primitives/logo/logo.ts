import { Component, input, ViewEncapsulation } from "@angular/core";

export type LogoSize = "sm" | "md" | "lg";

@Component({
  selector: "agentjds-logo",
  templateUrl: "./logo.html",
  styleUrl: "./logo.scss",
  encapsulation: ViewEncapsulation.None,
  standalone: true,
})
export class LogoComponent {
  src = input<string>("");
  alt = input<string>("AgentJ logo");
  text = input<string>("AgentJ");
  mark = input<string>("AJ");
  size = input<LogoSize>("md");
}
