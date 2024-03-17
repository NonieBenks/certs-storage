import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Certificate } from 'pkijs';
import { CertificateService } from '../services/certificate.service';
import { CertificateFilterPipe } from '../shared/pipes/certificate-filter.pipe';

@Component({
  selector: 'app-certificate',
  standalone: true,
  imports: [CertificateFilterPipe, DatePipe, MatCardModule],
  templateUrl: './certificate.component.html',
  styleUrl: './certificate.component.scss',
})
export class CertificateComponent {
  @Input()
  certificate: Certificate = new Certificate();
  public COMMON_NAME_OID = '2.5.4.3';
  constructor(private certificateService: CertificateService) {}

  ngOnInit() {
    this.certificateService.getDisplayedCertificate().subscribe((cert) => {
      this.certificate = cert;
    });
  }
}
