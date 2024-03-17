import { Pipe, PipeTransform } from '@angular/core';
import { RelativeDistinguishedNames } from 'pkijs';

@Pipe({
  name: 'certificateFilter',
  standalone: true,
})
export class CertificateFilterPipe implements PipeTransform {
  transform(certificate: RelativeDistinguishedNames, id: string): any {
    if (!certificate || !id) {
      return null;
    }
    const item = certificate.typesAndValues.find((item) => item.type === id);
    const extractedValue = item?.value.valueBlock.value;

    return item ? extractedValue : null;
  }
}
