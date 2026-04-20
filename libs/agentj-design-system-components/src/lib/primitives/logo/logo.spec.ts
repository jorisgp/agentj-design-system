import { ComponentFixture, TestBed } from "@angular/core/testing";
import { LogoComponent } from "./logo";

describe("LogoComponent", () => {
  let component: LogoComponent;
  let fixture: ComponentFixture<LogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should render fallback wordmark when src is empty", () => {
    const fallback = fixture.nativeElement.querySelector(".agentjds-logo__fallback");
    expect(fallback).toBeTruthy();
    expect(fallback.textContent).toContain("AgentJ");
  });

  it("should render image when src is provided", () => {
    fixture.componentRef.setInput("src", "/logo.svg");
    fixture.detectChanges();
    const image = fixture.nativeElement.querySelector(
      ".agentjds-logo__image",
    ) as HTMLImageElement;
    expect(image.style.display).toBe("block");
    expect(image.getAttribute("src")).toContain("/logo.svg");
  });

  it("should apply size class", () => {
    fixture.componentRef.setInput("size", "lg");
    fixture.detectChanges();
    const root = fixture.nativeElement.querySelector(".agentjds-logo");
    expect(root.classList.contains("agentjds-logo--lg")).toBe(true);
  });
});
