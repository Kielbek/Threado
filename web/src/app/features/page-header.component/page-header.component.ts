import {Component, inject, input, output} from '@angular/core';
import {ArrowLeft, LucideAngularModule} from "lucide-angular";
import {Location} from '@angular/common';
import {ThreadoButtonComponent} from '../threado-button-component/threado-button.component';

@Component({
  selector: 'app-page-header',
  imports: [
    LucideAngularModule,
    ThreadoButtonComponent
  ],
  templateUrl: './page-header.component.html',
  styleUrl: './page-header.component.css',
})
export class PageHeaderComponent {
  title = input.required<string>();
  subtitle = input<string>();
  showBackButton = input<boolean>(false);
  buttonText = input<string>();
  buttonDisabled = input<boolean>(false);

  buttonClicked = output<void>();

  private location = inject(Location);
  readonly ArrowLeftIcon = ArrowLeft;

  goBack() {
    this.location.back();
  }
}
