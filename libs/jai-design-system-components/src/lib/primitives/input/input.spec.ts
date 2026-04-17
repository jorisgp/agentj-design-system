import { ComponentFixture, TestBed } from "@angular/core/testing";
import { InputComponent } from "./input";

describe("InputComponent", () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should render an input element", () => {
    const input = fixture.nativeElement.querySelector("input");
    expect(input).toBeTruthy();
  });

  it("should apply size class", () => {
    fixture.componentRef.setInput("size", "lg");
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector("input");
    expect(input.classList.contains("jaids-input--lg")).toBe(true);
  });

  it("should apply error class when error is set", () => {
    fixture.componentRef.setInput("error", "Required field");
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector("input");
    expect(input.classList.contains("jaids-input--error")).toBe(true);
  });

  it("should render label when provided", () => {
    fixture.componentRef.setInput("label", "Username");
    fixture.detectChanges();
    const label = fixture.nativeElement.querySelector(".jaids-input__label");
    expect(label.textContent).toContain("Username");
  });

  it("should show required indicator", () => {
    fixture.componentRef.setInput("label", "Email");
    fixture.componentRef.setInput("required", true);
    fixture.detectChanges();
    const required = fixture.nativeElement.querySelector(
      ".jaids-input__required",
    );
    expect(required).toBeTruthy();
  });

  it("should show error message", () => {
    fixture.componentRef.setInput("error", "Invalid email");
    fixture.detectChanges();
    const error = fixture.nativeElement.querySelector(".jaids-input__error");
    expect(error.textContent).toContain("Invalid email");
  });

  it("should show hint when no error", () => {
    fixture.componentRef.setInput("hint", "Enter your name");
    fixture.detectChanges();
    const hint = fixture.nativeElement.querySelector(".jaids-input__hint");
    expect(hint.textContent).toContain("Enter your name");
  });

  it("should emit valueChanged on input", () => {
    const spy = vi.fn();
    component.valueChanged.subscribe(spy);
    const input = fixture.nativeElement.querySelector("input");
    input.value = "test";
    input.dispatchEvent(new Event("input"));
    expect(spy).toHaveBeenCalledWith("test");
  });

  it("should update value via writeValue", () => {
    component.writeValue("hello");
    expect(component.value).toBe("hello");
  });
});
