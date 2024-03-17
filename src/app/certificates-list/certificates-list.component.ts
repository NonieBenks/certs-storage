import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { Certificate } from 'pkijs';
import { CertificateComponent } from '../certificate/certificate.component';
import { CertificateService } from '../services/certificate.service';
import { CertificateFilterPipe } from '../shared/pipes/certificate-filter.pipe';

@Component({
  selector: 'app-certificates-list',
  standalone: true,
  imports: [CertificateComponent, CertificateFilterPipe, MatListModule],
  templateUrl: './certificates-list.component.html',
  styleUrl: './certificates-list.component.scss',
})
export class CertificatesListComponent {
  public listOfCertificates: Array<Certificate> = [];
  public selectedCertificate: Certificate =
    this.certificateService.getCertificateByKey('cert_1');
  public COMMON_NAME_OID = '2.5.4.3';

  constructor(private certificateService: CertificateService) {}

  ngOnInit(): void {
    this.listOfCertificates = this.certificateService.getAllCertificates();
    this.certificateService.getDisplayedCertificate().subscribe((cert) => {
      this.listOfCertificates.push(cert);
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    this.certificateService.readFile(file);
  }

  onItemSelected(item: Certificate): void {
    this.selectedCertificate = item;
  }
}
