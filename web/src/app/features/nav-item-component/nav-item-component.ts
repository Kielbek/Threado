import { Component, input, output } from '@angular/core';
import {ChevronRightIcon, LucideAngularModule } from 'lucide-angular';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgClass } from '@angular/common';
import {NavItem} from '../../core/model/nav-item';

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

  readonly ChevronRightIcon = ChevronRightIcon;
}
