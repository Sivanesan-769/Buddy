import { Component, inject, viewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { NumberToWordsService } from './../../services/number-to-words.service';
import { OxfordDictionaryService } from './../../services/oxford-dictionary.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  whatsappNum!: any;
  amount!: any;
  numberInWords: string = '';
  text: string = '';
  accordion = viewChild.required(MatAccordion);
  numService = inject(NumberToWordsService);
  oxfordService = inject(OxfordDictionaryService);
  meaning: any[] = [];
  height: any = {'height': `${window.innerHeight}px`};

  navToWhatsapp() {
    window.location.href = `https://wa.me/+91${this.whatsappNum}`;
  }

  amountChange() {
    this.numberInWords = this.numService.convert(this.amount) + ' Rupees';
  }

  getMeaning() {
    this.height = {'height': 'auto'};
    this.oxfordService.getWordDefinition(this.text).subscribe(
      (response) => {
        this.meaning = response[0].meanings;
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  getDynamicStyles() {
    return this.height;
  }

  onPanelClosed() {
    this.amount = null;
    this.whatsappNum = null;
    this.meaning = [];
    this.text = '';
    this.height = {'height': `${window.innerHeight}px`};
  }
}
