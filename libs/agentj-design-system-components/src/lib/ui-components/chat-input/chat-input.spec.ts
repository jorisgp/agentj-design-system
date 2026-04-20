import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ChatInputComponent } from "./chat-input";

describe("ChatInputComponent", () => {
  let component: ChatInputComponent;
  let fixture: ComponentFixture<ChatInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should render a textarea", () => {
    const textarea = fixture.nativeElement.querySelector("textarea");
    expect(textarea).toBeTruthy();
  });

  it("should apply the placeholder", () => {
    fixture.componentRef.setInput("placeholder", "Ask anything...");
    fixture.detectChanges();
    const textarea = fixture.nativeElement.querySelector("textarea");
    expect(textarea.placeholder).toBe("Ask anything...");
  });

  it("should emit submitted with trimmed value", () => {
    const spy = vi.fn();
    component.submitted.subscribe(spy);
    component.value.set("Hello world");
    component.submit();
    expect(spy).toHaveBeenCalledWith("Hello world");
  });

  it("should not emit submitted when value is empty", () => {
    const spy = vi.fn();
    component.submitted.subscribe(spy);
    component.value.set("  ");
    component.submit();
    expect(spy).not.toHaveBeenCalled();
  });

  it("should clear value after submit", () => {
    component.value.set("Hello");
    component.submit();
    expect(component.value()).toBe("");
  });

  it("should emit attachClicked when attach button is clicked", () => {
    const spy = vi.fn();
    component.attachClicked.subscribe(spy);
    const attachBtn = fixture.nativeElement.querySelector(
      ".agentjds-chat-input__attach button",
    );
    attachBtn.click();
    expect(spy).toHaveBeenCalled();
  });
});
