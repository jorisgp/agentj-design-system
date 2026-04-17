import {
  Component,
  forwardRef,
  input,
  output,
  ViewEncapsulation,
} from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

export interface InputRadioOption {
  label: string;
  value: string;
  disabled?: boolean;
}

let radioGroupId = 0;

@Component({
  selector: "jaids-input-radio",
  templateUrl: "./input-radio.html",
  styleUrl: "./input-radio.scss",
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputRadioComponent),
      multi: true,
    },
  ],
})
export class InputRadioComponent implements ControlValueAccessor {
  label = input<string>("");
  name = input<string>("");
  options = input<InputRadioOption[]>([]);
  disabled = input<boolean>(false);
  required = input<boolean>(false);
  error = input<string>("");
  hint = input<string>("");

  valueChanged = output<string>();

  value = "";
  private generatedName = `jaids-radio-group-${radioGroupId++}`;
  private formDisabled = false;
  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  groupName(): string {
    return this.name() || this.generatedName;
  }

  isOptionDisabled(option: InputRadioOption): boolean {
    return this.disabled() || this.formDisabled || !!option.disabled;
  }

  onSelectionChange(event: Event): void {
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

  setDisabledState(isDisabled: boolean): void {
    this.formDisabled = isDisabled;
  }
}
