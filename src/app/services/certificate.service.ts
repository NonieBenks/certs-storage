import { Injectable } from '@angular/core';
import * as asn1js from 'asn1js';
import { Certificate } from 'pkijs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CertificateService {
  private displayedCertificate = new BehaviorSubject<Certificate>(
    this.getCertificateByKey('cert_1')
  );
  public COMMON_NAME_OID = '2.5.4.3';

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
      this.displayedCertificate.next(certificate);
      this.saveData(`cert_${this.getCertificatesCount() + 1}`, certificate);
    };
    reader.readAsArrayBuffer(file);
  }

  saveData(key: string, data: Certificate): void {
    localStorage.setItem(key, JSON.stringify(data));
    this.incrementFileCount();
  }

  getCertificateByKey(key: string): any {
    const storedData = localStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : null;
  }

  getDisplayedCertificate(): BehaviorSubject<Certificate> {
    return this.displayedCertificate;
  }

  getAllCertificates(): Certificate[] {
    const certificates: Certificate[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('cert_')) {
        const file = JSON.parse(localStorage.getItem(key) || '');
        certificates.push(file);
      }
    }
    return certificates;
  }

  getCertificatesCount(): number {
    return parseInt(localStorage.getItem('certCount') || '0', 10);
  }

  private incrementFileCount(): void {
    const currentCount = this.getCertificatesCount();
    localStorage.setItem('certCount', (currentCount + 1).toString());
  }
}
