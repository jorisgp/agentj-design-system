import {
  Component,
  forwardRef,
  input,
  output,
  ViewEncapsulation,
} from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: "jaids-input-checkbox",
  templateUrl: "./input-checkbox.html",
  styleUrl: "./input-checkbox.scss",
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputCheckboxComponent),
      multi: true,
    },
  ],
})
export class InputCheckboxComponent implements ControlValueAccessor {
  label = input<string>("Checkbox");
  disabled = input<boolean>(false);
  required = input<boolean>(false);
  error = input<string>("");
  hint = input<string>("");

  checkedChanged = output<boolean>();

  checked = false;
  private formDisabled = false;
  private onChange: (value: boolean) => void = () => {};
  private onTouched: () => void = () => {};

  isDisabled(): boolean {
    return this.disabled() || this.formDisabled;
  }

  onCheckboxChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.checked = target.checked;
    this.onChange(this.checked);
    this.checkedChanged.emit(this.checked);
  }

  onBlur(): void {
    this.onTouched();
  }

  writeValue(value: boolean): void {
    this.checked = !!value;
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.formDisabled = isDisabled;
  }
}
