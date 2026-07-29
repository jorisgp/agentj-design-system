import { render } from "@testing-library/angular";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ChatInputComponent } from ".";

describe("ChatInputComponent", () => {
  let component: ChatInputComponent;
  let fixture: Awaited<ReturnType<typeof render<ChatInputComponent>>>["fixture"];
  let container: HTMLElement;

  function queryElement<T extends Element = HTMLElement>(selector: string): T {
    return container.querySelector(selector) as T;
  }

  beforeEach(async () => {
    const rendered = await render(ChatInputComponent);
    fixture = rendered.fixture;
    container = rendered.container;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should render a textarea", () => {
    const textarea = queryElement<HTMLTextAreaElement>("textarea");
    expect(textarea).toBeTruthy();
  });

  it("should apply the placeholder", () => {
    fixture.componentRef.setInput("placeholder", "Ask anything...");
    fixture.detectChanges();
    const textarea = queryElement<HTMLTextAreaElement>("textarea");
    expect(textarea.placeholder).toBe("Ask anything...");
  });

  it("should emit submitted with trimmed value", () => {
    const spy = vi.fn();
    component.submitted.subscribe(spy);
    component.value.set("Hello world");
    component.submit();
    expect(spy).toHaveBeenCalledWith("Hello world");
  });

  it("should not emit submitted when value is empty", () => {
    const spy = vi.fn();
    component.submitted.subscribe(spy);
    component.value.set("  ");
    component.submit();
    expect(spy).not.toHaveBeenCalled();
  });

  it("should clear value after submit", () => {
    component.value.set("Hello");
    component.submit();
    expect(component.value()).toBe("");
  });

  it("should emit attachClicked when attach button is clicked", () => {
    const spy = vi.fn();
    component.attachClicked.subscribe(spy);
    const attachBtn = queryElement<HTMLButtonElement>(
      ".agentjds-chat-input__attach button",
    );
    attachBtn.click();
    expect(spy).toHaveBeenCalled();
  });
});
