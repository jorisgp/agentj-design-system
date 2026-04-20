import { ComponentFixture, TestBed } from "@angular/core/testing";
import { IconButtonComponent } from "./icon-button";

describe("IconButtonComponent", () => {
  let component: IconButtonComponent;
  let fixture: ComponentFixture<IconButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IconButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should render a button element", () => {
    const button = fixture.nativeElement.querySelector("button");
    expect(button).toBeTruthy();
  });

  it("should apply variant class", () => {
    fixture.componentRef.setInput("variant", "primary");
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector("button");
    expect(button.classList.contains("agentjds-icon-button--primary")).toBe(
      true,
    );
  });

  it("should apply shape class", () => {
    fixture.componentRef.setInput("shape", "circle");
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector("button");
    expect(button.classList.contains("agentjds-icon-button--circle")).toBe(
      true,
    );
  });

  it("should be disabled when disabled input is true", () => {
    fixture.componentRef.setInput("disabled", true);
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector("button");
    expect(button.disabled).toBe(true);
  });

  it("should emit clicked on click", () => {
    const spy = vi.fn();
    component.clicked.subscribe(spy);
    fixture.nativeElement.querySelector("button").click();
    expect(spy).toHaveBeenCalled();
  });
});
