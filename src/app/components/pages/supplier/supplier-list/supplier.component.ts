import { Component, OnInit, PipeTransform, inject } from '@angular/core';
import { ListSupplierService } from '../../../../core/services/supplier/list-supplier.service';
import { RouterLink } from '@angular/router';
import { SupplierSearchComponent } from '../supplier-search/supplier-search.component';

@Component({
  selector: 'app-supplier',
  standalone: true,
  imports: [RouterLink, SupplierSearchComponent],
  templateUrl: './supplier.component.html',
  styleUrl: './supplier.component.scss',
})
export class SupplierComponent implements OnInit {
  #supplierApi = inject(ListSupplierService);

  public getAllSuppliers: any;
  private setAllSuppliers: any;

  public filteredSuppliers: any[] = [];

  ngOnInit(): void {
    this.#supplierApi.apiListAllSuppliers.subscribe((res) => {
      this.setAllSuppliers = res;
      this.getAllSuppliers = this.setAllSuppliers;

      this.filteredSuppliers = [...this.getAllSuppliers];

      this.formatFields();
    });
  }

  private formatFields(): void {
    this.getAllSuppliers.forEach(
      (supplier: {
        birthDate: string;
        cpf: string;
        cnpj: string;
        phoneNumber: string;
      }) => {
        if (supplier.birthDate) {
          supplier.birthDate = this.formatDate(supplier.birthDate);
        }
        if (supplier.cpf) {
          supplier.cpf = this.formatCPF(supplier.cpf);
        }
        if (supplier.cnpj) {
          supplier.cnpj = this.formatCNPJ(supplier.cnpj);
        }
        if (supplier.phoneNumber) {
          supplier.phoneNumber = this.formatPhoneNumber(supplier.phoneNumber);
        }
      }
    );
  }

  private formatDate(date: string): string {
    const dateObj = new Date(date);
    const day = dateObj.getDate().toString().padStart(2, '0');
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const year = dateObj.getFullYear().toString();
    return `${day}/${month}/${year}`;
  }

  private formatCPF(cpf: string): string {
    return cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
  }

  private formatCNPJ(cnpj: string): string {
    if (cnpj.match(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/)) {
      return cnpj;
    }
    return cnpj.replace(
      /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
      '$1.$2.$3/$4-$5'
    );
  }

  private formatPhoneNumber(phoneNumber: string): string {
    const ddd = phoneNumber.substring(0, 2);
    const rest = phoneNumber.substring(2);
    const formattedPhoneNumber = `(${ddd}) `;
    if (rest.length === 8) {
      return `${formattedPhoneNumber}${rest.substring(0, 4)}-${rest.substring(
        4
      )}`;
    } else if (rest.length === 9) {
      return `${formattedPhoneNumber}${rest.substring(0, 5)}-${rest.substring(
        5
      )}`;
    } else {
      return phoneNumber;
    }
  }

  public getSearch(value: string) {
    const filter = this.setAllSuppliers.filter((res: any) => {
      const lowercaseValue = value.toLowerCase();
      const lowercaseName = res.name.toLowerCase();
      const lowercaseCpf = res.cpf ? res.cpf.toLowerCase() : '';
      const lowercaseCnpj = res.cnpj ? res.cnpj.toLowerCase() : '';

      return (
        lowercaseName.includes(lowercaseValue) ||
        lowercaseCpf.includes(lowercaseValue) ||
        lowercaseCnpj.includes(lowercaseValue) ||
        (res.birthDate && res.birthDate.includes(value))
      );
    });

    this.getAllSuppliers = filter;
  }
}
