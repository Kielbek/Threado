import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  isMobileMenuOpen = signal(false);

  toggleMobileMenu() {
    this.isMobileMenuOpen.update(val => !val);
  }

  closeMobileMenu() {
    this.isMobileMenuOpen.set(false);
  }
}
