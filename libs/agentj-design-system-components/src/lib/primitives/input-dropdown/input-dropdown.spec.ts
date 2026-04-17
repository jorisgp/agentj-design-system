import { ComponentFixture, TestBed } from "@angular/core/testing";
import { InputDropdownComponent } from "./input-dropdown";

describe("InputDropdownComponent", () => {
  let component: InputDropdownComponent;
  let fixture: ComponentFixture<InputDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputDropdownComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InputDropdownComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput("options", [
      { label: "Open", value: "open" },
      { label: "Closed", value: "closed" },
    ]);
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should render select options", () => {
    const options = fixture.nativeElement.querySelectorAll("option");
    expect(options.length).toBe(3);
  });

  it("should apply size class", () => {
    fixture.componentRef.setInput("size", "lg");
    fixture.detectChanges();
    const select = fixture.nativeElement.querySelector("select");
    expect(select.classList.contains("agentjds-input-dropdown--lg")).toBe(true);
  });

  it("should emit valueChanged on selection change", () => {
    const spy = vi.fn();
    component.valueChanged.subscribe(spy);
    const select = fixture.nativeElement.querySelector("select");
    select.value = "closed";
    select.dispatchEvent(new Event("change"));
    expect(spy).toHaveBeenCalledWith("closed");
  });
});
