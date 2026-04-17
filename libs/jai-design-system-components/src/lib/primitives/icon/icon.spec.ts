import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ICON_PATHS, IconComponent } from "./icon";

describe("IconComponent", () => {
  let component: IconComponent;
  let fixture: ComponentFixture<IconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should render an svg element", () => {
    const svg = fixture.nativeElement.querySelector("svg");
    expect(svg).toBeTruthy();
  });

  it("should apply size class", () => {
    fixture.componentRef.setInput("size", "lg");
    fixture.detectChanges();
    const svg = fixture.nativeElement.querySelector("svg");
    expect(svg.classList.contains("jaids-icon--lg")).toBe(true);
  });

  it("should apply color class", () => {
    fixture.componentRef.setInput("color", "danger");
    fixture.detectChanges();
    const svg = fixture.nativeElement.querySelector("svg");
    expect(svg.classList.contains("jaids-icon--danger")).toBe(true);
  });

  it("should render the correct path for a given icon name", () => {
    fixture.componentRef.setInput("name", "check");
    fixture.detectChanges();
    const path = fixture.nativeElement.querySelector("path");
    expect(path.getAttribute("d")).toBe(ICON_PATHS["check"]);
  });

  it("should set role to img when ariaLabel is provided", () => {
    fixture.componentRef.setInput("ariaLabel", "Close dialog");
    fixture.detectChanges();
    const svg = fixture.nativeElement.querySelector("svg");
    expect(svg.getAttribute("role")).toBe("img");
    expect(svg.getAttribute("aria-label")).toBe("Close dialog");
  });

  it("should set role to presentation when no ariaLabel", () => {
    fixture.detectChanges();
    const svg = fixture.nativeElement.querySelector("svg");
    expect(svg.getAttribute("role")).toBe("presentation");
  });
});
