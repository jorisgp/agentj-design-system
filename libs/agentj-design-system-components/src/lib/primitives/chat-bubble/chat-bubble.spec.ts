import { render } from "@testing-library/angular";
import { beforeEach, describe, expect, it } from "vitest";
import { ChatBubbleComponent } from ".";

describe("ChatBubbleComponent", () => {
  let component: ChatBubbleComponent;
  let fixture: Awaited<ReturnType<typeof render<ChatBubbleComponent>>>["fixture"];
  let container: HTMLElement;

  function queryElement<T extends Element = HTMLElement>(selector: string): T {
    return container.querySelector(selector) as T;
  }

  beforeEach(async () => {
    const rendered = await render(ChatBubbleComponent);
    fixture = rendered.fixture;
    container = rendered.container;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should render the message text", () => {
    fixture.componentRef.setInput("message", "Hello world");
    fixture.detectChanges();
    const message = queryElement(
      ".agentjds-chat-bubble__message",
    );
    expect(message.textContent.trim()).toBe("Hello world");
  });

  it("should apply outgoing class", () => {
    fixture.componentRef.setInput("direction", "outgoing");
    fixture.detectChanges();
    const bubble = queryElement(".agentjds-chat-bubble");
    expect(bubble.classList.contains("agentjds-chat-bubble--outgoing")).toBe(
      true,
    );
  });

  it("should show meta info when author and timestamp are provided", () => {
    fixture.componentRef.setInput("author", "Sam");
    fixture.componentRef.setInput("timestamp", "11:20");
    fixture.detectChanges();
    const meta = queryElement(
      ".agentjds-chat-bubble__meta",
    );
    expect(meta.textContent).toContain("Sam");
    expect(meta.textContent).toContain("11:20");
  });
});
