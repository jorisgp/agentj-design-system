import { render } from '@testing-library/angular';
import { beforeEach, describe, expect, it } from 'vitest';
import { BadgeComponent } from '.';

describe('BadgeComponent', () => {
  let component: BadgeComponent;
  let fixture: Awaited<ReturnType<typeof render<BadgeComponent>>>['fixture'];
  let container: HTMLElement;

  function queryElement<T extends Element = HTMLElement>(selector: string): T {
    return container.querySelector(selector) as T;
  }

  beforeEach(async () => {
    const rendered = await render(BadgeComponent);
    fixture = rendered.fixture;
    container = rendered.container;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render text', () => {
    fixture.componentRef.setInput('text', 'New');
    fixture.detectChanges();
    const badge = queryElement('.agentjds-badge');
    expect(badge.textContent.trim()).toBe('New');
  });

  it('should apply variant class', () => {
    fixture.componentRef.setInput('variant', 'danger');
    fixture.detectChanges();
    const badge = queryElement('.agentjds-badge');
    expect(badge.classList.contains('agentjds-badge--danger')).toBe(true);
  });
});
