import { render } from "@testing-library/angular";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { InputComponent } from ".";

describe("InputComponent", () => {
  let component: InputComponent;
  let fixture: Awaited<ReturnType<typeof render<InputComponent>>>["fixture"];
  let container: HTMLElement;

  function queryElement<T extends Element = HTMLElement>(selector: string): T {
    return container.querySelector(selector) as T;
  }

  beforeEach(async () => {
    const rendered = await render(InputComponent);
    fixture = rendered.fixture;
    container = rendered.container;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should render an input element", () => {
    const input = queryElement<HTMLInputElement>("input");
    expect(input).toBeTruthy();
  });

  it("should apply size class", () => {
    fixture.componentRef.setInput("size", "lg");
    fixture.detectChanges();
    const input = queryElement<HTMLInputElement>("input");
    expect(input.classList.contains("agentjds-input--lg")).toBe(true);
  });

  it("should apply error class when error is set", () => {
    fixture.componentRef.setInput("error", "Required field");
    fixture.detectChanges();
    const input = queryElement<HTMLInputElement>("input");
    expect(input.classList.contains("agentjds-input--error")).toBe(true);
  });

  it("should render label when provided", () => {
    fixture.componentRef.setInput("label", "Username");
    fixture.detectChanges();
    const label = queryElement(".agentjds-input__label");
    expect(label.textContent).toContain("Username");
  });

  it("should show required indicator", () => {
    fixture.componentRef.setInput("label", "Email");
    fixture.componentRef.setInput("required", true);
    fixture.detectChanges();
    const required = queryElement(
      ".agentjds-input__required",
    );
    expect(required).toBeTruthy();
  });

  it("should show error message", () => {
    fixture.componentRef.setInput("error", "Invalid email");
    fixture.detectChanges();
    const error = queryElement(".agentjds-input__error");
    expect(error.textContent).toContain("Invalid email");
  });

  it("should show hint when no error", () => {
    fixture.componentRef.setInput("hint", "Enter your name");
    fixture.detectChanges();
    const hint = queryElement(".agentjds-input__hint");
    expect(hint.textContent).toContain("Enter your name");
  });

  it("should emit valueChanged on input", () => {
    const spy = vi.fn();
    component.valueChanged.subscribe(spy);
    const input = queryElement<HTMLInputElement>("input");
    input.value = "test";
    input.dispatchEvent(new Event("input"));
    expect(spy).toHaveBeenCalledWith("test");
  });

  it("should update value via writeValue", () => {
    component.writeValue("hello");
    expect(component.value).toBe("hello");
  });
});
