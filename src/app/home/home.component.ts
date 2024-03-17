import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { CertificateService } from '../services/certificate.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(
    private router: Router,
    private certificateService: CertificateService
  ) {}
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    this.certificateService.readFile(file);
  }

  goToAddCertificate() {
    this.router.navigate(['add-certificates']);
  }
}
