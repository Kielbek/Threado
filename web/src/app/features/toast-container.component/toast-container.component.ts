import { Component, inject } from '@angular/core';
import {ToastComponent} from '../toast.component/toast.component';
import {ToastService} from '../../core/services/toast-service';

@Component({
  selector: 'app-toast-container',
  imports: [
    ToastComponent
  ],
  templateUrl: './toast-container.component.html',
  styleUrl: './toast-container.component.css',
})
export class ToastContainerComponent {
  public toastService = inject(ToastService);
}
