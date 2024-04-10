import { Routes } from '@angular/router';

export const signRoute: Routes = [
  {
    path: '',
    title: 'Todos os Fornecedores',
    loadComponent: () =>
      import('./supplier-list/supplier.component').then(
        (e) => e.SupplierComponent
      ),
  },
  {
    path: 'insertSupplier',
    title: 'Cadastro de Fornecedor',
    loadComponent: () =>
      import('./supplier-insert/supplier-insert.component').then(
        (e) => e.SupplierInsertComponent
      ),
  },
  {
    path: 'UpdateSupplier/:id',
    title: 'Edição do fornecedor',
    loadComponent: () =>
      import('./supplier-edit/supplier-edit.component').then(
        (e) => e.SupplierEditComponent
      ),
  },
];
