import { GoogleLoginProvider, SocialAuthService } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { EncryptionService } from '../../services/register-ip/data-encrypt.service';
import { IpService } from '../../services/register-ip/ip.service';

export interface ILogin {
  id: string;
  name: string;
  email: string;
  ip: string;
  token: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(
    private authService: SocialAuthService,
    private secretVault: EncryptionService,
    private ip: IpService
  ) {}

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.ip.getIp().subscribe((data) => {
        let result: ILogin = <ILogin>{};
        result.id = user.id;
        result.name = user.name;
        result.email = user.email;
        result.ip = this.secretVault.encryptIP(data.ip);
        result.token = user.idToken;
        console.log('result :', result);
      });
    });
  }

}
