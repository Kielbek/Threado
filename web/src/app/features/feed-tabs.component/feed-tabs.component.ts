import { Component } from '@angular/core';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-feed-tabs',
  imports: [
    NgClass
  ],
  templateUrl: './feed-tabs.component.html',
  styleUrl: './feed-tabs.component.css',
})
export class FeedTabsComponent {
  tabs = ['For You', 'Following'];
  activeTab = 'For You';

  selectTab(tab: string) {
    this.activeTab = tab;
  }
}
