import {Component, inject, input} from '@angular/core';
import {ArrowLeft, LucideAngularModule} from "lucide-angular";
import {Location} from '@angular/common';

@Component({
  selector: 'app-page-header',
  imports: [
    LucideAngularModule
  ],
  templateUrl: './page-header.component.html',
  styleUrl: './page-header.component.css',
})
export class PageHeaderComponent {
  title = input.required<string>();

  subtitle = input<string>();

  showBackButton = input<boolean>(false);

  private location = inject(Location);
  readonly ArrowLeftIcon = ArrowLeft;

  goBack() {
    this.location.back();
  }
}
