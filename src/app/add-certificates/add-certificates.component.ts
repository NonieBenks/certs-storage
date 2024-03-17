import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { CertificateService } from '../services/certificate.service';

@Component({
  selector: 'app-add-certificates',
  standalone: true,
  imports: [MatButtonModule, MatInputModule],
  templateUrl: './add-certificates.component.html',
  styleUrl: './add-certificates.component.scss',
})
export class AddCertificatesComponent {
  constructor(
    private certificateService: CertificateService,
    private router: Router
  ) {}

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    this.router.navigate(['certificates-list']);
    this.certificateService.readFile(file);
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.handleFiles(files);
    }
  }

  handleFiles(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      this.certificateService.readFile(file);
      this.router.navigate(['certificates-list']);
    }
  }

  goToHomePage() {
    this.router.navigate(['home']);
  }
}
