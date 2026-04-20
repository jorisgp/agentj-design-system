import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HeadingComponent } from "./heading";

describe("HeadingComponent", () => {
  let component: HeadingComponent;
  let fixture: ComponentFixture<HeadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeadingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should render an h1 by default", () => {
    const el = fixture.nativeElement.querySelector("h1");
    expect(el).toBeTruthy();
  });

  it("should render the correct heading level", () => {
    fixture.componentRef.setInput("level", 3);
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector("h3");
    expect(el).toBeTruthy();
  });

  it("should apply size class", () => {
    fixture.componentRef.setInput("size", "2xl");
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector("h1");
    expect(el.classList.contains("agentjds-heading--2xl")).toBe(true);
  });

  it("should apply muted class when muted is true", () => {
    fixture.componentRef.setInput("muted", true);
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector("h1");
    expect(el.classList.contains("agentjds-heading--muted")).toBe(true);
  });
});
