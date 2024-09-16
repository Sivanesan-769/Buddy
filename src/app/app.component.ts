import { Component, inject, viewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { NumberToWordsService } from './services/number-to-words.service';
import { OxfordDictionaryService } from './services/oxford-dictionary.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'buddy';

  whatsappNum!: number;
  amount!: number;
  numberInWords: string = '';
  text: string = '';
  accordion = viewChild.required(MatAccordion);
  numService = inject(NumberToWordsService);
  oxfordService = inject(OxfordDictionaryService);

  meaning: any[] = [];

  navToWhatsapp() {
    window.location.href = `https://wa.me/+91${this.whatsappNum}`;
  }

  amountChange() {
    this.numberInWords = this.numService.convert(this.amount) + ' Rupees';
  }

  getMeaning() {
    this.oxfordService.getWordDefinition(this.text).subscribe(
      (response) => {
        this.meaning = response[0].meanings;
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
}
