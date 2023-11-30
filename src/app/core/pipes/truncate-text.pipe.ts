import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateText'
})
export class TruncateTextPipe implements PipeTransform {

  transform(text: string | null): string {
    const maxWords: number = 25;
    if (!text) {
      return '';
    }

    const words = text.split(' ');

    if (words.length > maxWords) {
      // Truncate the text and add "..."
      const truncatedText = words.slice(0, maxWords).join(' ');
      return truncatedText + '...';
    }

    // Display the full text
    return text;
  }

}
