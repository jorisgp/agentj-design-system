import { ComponentFixture, TestBed } from "@angular/core/testing";
import { DisclaimerComponent } from "./disclaimer";

describe("DisclaimerComponent", () => {
  let component: DisclaimerComponent;
  let fixture: ComponentFixture<DisclaimerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisclaimerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DisclaimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should render text from input", () => {
    fixture.componentRef.setInput("text", "Disclaimer text here.");
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector("p");
    expect(el.textContent.trim()).toBe("Disclaimer text here.");
  });

  it("should apply centered class when centered is true", () => {
    fixture.componentRef.setInput("centered", true);
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector("p");
    expect(el.classList.contains("agentjds-disclaimer--centered")).toBe(true);
  });
});
