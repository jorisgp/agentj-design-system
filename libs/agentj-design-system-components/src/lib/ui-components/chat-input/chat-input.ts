import {
  Component,
  ElementRef,
  input,
  OnDestroy,
  output,
  signal,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IconButtonComponent } from "../../composites/icon-button/icon-button";

@Component({
  selector: "agentjds-chat-input",
  templateUrl: "./chat-input.html",
  styleUrl: "./chat-input.scss",
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [FormsModule, IconButtonComponent],
})
export class ChatInputComponent implements OnDestroy {
  private resizeFrameId: number | null = null;
  private measurementTextarea: HTMLTextAreaElement | null = null;

  @ViewChild("textarea")
  textarea?: ElementRef<HTMLTextAreaElement>;

  placeholder = input<string>("Message...");
  disabled = input<boolean>(false);
  maxRows = input<number>(6);

  submitted = output<string>();
  attachClicked = output<void>();

  value = signal<string>("");
  isMultiline = signal<boolean>(false);

  onInput(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    this.value.set(target.value);
    this.autoResize(target);
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      this.submit();
    }
  }

  submit(): void {
    const trimmed = this.value().trim();
    if (trimmed && !this.disabled()) {
      this.submitted.emit(trimmed);
      this.value.set("");
      const textarea = this.textarea?.nativeElement;
      if (textarea) {
        this.clearResizeFrame();
        textarea.value = "";
        textarea.style.height = "auto";
        textarea.style.overflowY = "hidden";
      }
      this.isMultiline.set(false);
    }
  }

  private autoResize(textarea: HTMLTextAreaElement): void {
    this.applyAutoResize(textarea);

    this.clearResizeFrame();
    this.resizeFrameId = requestAnimationFrame(() => {
      this.resizeFrameId = null;
      if (!textarea.isConnected) {
        return;
      }
      this.applyAutoResize(textarea);
    });
  }

  private applyAutoResize(textarea: HTMLTextAreaElement): void {
    textarea.style.height = "auto";
    textarea.style.overflowY = "hidden";
    const style = window.getComputedStyle(textarea);
    const lineHeight = parseFloat(style.lineHeight) || 22;
    const verticalPadding =
      (parseFloat(style.paddingTop) || 0) + (parseFloat(style.paddingBottom) || 0);

    const rowCountInSideLayout = this.isMultiline()
      ? this.getRowCountForWidth(
          textarea,
          style,
          lineHeight,
          verticalPadding,
          this.getSideLayoutTextareaWidth(textarea),
        )
      : this.getRowCountFromScrollHeight(textarea.scrollHeight, lineHeight, verticalPadding);
    this.isMultiline.set(rowCountInSideLayout > 1);

    const maxHeight = lineHeight * this.maxRows() + verticalPadding;
    textarea.style.height = Math.min(textarea.scrollHeight, maxHeight) + "px";
    textarea.style.overflowY = textarea.scrollHeight > maxHeight + 1 ? "auto" : "hidden";
  }

  private getSideLayoutTextareaWidth(textarea: HTMLTextAreaElement): number {
    const body = textarea.closest(".agentjds-chat-input__body") as HTMLElement | null;
    if (!body) {
      return textarea.clientWidth;
    }

    const attach = body.querySelector(".agentjds-chat-input__attach") as HTMLElement | null;
    const actions = body.querySelector(".agentjds-chat-input__actions") as HTMLElement | null;
    const bodyStyle = window.getComputedStyle(body);
    const gap = parseFloat(bodyStyle.columnGap || bodyStyle.gap) || 0;
    const horizontalPadding =
      (parseFloat(bodyStyle.paddingLeft) || 0) + (parseFloat(bodyStyle.paddingRight) || 0);
    const sideWidth =
      body.clientWidth -
      horizontalPadding -
      (attach?.offsetWidth ?? 0) -
      (actions?.offsetWidth ?? 0) -
      gap * 2;

    return Math.max(40, sideWidth);
  }

  private getRowCountFromScrollHeight(
    scrollHeight: number,
    lineHeight: number,
    verticalPadding: number,
  ): number {
    return Math.max(1, Math.ceil((scrollHeight - verticalPadding) / lineHeight));
  }

  private getRowCountForWidth(
    textarea: HTMLTextAreaElement,
    style: CSSStyleDeclaration,
    lineHeight: number,
    verticalPadding: number,
    width: number,
  ): number {
    const measurer = this.getMeasurementTextarea();
    if (!measurer) {
      return this.getRowCountFromScrollHeight(textarea.scrollHeight, lineHeight, verticalPadding);
    }

    measurer.style.boxSizing = style.boxSizing;
    measurer.style.width = `${width}px`;
    measurer.style.padding = style.padding;
    measurer.style.border = style.border;
    measurer.style.font = style.font;
    measurer.style.fontFamily = style.fontFamily;
    measurer.style.fontSize = style.fontSize;
    measurer.style.fontWeight = style.fontWeight;
    measurer.style.fontStyle = style.fontStyle;
    measurer.style.lineHeight = style.lineHeight;
    measurer.style.letterSpacing = style.letterSpacing;
    measurer.style.textTransform = style.textTransform;
    measurer.style.whiteSpace = "pre-wrap";
    measurer.style.overflowWrap = style.overflowWrap;
    measurer.style.wordBreak = style.wordBreak;
    measurer.rows = 1;
    measurer.value = textarea.value || " ";

    return this.getRowCountFromScrollHeight(measurer.scrollHeight, lineHeight, verticalPadding);
  }

  private getMeasurementTextarea(): HTMLTextAreaElement | null {
    if (typeof document === "undefined") {
      return null;
    }

    if (!this.measurementTextarea) {
      this.measurementTextarea = document.createElement("textarea");
      this.measurementTextarea.setAttribute("aria-hidden", "true");
      this.measurementTextarea.rows = 1;
      this.measurementTextarea.tabIndex = -1;
      this.measurementTextarea.style.position = "absolute";
      this.measurementTextarea.style.left = "-99999px";
      this.measurementTextarea.style.top = "0";
      this.measurementTextarea.style.visibility = "hidden";
      this.measurementTextarea.style.pointerEvents = "none";
      this.measurementTextarea.style.height = "auto";
      this.measurementTextarea.style.minHeight = "0";
      this.measurementTextarea.style.maxHeight = "none";
      this.measurementTextarea.style.overflow = "hidden";
      this.measurementTextarea.style.resize = "none";
      document.body.appendChild(this.measurementTextarea);
    }

    return this.measurementTextarea;
  }

  private clearResizeFrame(): void {
    if (this.resizeFrameId !== null) {
      cancelAnimationFrame(this.resizeFrameId);
      this.resizeFrameId = null;
    }
  }

  ngOnDestroy(): void {
    this.clearResizeFrame();
    if (this.measurementTextarea) {
      this.measurementTextarea.remove();
      this.measurementTextarea = null;
    }
  }
}
