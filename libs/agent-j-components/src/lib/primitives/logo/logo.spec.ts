import { render } from '@testing-library/angular';
import { beforeEach, describe, expect, it } from 'vitest';
import { LogoComponent } from '.';

describe('LogoComponent', () => {
  let component: LogoComponent;
  let fixture: Awaited<ReturnType<typeof render<LogoComponent>>>['fixture'];
  let container: HTMLElement;

  function queryElement<T extends Element = HTMLElement>(selector: string): T {
    return container.querySelector(selector) as T;
  }

  beforeEach(async () => {
    const rendered = await render(LogoComponent);
    fixture = rendered.fixture;
    container = rendered.container;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render fallback wordmark when src is empty', () => {
    const fallback = queryElement('.agentjds-logo__fallback');
    expect(fallback).toBeTruthy();
    expect(fallback.textContent).toContain('AgentJ');
  });

  it('should render image when src is provided', () => {
    fixture.componentRef.setInput('src', '/logo.svg');
    fixture.detectChanges();
    const image = queryElement<HTMLImageElement>('.agentjds-logo__image');
    expect(image.style.display).toBe('block');
    expect(image.getAttribute('src')).toContain('/logo.svg');
  });

  it('should apply size class', () => {
    fixture.componentRef.setInput('size', 'lg');
    fixture.detectChanges();
    const root = queryElement('.agentjds-logo');
    expect(root.classList.contains('agentjds-logo--lg')).toBe(true);
  });
});
