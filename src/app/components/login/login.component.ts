import { GoogleLoginProvider, SocialAuthService } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { EncryptionService } from '../../services/register-ip/data-encrypt.service';
import { IpService } from '../../services/register-ip/ip.service';
import { ILogin } from '../../models/Ilogin';
import { ApiService } from '../../services/api/api.service';
import { StatusMessage } from '../../enum/response-message';
import { response } from 'express';
import { SharedService } from '../../services/shared/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

  height: number = window.innerHeight;

  constructor(
    private authService: SocialAuthService,
    private secretVault: EncryptionService,
    private ip: IpService,
    private api: ApiService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
        let result: ILogin = <ILogin>{};
        result.id = user.id;
        result.name = user.name;
        result.email = user.email;
        result.token = this.secretVault.encrypt(`${user.id+user.name+user.email}`);
        this.api.registerUser(result).subscribe((response) => {
          console.log(this.secretVault.decrypt(response));
        },(err) => {
          if(err.error.message == StatusMessage.USER_EXIST) {
            const data = this.secretVault.decrypt(err.error.user._data);
            this.sharedService.authToken = JSON.parse(data).token;
            this.api.loginUser(result).subscribe((response) => {
              console.log(response);
            });
          }
        });
    });
  }

}
