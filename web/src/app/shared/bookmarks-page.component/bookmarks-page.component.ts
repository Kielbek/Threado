import {Component, signal} from '@angular/core';
import {LucideAngularModule} from "lucide-angular";
import {PageHeaderComponent} from '../../features/page-header.component/page-header.component';

export interface BookmarkedPost {
  id: string;
  user: { name: string; username: string; avatarUrl: string };
  content: string;
  timeAgo: string;
  stats: { replies: number; reposts: number; likes: number; views: number };
  isLiked: boolean;
}

@Component({
  selector: 'app-bookmarks-page.component',
  imports: [
    LucideAngularModule,
    PageHeaderComponent
  ],
  templateUrl: './bookmarks-page.component.html',
  styleUrl: './bookmarks-page.component.css',
})
export class BookmarksPageComponent {
  bookmarks = signal<any[]>([
    {
      id: '101',
      user: { name: 'Kamil', username: 'kamil_tworzy', avatarUrl: 'https://i.pravatar.cc/150?img=11' },
      content: 'Znalazłem dzisiaj świetny sposób na optymalizację Signals w Angularze 17. Zamiast używać effect(), lepiej oprzeć się na computed(). Zmienia to całkowicie zasady gry! 🚀 #angular #frontend',
      timeAgo: '2 dni',
      stats: { replies: 12, reposts: 5, likes: 142, views: 3200 },
      isLiked: true
    },
    {
      id: '102',
      user: { name: 'Sarah', username: 'sarah_designs', avatarUrl: 'https://i.pravatar.cc/150?img=5' },
      content: 'Kolekcja darmowych narzędzi dla UI Designerów. Zapiszcie sobie na później, bo linki często wygasają! 👇',
      timeAgo: '5 dni',
      stats: { replies: 89, reposts: 412, likes: 2100, views: 45000 },
      isLiked: false
    }
  ]);

  removeBookmark(id: string) {
    this.bookmarks.update(posts => posts.filter(p => p.id !== id));
  }
}
