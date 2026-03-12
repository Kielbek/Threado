import {Component, input, output} from '@angular/core';
import {LucideAngularModule} from 'lucide-angular';
import {RouterLink, RouterLinkActive} from '@angular/router';

export type NavItem = {
  label: string;
  route: string;
  icon: any;
};

@Component({
  selector: 'app-nav-item',
  imports: [
    LucideAngularModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './nav-item-component.html',
  styleUrl: './nav-item-component.css',
})
export class NavItemComponent {
  item = input.required<NavItem>();
  showLabel = input<boolean>(true);

  clicked = output<void>();
}
