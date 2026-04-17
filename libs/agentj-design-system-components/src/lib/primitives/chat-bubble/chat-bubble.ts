import { Component, input, ViewEncapsulation } from "@angular/core";

export type ChatBubbleDirection = "incoming" | "outgoing";
export type ChatBubbleTone = "neutral" | "primary" | "success" | "warning";

@Component({
  selector: "agentjds-chat-bubble",
  templateUrl: "./chat-bubble.html",
  styleUrl: "./chat-bubble.scss",
  encapsulation: ViewEncapsulation.None,
  standalone: true,
})
export class ChatBubbleComponent {
  message = input<string>("Hello there.");
  author = input<string>("");
  timestamp = input<string>("");
  direction = input<ChatBubbleDirection>("incoming");
  tone = input<ChatBubbleTone>("neutral");
}
