import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterOutlet } from '@angular/router';
import * as asn1js from 'asn1js';
import { Certificate } from 'pkijs';
import { CertificateComponent } from './certificate/certificate.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatButtonModule,
    CertificateComponent,
    MatInputModule,
    MatFormFieldModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  public COMMON_NAME_OID = '2.5.4.3';

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
      console.log('File:', file);
      this.readFile(file);
    }
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    this.readFile(file);
  }

  readFile(file: File): void {
    const reader = new FileReader();

    reader.onload = (e: any) => {
      const buffer = e.target.result;
      if (!buffer) {
        console.error('Failed to read file.');
        return;
      }
      const uint8Array = new Uint8Array(buffer);
      const asn1 = asn1js.fromBER(uint8Array);
      const certificate = new Certificate({ schema: asn1.result });
      const issuerName = certificate.subject.typesAndValues.find(
        (item) => item.type === this.COMMON_NAME_OID
      );
      console.log(issuerName?.value.valueBlock.value);
    };

    reader.readAsArrayBuffer(file);
  }
}
