// oxford-dictionary.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OxfordDictionaryService {
  private app_id: string = 'b92593d3';
  private app_key: string = '547190ee5e1f08dd6dfdd2f4fcfe8497';
  private baseUrl: string = 'https://od-api.oxforddictionaries.com/api/v2/entries';
  private language_code: string = 'en-us';

  constructor(private http: HttpClient) {}

  getWordDefinition(word: string): Observable<any> {
    const url = `${this.baseUrl}/${this.language_code}/${word.toLowerCase()}`;
    const headers = new HttpHeaders({
      'app_id': this.app_id,
      'app_key': this.app_key,
    });

    return this.http.get(url, { headers });
  }
}
