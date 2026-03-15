import {Component, computed, OnInit, signal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ArrowLeftIcon, CalendarIcon, LucideAngularModule, MapPinIcon, UserIcon} from 'lucide-angular';
import {ThreadoButtonComponent} from '../../features/threado-button-component/threado-button.component';
import {DatePipe} from '@angular/common';
import {ThreadItemComponent} from '../../features/thread-item.component/thread-item.component';
import {PageHeaderComponent} from '../../features/page-header.component/page-header.component';

@Component({
  selector: 'app-user-profile-page-component',
  imports: [
    LucideAngularModule,
    ThreadoButtonComponent,
    DatePipe,
    ThreadItemComponent,
    PageHeaderComponent
  ],
  templateUrl: './user-profile-page-component.html',
  styleUrl: './user-profile-page-component.css',
})
export class UserProfilePageComponent implements OnInit {
  user = signal<any | null>(null);
  isOwner = true;
    // computed(() => {
    // const currentUserId = this.authService.getUserId();
    // return currentUserId === this.profileUser()?.id;
  // });

  constructor(
    private route: ActivatedRoute,
    // private authService: AuthService,
    // private userService: UserService
  ) {}

  ngOnInit() {
    // Pobieraj dane użytkownika na podstawie ID w URL
    this.route.paramMap.subscribe(params => {
      const username = params.get('username');
      // if (username) this.loadProfile(username);
    });
  }

  protected readonly CalendarIcon = CalendarIcon;
  protected readonly MapPinIcon = MapPinIcon;
  protected readonly UserIcon = UserIcon;
  protected readonly ArrowLeftIcon = ArrowLeftIcon;
}
