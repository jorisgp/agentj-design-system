import { render } from '@testing-library/angular';
import { beforeEach, describe, expect, it } from 'vitest';
import { DisclaimerComponent } from '.';

describe('DisclaimerComponent', () => {
  let component: DisclaimerComponent;
  let fixture: Awaited<
    ReturnType<typeof render<DisclaimerComponent>>
  >['fixture'];
  let container: HTMLElement;

  function queryElement<T extends Element = HTMLElement>(selector: string): T {
    return container.querySelector(selector) as T;
  }

  beforeEach(async () => {
    const rendered = await render(DisclaimerComponent);
    fixture = rendered.fixture;
    container = rendered.container;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render text from input', () => {
    fixture.componentRef.setInput('text', 'Disclaimer text here.');
    fixture.detectChanges();
    const el = queryElement('p');
    expect(el.textContent.trim()).toBe('Disclaimer text here.');
  });

  it('should apply centered class when centered is true', () => {
    fixture.componentRef.setInput('centered', true);
    fixture.detectChanges();
    const el = queryElement('p');
    expect(el.classList.contains('agentjds-disclaimer--centered')).toBe(true);
  });
});
