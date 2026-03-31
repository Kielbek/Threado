import {Component, model} from '@angular/core';
import {NgClass} from '@angular/common';

export type FeedTabType = 'For You' | 'Following';

@Component({
  selector: 'app-feed-tabs',
  imports: [
    NgClass
  ],
  templateUrl: './feed-tabs.component.html',
  styleUrl: './feed-tabs.component.css',
})
export class FeedTabsComponent {
  readonly tabs: FeedTabType[] = ['For You', 'Following'];
  activeTab = model<FeedTabType>('For You');

  selectTab(tab: FeedTabType) {
    this.activeTab.set(tab);
  }
}
