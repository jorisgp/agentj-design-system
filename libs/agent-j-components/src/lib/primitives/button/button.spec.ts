import { render } from '@testing-library/angular';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ButtonComponent } from '.';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: Awaited<ReturnType<typeof render<ButtonComponent>>>['fixture'];
  let container: HTMLElement;

  function queryElement<T extends Element = HTMLElement>(selector: string): T {
    return container.querySelector(selector) as T;
  }

  beforeEach(async () => {
    const rendered = await render(ButtonComponent);
    fixture = rendered.fixture;
    container = rendered.container;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a button element', () => {
    const button = queryElement<HTMLButtonElement>('button');
    expect(button).toBeTruthy();
  });

  it('should apply variant class', () => {
    fixture.componentRef.setInput('variant', 'danger');
    fixture.detectChanges();
    const button = queryElement<HTMLButtonElement>('button');
    expect(button.classList.contains('agentjds-button--danger')).toBe(true);
  });

  it('should apply size class', () => {
    fixture.componentRef.setInput('size', 'lg');
    fixture.detectChanges();
    const button = queryElement<HTMLButtonElement>('button');
    expect(button.classList.contains('agentjds-button--lg')).toBe(true);
  });

  it('should be disabled when disabled input is true', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    const button = queryElement<HTMLButtonElement>('button');
    expect(button.disabled).toBe(true);
  });

  it('should emit clicked on click', () => {
    const spy = vi.fn();
    component.clicked.subscribe(spy);
    const button = queryElement<HTMLButtonElement>('button');
    button.click();
    expect(spy).toHaveBeenCalled();
  });

  it('should set button type', () => {
    fixture.componentRef.setInput('type', 'submit');
    fixture.detectChanges();
    const button = queryElement<HTMLButtonElement>('button');
    expect(button.type).toBe('submit');
  });
});
