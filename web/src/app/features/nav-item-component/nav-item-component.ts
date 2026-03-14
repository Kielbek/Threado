import {Component, input, output} from '@angular/core';
import {LucideAngularModule} from 'lucide-angular';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {NgClass} from '@angular/common';

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
    RouterLinkActive,
    NgClass
  ],
  templateUrl: './nav-item-component.html',
  styleUrl: './nav-item-component.css',
})
export class NavItemComponent {
  item = input.required<NavItem>();

  clicked = output<void>();
}
