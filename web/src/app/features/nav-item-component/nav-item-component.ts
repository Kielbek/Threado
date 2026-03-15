import { Component, input, output } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgClass } from '@angular/common';

export type NavItem = {
  label: string;
  route: string;
  icon: any;
  showDot?: boolean;
};

@Component({
  selector: 'app-nav-item',
  standalone: true,
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
