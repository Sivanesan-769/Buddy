import { Injectable } from '@angular/core';
import { ILogin } from '../../models/Ilogin';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EncryptionService } from '../register-ip/data-encrypt.service';

@Injectable({ providedIn: 'root' })
export class ApiService {

  private readonly baseUrl = `http://localhost:3000/api`;

  constructor(private http: HttpClient, private encrypt: EncryptionService) {}

  public registerUser(data: ILogin): Observable<any> {
    const req = this.encrypt.encrypt(JSON.stringify(data));
    const reqData = {
      _data: req
    }
    return this.http.post(`${this.baseUrl}/auth/register`, reqData);
  }

  public loginUser(data: ILogin): Observable<any> {
    const req = this.encrypt.encrypt(JSON.stringify(data));
    const reqData = {
      _data: req
    }
    return this.http.post(`${this.baseUrl}/auth/login`, reqData);
  }


}
