import {Component, effect, inject, input, signal} from '@angular/core';
import {ThreadoAvatarComponent} from '../../../features/threado-avatar-component/threado-avatar-component';
import {ThreadoButtonComponent} from '../../../features/threado-button-component/threado-button.component';
import {PageHeaderComponent} from '../../../features/page-header.component/page-header.component';
import {CalendarIcon, LinkIcon, LucideAngularModule} from 'lucide-angular';
import {DatePipe} from '@angular/common';
import {UserProfile} from '../../../core/model/user-profile';
import {Router} from '@angular/router';
import {UserService} from '../../../core/services/user.service';

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
  private userService = inject(UserService);

  user = input.required<UserProfile>();
  isOwner = input<boolean>(false);

  followedByMe = signal(false);
  followersCount = signal(0);

  constructor() {
    effect(() => {
      const userData = this.user();
      this.followedByMe.set(userData.isFollowedByMe);
      this.followersCount.set(userData.followersCount || 0);
    }, { allowSignalWrites: true });
  }

  navigateToEditProfile() {
    this.router.navigate(['/settings/profile']);
  }

  toggleFollow() {
    const isFollowing = this.followedByMe();
    const targetId = this.user().id;

    this.followedByMe.set(!isFollowing);
    this.followersCount.update(count => isFollowing ? count - 1 : count + 1);

    const request = isFollowing
      ? this.userService.unfollowUser(targetId)
      : this.userService.followUser(targetId);

    request.subscribe({
      error: (err) => {
        this.followedByMe.set(isFollowing);
        this.followersCount.update(count => isFollowing ? count + 1 : count - 1);
        console.error('Follow action failed:', err);
      }
    });
  }

  protected readonly CalendarIcon = CalendarIcon;
  protected readonly LinkIcon = LinkIcon;
}
