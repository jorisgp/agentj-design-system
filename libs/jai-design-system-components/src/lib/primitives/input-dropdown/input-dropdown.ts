import {
  Component,
  forwardRef,
  input,
  output,
  ViewEncapsulation,
} from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

export type InputDropdownSize = "sm" | "md" | "lg";

export interface InputDropdownOption {
  label: string;
  value: string;
  disabled?: boolean;
}

@Component({
  selector: "jaids-input-dropdown",
  templateUrl: "./input-dropdown.html",
  styleUrl: "./input-dropdown.scss",
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputDropdownComponent),
      multi: true,
    },
  ],
})
export class InputDropdownComponent implements ControlValueAccessor {
  size = input<InputDropdownSize>("md");
  disabled = input<boolean>(false);
  required = input<boolean>(false);
  label = input<string>("");
  error = input<string>("");
  hint = input<string>("");
  placeholder = input<string>("Select an option");
  options = input<InputDropdownOption[]>([]);

  valueChanged = output<string>();

  value = "";
  private formDisabled = false;
  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  isDisabled(): boolean {
    return this.disabled() || this.formDisabled;
  }

  onSelectionChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.value = target.value;
    this.onChange(this.value);
    this.valueChanged.emit(this.value);
  }

  onBlur(): void {
    this.onTouched();
  }

  writeValue(value: string): void {
    this.value = value ?? "";
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.formDisabled = isDisabled;
  }
}
