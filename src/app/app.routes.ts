import { Routes } from '@angular/router';
import { AddCertificatesComponent } from './add-certificates/add-certificates.component';
import { AppComponent } from './app.component';
import { CertificateComponent } from './certificate/certificate.component';
import { CertificatesListComponent } from './certificates-list/certificates-list.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: 'add-certificates', component: AddCertificatesComponent },
  { path: 'home', component: HomeComponent },
  { path: 'certificates-list', component: CertificatesListComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];
