import { ComponentFixture, TestBed } from "@angular/core/testing";
import { BackgroundComponent } from "./background";

describe("BackgroundComponent", () => {
  let component: BackgroundComponent;
  let fixture: ComponentFixture<BackgroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackgroundComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should render background container", () => {
    const background = fixture.nativeElement.querySelector(".agentjds-background");
    expect(background).toBeTruthy();
  });

  it("should apply custom color", () => {
    fixture.componentRef.setInput("color", "#f4f7fb");
    fixture.detectChanges();
    const background = fixture.nativeElement.querySelector(
      ".agentjds-background",
    ) as HTMLElement;
    expect(background.style.backgroundColor).toBe("rgb(244, 247, 251)");
  });
});
