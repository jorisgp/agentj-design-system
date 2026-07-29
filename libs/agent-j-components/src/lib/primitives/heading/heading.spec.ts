import { render } from '@testing-library/angular';
import { beforeEach, describe, expect, it } from 'vitest';
import { HeadingComponent } from '.';

describe('HeadingComponent', () => {
  let component: HeadingComponent;
  let fixture: Awaited<ReturnType<typeof render<HeadingComponent>>>['fixture'];
  let container: HTMLElement;

  function queryElement<T extends Element = HTMLElement>(selector: string): T {
    return container.querySelector(selector) as T;
  }

  beforeEach(async () => {
    const rendered = await render(HeadingComponent);
    fixture = rendered.fixture;
    container = rendered.container;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render an h1 by default', () => {
    const el = queryElement('h1');
    expect(el).toBeTruthy();
  });

  it('should render the correct heading level', () => {
    fixture.componentRef.setInput('level', 3);
    fixture.detectChanges();
    const el = queryElement('h3');
    expect(el).toBeTruthy();
  });

  it('should apply size class', () => {
    fixture.componentRef.setInput('size', '2xl');
    fixture.detectChanges();
    const el = queryElement('h1');
    expect(el.classList.contains('agentjds-heading--2xl')).toBe(true);
  });

  it('should apply muted class when muted is true', () => {
    fixture.componentRef.setInput('muted', true);
    fixture.detectChanges();
    const el = queryElement('h1');
    expect(el.classList.contains('agentjds-heading--muted')).toBe(true);
  });
});
