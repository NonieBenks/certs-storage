import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterOutlet } from '@angular/router';
import { CertificateComponent } from './certificate/certificate.component';
const ASN1 = require('@lapo/asn1js');

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatButtonModule,
    CertificateComponent,
    HttpClientModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get('../assets/certificates/nesterenko.cer', { responseType: 'text' })
      .subscribe((data: any) => {
        ASN1.decode(data);
        console.log('data', data);
      });
  }
}
