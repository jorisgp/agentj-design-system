import { ComponentFixture, TestBed } from "@angular/core/testing";
import { InputCheckboxComponent } from "./input-checkbox";

describe("InputCheckboxComponent", () => {
  let component: InputCheckboxComponent;
  let fixture: ComponentFixture<InputCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputCheckboxComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InputCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should render checkbox input", () => {
    const input = fixture.nativeElement.querySelector('input[type="checkbox"]');
    expect(input).toBeTruthy();
  });

  it("should emit checkedChanged on change", () => {
    const spy = vi.fn();
    component.checkedChanged.subscribe(spy);
    const input = fixture.nativeElement.querySelector('input[type="checkbox"]');
    input.checked = true;
    input.dispatchEvent(new Event("change"));
    expect(spy).toHaveBeenCalledWith(true);
  });

  it("should set checked from writeValue", () => {
    component.writeValue(true);
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input[type="checkbox"]');
    expect(input.checked).toBe(true);
  });
});
