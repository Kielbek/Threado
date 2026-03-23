import {Injectable, signal} from '@angular/core';
import { Toast } from "../model/toast";

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toasts = signal<Toast[]>([]);

  success(message: string, title?: string) {
    this.show({ type: 'success', message, title });
  }

  error(message: string, title?: string) {
    this.show({ type: 'error', message, title });
  }

  info(message: string, title?: string) {
    this.show({ type: 'info', message, title });
  }

  warning(message: string, title?: string) {
    this.show({ type: 'warning', message, title });
  }

  private show(toast: Omit<Toast, 'id' | 'isClosing'>, duration = 4000) {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: Toast = { ...toast, id, isClosing: false };

    this.toasts.update(current => [...current, newToast]);

    if (duration > 0) {
      setTimeout(() => this.remove(id), duration);
    }
  }

  remove(id: string) {
    this.toasts.update(current =>
      current.map(t => t.id === id ? { ...t, isClosing: true } : t)
    );

    setTimeout(() => {
      this.toasts.update(current => current.filter(t => t.id !== id));
    }, 300);
  }
}
