import {
  Component,
  ElementRef,
  HostListener,
  input,
  output,
  signal,
  ViewEncapsulation,
} from "@angular/core";
import { ButtonSize, ButtonVariant } from "../../primitives/button/button";
import { IconComponent } from "../../primitives/icon/icon";

export interface DropdownButtonOption {
  label: string;
  value: string;
  disabled?: boolean;
}

@Component({
  selector: "agentjds-dropdown-button",
  templateUrl: "./dropdown-button.html",
  styleUrl: "./dropdown-button.scss",
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [IconComponent],
})
export class DropdownButtonComponent {
  label = input<string>("Select");
  variant = input<ButtonVariant>("secondary");
  size = input<ButtonSize>("md");
  disabled = input<boolean>(false);
  options = input<DropdownButtonOption[]>([]);

  optionSelected = output<string>();

  isOpen = signal(false);

  constructor(private elementRef: ElementRef) {}

  toggle(): void {
    if (!this.disabled()) {
      this.isOpen.update((v) => !v);
    }
  }

  select(value: string): void {
    this.optionSelected.emit(value);
    this.isOpen.set(false);
  }

  @HostListener("document:click", ["$event"])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen.set(false);
    }
  }
}
