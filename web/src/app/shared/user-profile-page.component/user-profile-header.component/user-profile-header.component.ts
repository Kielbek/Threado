import {Component, input} from '@angular/core';
import {ThreadoAvatarComponent} from '../../../features/threado-avatar-component/threado-avatar-component';
import {ThreadoButtonComponent} from '../../../features/threado-button-component/threado-button.component';
import {PageHeaderComponent} from '../../../features/page-header.component/page-header.component';
import {CalendarIcon, LinkIcon, LucideAngularModule} from 'lucide-angular';
import {DatePipe} from '@angular/common';

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
  user = input.required<any>();
  isOwner = input<boolean>(false);

  protected readonly CalendarIcon = CalendarIcon;
  protected readonly LinkIcon = LinkIcon;
}
