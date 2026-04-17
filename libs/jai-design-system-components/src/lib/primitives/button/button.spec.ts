import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ButtonComponent } from "./button";

describe("ButtonComponent", () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
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
    fixture.componentRef.setInput("variant", "danger");
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector("button");
    expect(button.classList.contains("jaids-button--danger")).toBe(true);
  });

  it("should apply size class", () => {
    fixture.componentRef.setInput("size", "lg");
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector("button");
    expect(button.classList.contains("jaids-button--lg")).toBe(true);
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
    const button = fixture.nativeElement.querySelector("button");
    button.click();
    expect(spy).toHaveBeenCalled();
  });

  it("should set button type", () => {
    fixture.componentRef.setInput("type", "submit");
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector("button");
    expect(button.type).toBe("submit");
  });
});
