import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { SharedService } from '../services/shared/shared.service';
import { EncryptionService } from '../services/register-ip/data-encrypt.service';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  constructor(private sharedService: SharedService, private secretVault: EncryptionService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let token = '';
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${JSON.parse(this.secretVault.decrypt(this.sharedService.authToken)) ?? token}`,
      },
    });
    return next.handle(authReq);
  }
}
