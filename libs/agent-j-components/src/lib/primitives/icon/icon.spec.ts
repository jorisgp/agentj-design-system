import { render } from '@testing-library/angular';
import { beforeEach, describe, expect, it } from 'vitest';
import { ICON_PATHS, IconComponent } from '.';

describe('IconComponent', () => {
  let component: IconComponent;
  let fixture: Awaited<ReturnType<typeof render<IconComponent>>>['fixture'];
  let container: HTMLElement;

  function queryElement<T extends Element = HTMLElement>(selector: string): T {
    return container.querySelector(selector) as T;
  }

  beforeEach(async () => {
    const rendered = await render(IconComponent);
    fixture = rendered.fixture;
    container = rendered.container;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render an svg element', () => {
    const svg = queryElement('svg');
    expect(svg).toBeTruthy();
  });

  it('should apply size class', () => {
    fixture.componentRef.setInput('size', 'lg');
    fixture.detectChanges();
    const svg = queryElement('svg');
    expect(svg.classList.contains('agentjds-icon--lg')).toBe(true);
  });

  it('should apply color class', () => {
    fixture.componentRef.setInput('color', 'danger');
    fixture.detectChanges();
    const svg = queryElement('svg');
    expect(svg.classList.contains('agentjds-icon--danger')).toBe(true);
  });

  it('should render the correct path for a given icon name', () => {
    fixture.componentRef.setInput('name', 'check');
    fixture.detectChanges();
    const path = queryElement('path');
    expect(path.getAttribute('d')).toBe(ICON_PATHS['check']);
  });

  it('should set role to img when ariaLabel is provided', () => {
    fixture.componentRef.setInput('ariaLabel', 'Close dialog');
    fixture.detectChanges();
    const svg = queryElement('svg');
    expect(svg.getAttribute('role')).toBe('img');
    expect(svg.getAttribute('aria-label')).toBe('Close dialog');
  });

  it('should set role to presentation when no ariaLabel', () => {
    fixture.detectChanges();
    const svg = queryElement('svg');
    expect(svg.getAttribute('role')).toBe('presentation');
  });
});
