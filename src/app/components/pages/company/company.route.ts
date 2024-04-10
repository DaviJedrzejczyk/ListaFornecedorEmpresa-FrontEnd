import { Routes } from '@angular/router';

export const signRoute: Routes = [
  {
    path: 'insertCompany',
    title: 'Inserir Empresa',
    loadComponent: () =>
      import('./company-insert/company-insert.component').then(
        (e) => e.CompanyInsertComponent
      ),
  },
  {
    path: '',
    title: 'Todas as Empresas',
    loadComponent: () =>
      import('./company-list/company.component').then(
        (e) => e.CompanyComponent
      ),
  },
  {
    path: 'UpdateCompany/:id',
    title: 'Editar Empresa',
    loadComponent: () =>
      import('./company-edit/company-edit.component').then(
        (e) => e.CompanyEditComponent
      ),
  },
];
