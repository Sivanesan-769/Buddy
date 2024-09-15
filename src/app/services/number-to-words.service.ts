import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NumberToWordsService {

  private ones: string[] = [
    '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
    'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'
  ];

  private tens: string[] = [
    '', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'
  ];

  // Function to convert number to words
  private numToWords(number: number): string {
    if (number === 0) {
      return 'Zero';
    }

    if (number < 20) {
      return this.ones[number];
    }

    if (number < 100) {
      return this.tens[Math.floor(number / 10)] + (number % 10 !== 0 ? ' ' + this.ones[number % 10] : '');
    }

    if (number < 1000) {
      return this.ones[Math.floor(number / 100)] + ' Hundred' + (number % 100 !== 0 ? ' ' + this.numToWords(number % 100) : '');
    }

    if (number < 1000000) { // Below a million (Lakh)
      return this.numToWords(Math.floor(number / 1000)) + ' Thousand' + (number % 1000 !== 0 ? ' ' + this.numToWords(number % 1000) : '');
    }

    if (number < 1000000000) { // Below a billion (Crore)
      return this.numToWords(Math.floor(number / 1000000)) + ' Million' + (number % 1000000 !== 0 ? ' ' + this.numToWords(number % 1000000) : '');
    }

    if (number < 1000000000000) { // Below a trillion (Billion)
      return this.numToWords(Math.floor(number / 1000000000)) + ' Billion' + (number % 1000000000 !== 0 ? ' ' + this.numToWords(number % 1000000000) : '');
    }

    if (number < 1000000000000000) { // Below a quadrillion (Trillion)
      return this.numToWords(Math.floor(number / 1000000000000)) + ' Trillion' + (number % 1000000000000 !== 0 ? ' ' + this.numToWords(number % 1000000000000) : '');
    }

    return this.numToWords(Math.floor(number / 1000000000000000)) + ' Quadrillion' + (number % 1000000000000000 !== 0 ? ' ' + this.numToWords(number % 1000000000000000) : '');
  }

  // Public method to convert numbers
  convert(number: number): string {
    return this.numToWords(number);
  }
}
