import { ComponentFixture, TestBed } from "@angular/core/testing";
import { BadgeComponent } from "./badge";

describe("BadgeComponent", () => {
  let component: BadgeComponent;
  let fixture: ComponentFixture<BadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BadgeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should render text", () => {
    fixture.componentRef.setInput("text", "New");
    fixture.detectChanges();
    const badge = fixture.nativeElement.querySelector(".jaids-badge");
    expect(badge.textContent.trim()).toBe("New");
  });

  it("should apply variant class", () => {
    fixture.componentRef.setInput("variant", "danger");
    fixture.detectChanges();
    const badge = fixture.nativeElement.querySelector(".jaids-badge");
    expect(badge.classList.contains("jaids-badge--danger")).toBe(true);
  });
});
