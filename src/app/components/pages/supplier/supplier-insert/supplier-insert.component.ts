import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ListSupplierService } from '../../../../core/services/supplier/list-supplier.service';
import { NgxMaskDirective } from 'ngx-mask';
import { ListCompanyService } from '../../../../core/services/company/list-company.service';

@Component({
  selector: 'app-supplier-insert',
  standalone: true,
  imports: [ReactiveFormsModule, NgxMaskDirective],
  templateUrl: './supplier-insert.component.html',
  styleUrl: './supplier-insert.component.scss',
})
export class SupplierInsertComponent implements OnInit {
  #formBuilder = inject(FormBuilder);
  #supplierService = inject(ListSupplierService);
  #companyService = inject(ListCompanyService);

  public formInsertSupplier: FormGroup = this.#formBuilder.group({
    name: ['', [Validators.required]],
    cnpj: ['', []],
    cpf: ['', []],
    rg: ['', []],
    dataNascimento: ['', []],
    phoneNumber: [null, [Validators.required]],
    companyId: [null, [Validators.required]],
    birthDate: [null, []],
    tipoPessoa: ['juridica', Validators.required],
  });

  public msgError!: string;
  public msgSuccess!: string;

  public getAllCompanies!: any;

  public submitForm() {
    this.#supplierService
      .insertSupplier({
        name: this.formInsertSupplier.value.name,
        cpf: this.formInsertSupplier.value.cpf,
        cnpj: this.formInsertSupplier.value.cnpj,
        phoneNumber: this.formInsertSupplier.value.phoneNumber,
        companyId: this.formInsertSupplier.value.companyId,
        rg: this.formInsertSupplier.value.rg,
        birthDate: this.formInsertSupplier.value.birthDate,
      })
      .subscribe({
        next: (res) => {
          res;
          this.msgSuccess = res.message;
          this.formInsertSupplier.reset();
        },
        error: (e) => this.showErrorAlert(e),
      });
  }

  ngOnInit(): void {
    this.#companyService.apiListAllCompanies.subscribe((res) => {
      this.getAllCompanies = res;
    });
  }

  isPessoaFisica(): boolean {
    return this.formInsertSupplier.value.tipoPessoa === 'fisica';
  }

  isPessoaJuridica(): boolean {
    return this.formInsertSupplier.value.tipoPessoa === 'juridica';
  }

  showSuccessAlert(message: string) {
    this.msgSuccess = message;
    setTimeout(() => {
      this.msgSuccess = '';
    }, 3000);
  }

  showErrorAlert(message: string) {
    this.msgError = message;
    setTimeout(() => {
      this.msgError = '';
    }, 3000);
  }
}
