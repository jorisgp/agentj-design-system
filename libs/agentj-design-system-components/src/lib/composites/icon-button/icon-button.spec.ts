import { render } from "@testing-library/angular";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { IconButtonComponent } from ".";

describe("IconButtonComponent", () => {
  let component: IconButtonComponent;
  let fixture: Awaited<ReturnType<typeof render<IconButtonComponent>>>["fixture"];
  let container: HTMLElement;

  function queryElement<T extends Element = HTMLElement>(selector: string): T {
    return container.querySelector(selector) as T;
  }

  beforeEach(async () => {
    const rendered = await render(IconButtonComponent);
    fixture = rendered.fixture;
    container = rendered.container;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should render a button element", () => {
    const button = queryElement<HTMLButtonElement>("button");
    expect(button).toBeTruthy();
  });

  it("should apply variant class", () => {
    fixture.componentRef.setInput("variant", "primary");
    fixture.detectChanges();
    const button = queryElement<HTMLButtonElement>("button");
    expect(button.classList.contains("agentjds-icon-button--primary")).toBe(
      true,
    );
  });

  it("should apply shape class", () => {
    fixture.componentRef.setInput("shape", "circle");
    fixture.detectChanges();
    const button = queryElement<HTMLButtonElement>("button");
    expect(button.classList.contains("agentjds-icon-button--circle")).toBe(
      true,
    );
  });

  it("should be disabled when disabled input is true", () => {
    fixture.componentRef.setInput("disabled", true);
    fixture.detectChanges();
    const button = queryElement<HTMLButtonElement>("button");
    expect(button.disabled).toBe(true);
  });

  it("should emit clicked on click", () => {
    const spy = vi.fn();
    component.clicked.subscribe(spy);
    queryElement("button").click();
    expect(spy).toHaveBeenCalled();
  });
});
