import { render } from '@testing-library/angular';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { InputDropdownComponent } from '.';

describe('InputDropdownComponent', () => {
  let component: InputDropdownComponent;
  let fixture: Awaited<
    ReturnType<typeof render<InputDropdownComponent>>
  >['fixture'];
  let container: HTMLElement;

  function queryElement<T extends Element = HTMLElement>(selector: string): T {
    return container.querySelector(selector) as T;
  }

  beforeEach(async () => {
    const rendered = await render(InputDropdownComponent);
    fixture = rendered.fixture;
    container = rendered.container;
    component = fixture.componentInstance;
    fixture.componentRef.setInput('options', [
      { label: 'Open', value: 'open' },
      { label: 'Closed', value: 'closed' },
    ]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render select options', () => {
    const options = container.querySelectorAll('option');
    expect(options.length).toBe(3);
  });

  it('should apply size class', () => {
    fixture.componentRef.setInput('size', 'lg');
    fixture.detectChanges();
    const select = queryElement<HTMLSelectElement>('select');
    expect(select.classList.contains('agentjds-input-dropdown--lg')).toBe(true);
  });

  it('should emit valueChanged on selection change', () => {
    const spy = vi.fn();
    component.valueChanged.subscribe(spy);
    const select = queryElement<HTMLSelectElement>('select');
    select.value = 'closed';
    select.dispatchEvent(new Event('change'));
    expect(spy).toHaveBeenCalledWith('closed');
  });
});
