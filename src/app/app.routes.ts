import { Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { CompanyComponent } from './components/pages/company/company-list/company.component';
import { SupplierComponent } from './components/pages/supplier/supplier-list/supplier.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'Companies',
    loadChildren: () =>
      import('./components/pages/company/company.route').then(
        (e) => e.signRoute
      ),
  },
  {
    path: 'Suppliers',
    loadChildren: () =>
      import('./components/pages/supplier/supplier.route').then(
        (e) => e.signRoute
      ),
  },
];
