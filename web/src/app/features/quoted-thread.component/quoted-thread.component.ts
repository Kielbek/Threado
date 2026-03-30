import {Component, input} from '@angular/core';
import {ThreadResponse} from '../../core/model/thread/thread-response';
import {RouterLink} from '@angular/router';
import {LinkifyPipe} from '../../core/pipes/linkify-pipe';

@Component({
  selector: 'app-quoted-thread',
  imports: [
    RouterLink,
    LinkifyPipe
  ],
  templateUrl: './quoted-thread.component.html',
  styleUrl: './quoted-thread.component.css',
})
export class QuotedThreadComponent {
  thread = input.required<ThreadResponse>();
}
