import { render } from '@testing-library/angular';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { InputCheckboxComponent } from '.';

describe('InputCheckboxComponent', () => {
  let component: InputCheckboxComponent;
  let fixture: Awaited<
    ReturnType<typeof render<InputCheckboxComponent>>
  >['fixture'];
  let container: HTMLElement;

  function queryElement<T extends Element = HTMLElement>(selector: string): T {
    return container.querySelector(selector) as T;
  }

  beforeEach(async () => {
    const rendered = await render(InputCheckboxComponent);
    fixture = rendered.fixture;
    container = rendered.container;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render checkbox input', () => {
    const input = queryElement<HTMLInputElement>('input[type="checkbox"]');
    expect(input).toBeTruthy();
  });

  it('should emit checkedChanged on change', () => {
    const spy = vi.fn();
    component.checkedChanged.subscribe(spy);
    const input = queryElement<HTMLInputElement>('input[type="checkbox"]');
    input.checked = true;
    input.dispatchEvent(new Event('change'));
    expect(spy).toHaveBeenCalledWith(true);
  });

  it('should set checked from writeValue', () => {
    component.writeValue(true);
    expect(component.checked).toBe(true);
  });
});
