import { ComponentFixture, TestBed } from "@angular/core/testing";
import { InputRadioComponent } from "./input-radio";

describe("InputRadioComponent", () => {
  let component: InputRadioComponent;
  let fixture: ComponentFixture<InputRadioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputRadioComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InputRadioComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput("options", [
      { label: "Yes", value: "yes" },
      { label: "No", value: "no" },
    ]);
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should render all options", () => {
    const radios = fixture.nativeElement.querySelectorAll('input[type="radio"]');
    expect(radios.length).toBe(2);
  });

  it("should emit valueChanged when option changes", () => {
    const spy = vi.fn();
    component.valueChanged.subscribe(spy);
    const firstRadio = fixture.nativeElement.querySelector('input[value="yes"]');
    firstRadio.click();
    expect(spy).toHaveBeenCalledWith("yes");
  });

  it("should apply checked state when writeValue is called", () => {
    component.writeValue("no");
    fixture.detectChanges();
    const secondRadio = fixture.nativeElement.querySelector('input[value="no"]');
    expect(secondRadio.checked).toBe(true);
  });
});
