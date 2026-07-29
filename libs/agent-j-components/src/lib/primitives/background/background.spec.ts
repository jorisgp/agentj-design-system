import { render } from '@testing-library/angular';
import { beforeEach, describe, expect, it } from 'vitest';
import { BackgroundComponent } from '.';

describe('BackgroundComponent', () => {
  let component: BackgroundComponent;
  let fixture: Awaited<
    ReturnType<typeof render<BackgroundComponent>>
  >['fixture'];
  let container: HTMLElement;

  function queryElement<T extends Element = HTMLElement>(selector: string): T {
    return container.querySelector(selector) as T;
  }

  beforeEach(async () => {
    const rendered = await render(BackgroundComponent);
    fixture = rendered.fixture;
    container = rendered.container;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render background container', () => {
    const background = queryElement('.agentjds-background');
    expect(background).toBeTruthy();
  });

  it('should apply custom color', () => {
    fixture.componentRef.setInput('color', '#f4f7fb');
    fixture.detectChanges();
    const background = queryElement('.agentjds-background') as HTMLElement;
    expect(background.style.backgroundColor).toBe('rgb(244, 247, 251)');
  });
});
