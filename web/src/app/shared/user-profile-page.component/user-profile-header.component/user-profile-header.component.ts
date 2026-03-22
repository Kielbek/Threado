import {Component, inject, input} from '@angular/core';
import {ThreadoAvatarComponent} from '../../../features/threado-avatar-component/threado-avatar-component';
import {ThreadoButtonComponent} from '../../../features/threado-button-component/threado-button.component';
import {PageHeaderComponent} from '../../../features/page-header.component/page-header.component';
import {CalendarIcon, LinkIcon, LucideAngularModule} from 'lucide-angular';
import {DatePipe} from '@angular/common';
import {UserProfile} from '../../../core/model/user-profile';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-profile-header',
  imports: [
    ThreadoAvatarComponent,
    ThreadoButtonComponent,
    PageHeaderComponent,
    LucideAngularModule,
    DatePipe
  ],
  templateUrl: './user-profile-header.component.html',
  styleUrl: './user-profile-header.component.css',
})
export class UserProfileHeaderComponent {
  private readonly router = inject(Router);

  user = input.required<UserProfile>();
  isOwner = input<boolean>(false);

  protected readonly CalendarIcon = CalendarIcon;
  protected readonly LinkIcon = LinkIcon;

  navigateToEditProfile() {
    this.router.navigate(['/settings/profile']);
  }
}
