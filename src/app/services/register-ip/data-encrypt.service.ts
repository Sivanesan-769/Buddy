import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {
  secretKey = environment.Data_Secret_Key;

  encryptIP(data: string): string {
    return CryptoJS.AES.encrypt(data, this.secretKey).toString();
  }

  decryptIP(data: string): string {
    const bytes = CryptoJS.AES.decrypt(data, this.secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  }
}
