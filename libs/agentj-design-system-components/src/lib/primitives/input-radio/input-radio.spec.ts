import { render } from "@testing-library/angular";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { InputRadioComponent } from ".";

describe("InputRadioComponent", () => {
  let component: InputRadioComponent;
  let fixture: Awaited<ReturnType<typeof render<InputRadioComponent>>>["fixture"];
  let container: HTMLElement;

  function queryElement<T extends Element = HTMLElement>(selector: string): T {
    return container.querySelector(selector) as T;
  }

  beforeEach(async () => {
    const rendered = await render(InputRadioComponent);
    fixture = rendered.fixture;
    container = rendered.container;
    component = fixture.componentInstance;
    fixture.componentRef.setInput("options", [
      { label: "Yes", value: "yes" },
      { label: "No", value: "no" },
    ]);
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should render all options", () => {
    const radios = container.querySelectorAll('input[type="radio"]');
    expect(radios.length).toBe(2);
  });

  it("should emit valueChanged when option changes", () => {
    const spy = vi.fn();
    component.valueChanged.subscribe(spy);
    const firstRadio = queryElement<HTMLInputElement>('input[value="yes"]');
    firstRadio.click();
    expect(spy).toHaveBeenCalledWith("yes");
  });

  it("should apply checked state when writeValue is called", () => {
    component.writeValue("no");
    expect(component.value).toBe("no");
  });
});
