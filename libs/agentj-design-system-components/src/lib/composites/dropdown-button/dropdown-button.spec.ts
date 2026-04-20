import { ComponentFixture, TestBed } from "@angular/core/testing";
import { DropdownButtonComponent } from "./dropdown-button";

describe("DropdownButtonComponent", () => {
  let component: DropdownButtonComponent;
  let fixture: ComponentFixture<DropdownButtonComponent>;

  const testOptions = [
    { label: "Claude Opus 4.1", value: "claude-opus-4-1" },
    { label: "Claude Sonnet", value: "claude-sonnet" },
    { label: "GPT-4o", value: "gpt-4o" },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdownButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DropdownButtonComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput("options", testOptions);
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should render a trigger button", () => {
    const button = fixture.nativeElement.querySelector(
      ".agentjds-dropdown-button__trigger",
    );
    expect(button).toBeTruthy();
  });

  it("should show label text", () => {
    fixture.componentRef.setInput("label", "Claude Opus 4.1");
    fixture.detectChanges();
    const label = fixture.nativeElement.querySelector(
      ".agentjds-dropdown-button__label",
    );
    expect(label.textContent.trim()).toBe("Claude Opus 4.1");
  });

  it("should toggle menu on trigger click", () => {
    const trigger = fixture.nativeElement.querySelector(
      ".agentjds-dropdown-button__trigger",
    );
    trigger.click();
    fixture.detectChanges();
    const menu = fixture.nativeElement.querySelector(
      ".agentjds-dropdown-button__menu",
    );
    expect(menu).toBeTruthy();
  });

  it("should emit optionSelected when an option is clicked", () => {
    const spy = vi.fn();
    component.optionSelected.subscribe(spy);
    component.toggle();
    fixture.detectChanges();
    const option = fixture.nativeElement.querySelector(
      ".agentjds-dropdown-button__option",
    );
    option.click();
    expect(spy).toHaveBeenCalledWith("claude-opus-4-1");
  });

  it("should close menu after selecting an option", () => {
    component.toggle();
    fixture.detectChanges();
    const option = fixture.nativeElement.querySelector(
      ".agentjds-dropdown-button__option",
    );
    option.click();
    fixture.detectChanges();
    const menu = fixture.nativeElement.querySelector(
      ".agentjds-dropdown-button__menu",
    );
    expect(menu).toBeFalsy();
  });
});
