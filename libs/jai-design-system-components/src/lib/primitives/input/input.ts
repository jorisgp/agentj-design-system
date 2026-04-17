import {
  Component,
  forwardRef,
  input,
  output,
  ViewEncapsulation,
} from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

export type InputType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "tel"
  | "url";
export type InputSize = "sm" | "md" | "lg";

@Component({
  selector: "jaids-input",
  templateUrl: "./input.html",
  styleUrl: "./input.scss",
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
  type = input<InputType>("text");
  size = input<InputSize>("md");
  placeholder = input<string>("");
  disabled = input<boolean>(false);
  readonly = input<boolean>(false);
  required = input<boolean>(false);
  label = input<string>("");
  error = input<string>("");
  hint = input<string>("");

  valueChanged = output<string>();

  value = "";

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
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

  setDisabledState(_isDisabled: boolean): void {}
}
