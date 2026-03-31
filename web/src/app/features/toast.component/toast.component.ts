import {Component, input, output} from '@angular/core';
import {
  AlertCircleIcon,
  AlertTriangleIcon,
  CheckCircle2Icon,
  InfoIcon,
  LucideAngularModule,
  XIcon
} from "lucide-angular";
import {Toast, ToastType} from "../../core/model/toast";
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-toast',
  imports: [
    LucideAngularModule,
    NgClass
  ],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css',
})
export class ToastComponent {
  toast = input.required<Toast>();
  close = output<void>();

  readonly XIcon = XIcon;

  getIcon(type: ToastType) {
    switch (type) {
      case 'success': return CheckCircle2Icon;
      case 'error': return AlertCircleIcon;
      case 'warning': return AlertTriangleIcon;
      default: return InfoIcon;
    }
  }

  getColorClass(type: ToastType, target: 'text' | 'bg'): string {
    switch (type) {
      case 'success':
        return target === 'text' ? 'text-[var(--color-threado-accent,#1dfa43)]' : 'bg-[var(--color-threado-accent,#1dfa43)]';
      case 'error':
        return target === 'text' ? 'text-red-500' : 'bg-red-500';
      case 'warning':
        return target === 'text' ? 'text-yellow-500' : 'bg-yellow-500';
      case 'info':
      default:
        return target === 'text' ? 'text-blue-500' : 'bg-blue-500';
    }
  }
}
