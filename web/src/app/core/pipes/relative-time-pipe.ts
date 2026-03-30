import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'relativeTime',
})
export class RelativeTimePipe implements PipeTransform {
  transform(value: string | Date | undefined | null): string {
    if (!value) return '';

    const date = new Date(value);
    const now = new Date();

    if (date.getFullYear() !== now.getFullYear()) {
      return new Intl.DateTimeFormat('pl-PL', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }).format(date);
    }

    const diffInMs = now.getTime() - date.getTime();
    const diffInSeconds = Math.floor(diffInMs / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInSeconds < 60) {
      return 'teraz';
    }

    if (diffInMinutes < 60) {
      return `${diffInMinutes} min temu`;
    }

    if (diffInHours < 24) {
      return `${diffInHours} h temu`;
    }

    if (diffInDays === 1) {
      return '1 dzień temu';
    }

    if (diffInDays < 7) {
      return `${diffInDays} dni temu`;
    }

    const diffInWeeks = Math.floor(diffInDays / 7);
    if (diffInDays < 30) {
      if (diffInWeeks === 1) {
        return 'tydzień temu';
      }
      return `${diffInWeeks} tyg. temu`;
    }

    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths === 1) {
      return 'miesiąc temu';
    }

    if (diffInMonths >= 2 && diffInMonths <= 4) {
      return `${diffInMonths} miesiące temu`;
    }

    if (diffInMonths > 4 && diffInMonths < 12) {
      return `${diffInMonths} miesięcy temu`;
    }

    return new Intl.DateTimeFormat('pl-PL', {
      day: 'numeric',
      month: 'short'
    }).format(date);
  }
}
