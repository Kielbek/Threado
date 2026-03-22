import {Component, forwardRef, input, model} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-threado-input',
  imports: [],
  templateUrl: './threado-input.component.html',
  styleUrl: './threado-input.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ThreadoInputComponent),
      multi: true
    }
  ],
})
export class ThreadoInputComponent implements ControlValueAccessor {
  label = input.required<string>();
  inputId = input.required<string>();
  type = input<string>('text');
  isTextarea = input<boolean>(false);

  value: string = '';
  disabled: boolean = false;

  onChange: any = () => {};
  onTouched: any = () => {};

  onInput(event: Event) {
    const target = event.target as HTMLInputElement | HTMLTextAreaElement;
    this.value = target.value;
    this.onChange(this.value);
  }

  writeValue(value: string): void {
    this.value = value || '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

}
