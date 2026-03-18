import {inject, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";

@Pipe({
  name: 'linkify',
})
export class LinkifyPipe implements PipeTransform {
  private sanitizer = inject(DomSanitizer);

  transform(text: string | undefined): SafeHtml {
    if (!text) return '';

    let formattedText = text.replace(
      /(https?:\/\/[^\s]+)/g,
      '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:underline break-all">$1</a>'
    );

    formattedText = formattedText.replace(
      /(^|\s)#(\w+)/g,
      '$1<a href="/search?tag=$2" class="text-blue-500 hover:underline">#$2</a>'
    );

    formattedText = formattedText.replace(
      /(^|\s)@(\w+)/g,
      '$1<a href="/profile/$2" class="text-blue-500 hover:underline">@$2</a>'
    );

    // Oznaczamy ten HTML jako bezpieczny
    return this.sanitizer.bypassSecurityTrustHtml(formattedText);
  }
}
