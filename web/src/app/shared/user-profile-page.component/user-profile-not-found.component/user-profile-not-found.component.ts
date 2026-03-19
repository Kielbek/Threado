import {Component, input} from '@angular/core';
import {EmptyStateComponent} from '../../../features/empty-state.component/empty-state.component';
import {PageHeaderComponent} from '../../../features/page-header.component/page-header.component';
import {AlertTriangleIcon} from 'lucide-angular';

@Component({
  selector: 'app-user-profile-not-found',
  imports: [
    EmptyStateComponent,
    PageHeaderComponent
  ],
  templateUrl: './user-profile-not-found.component.html',
  styleUrl: './user-profile-not-found.component.css',
})
export class UserProfileNotFoundComponent {
  username = input<string>('');

  protected readonly AlertTriangleIcon = AlertTriangleIcon;
}
