import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ChatBubbleComponent } from "./chat-bubble";

describe("ChatBubbleComponent", () => {
  let component: ChatBubbleComponent;
  let fixture: ComponentFixture<ChatBubbleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatBubbleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatBubbleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should render the message text", () => {
    fixture.componentRef.setInput("message", "Hello world");
    fixture.detectChanges();
    const message = fixture.nativeElement.querySelector(
      ".jaids-chat-bubble__message",
    );
    expect(message.textContent.trim()).toBe("Hello world");
  });

  it("should apply outgoing class", () => {
    fixture.componentRef.setInput("direction", "outgoing");
    fixture.detectChanges();
    const bubble = fixture.nativeElement.querySelector(".jaids-chat-bubble");
    expect(bubble.classList.contains("jaids-chat-bubble--outgoing")).toBe(true);
  });

  it("should show meta info when author and timestamp are provided", () => {
    fixture.componentRef.setInput("author", "Sam");
    fixture.componentRef.setInput("timestamp", "11:20");
    fixture.detectChanges();
    const meta = fixture.nativeElement.querySelector(".jaids-chat-bubble__meta");
    expect(meta.textContent).toContain("Sam");
    expect(meta.textContent).toContain("11:20");
  });
});
