import { Component, OnInit, inject, signal } from '@angular/core';
import { ListCompanyService } from '../../../../core/services/company/list-company.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ListSupplierService } from '../../../../core/services/supplier/list-supplier.service';
import { environment } from '../../../../environments/environments';
import { forkJoin } from 'rxjs';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-supplier-edit',
  standalone: true,
  imports: [ReactiveFormsModule, NgxMaskDirective],
  templateUrl: './supplier-edit.component.html',
  styleUrl: './supplier-edit.component.scss',
})
export class SupplierEditComponent implements OnInit {
  #companyService = inject(ListCompanyService);
  #supplierService = inject(ListSupplierService);

  #activeRouter = inject(ActivatedRoute);
  #formBuilder = inject(FormBuilder);

  #url = signal(environment.apiSupplier);

  public juridicaValue = 'juridica';
  public fisicaValue = 'fisica';

  constructor(private router: Router) {}

  navigateToSuppliers() {
    this.router.navigateByUrl('/Suppliers');
  }

  public formEditSupplier: FormGroup = this.#formBuilder.group({
    id: [0, [Validators.required]],
    name: ['', [Validators.required]],
    cpf: [''],
    cnpj: [''],
    tipoPessoa: ['', [Validators.required]],
    phoneNumber: ['', [Validators.required]],
    birthDate: [Date],
    companyId: [0, [Validators.required]],
  });

  public isLoading: boolean = false;
  public apiError: boolean = false;

  public msgError!: string;
  public msgSuccess!: string;

  public getAllCompanies: any;

  public getSupplier() {
    const idSupplier = this.#activeRouter.snapshot.params['id'];
    const supplier = this.#supplierService.apiGetSupplier(
      `${this.#url()}/EditSupplier?id=${idSupplier}`
    );

    return forkJoin(supplier).subscribe(
      (res) => {
        const supplierData = res[0];
        let tipoPessoa = '';

        if (supplierData.cpf) {
          tipoPessoa = 'fisica';
        } else {
          tipoPessoa = 'juridica';
        }

        this.formEditSupplier.patchValue({
          id: supplierData.id,
          name: supplierData.name,
          cpf: supplierData.cpf,
          cnpj: supplierData.cnpj,
          rg: supplierData.rg,
          phoneNumber: supplierData.phoneNumber,
          birthDate: supplierData.birthDate,
          tipoPessoa: tipoPessoa,
          companyId: supplierData.companyId,
        });

        this.isLoading = true;
      },
      (error) => {
        this.apiError = true;
      }
    );
  }

  ngOnInit(): void {
    this.#companyService.apiListAllCompanies.subscribe((res) => {
      this.getAllCompanies = res;
    });

    this.getSupplier();
  }

  public submitForm() {
    if (this.formEditSupplier.value.tipoPessoa === 'fisica') {
      this.formEditSupplier.value.cnpj = '';
    } else {
      this.formEditSupplier.value.rg = '';
      this.formEditSupplier.value.cpf = '';
      this.formEditSupplier.value.birthDate = null;
    }

    this.#supplierService
      .editSupplier({
        id: this.formEditSupplier.value.id,
        name: this.formEditSupplier.value.name,
        cpf: this.formEditSupplier.value.cpf,
        cnpj: this.formEditSupplier.value.cnpj,
        rg: this.formEditSupplier.value.rg,
        birthDate: this.formEditSupplier.value.birthDate,
        phoneNumber: this.formEditSupplier.value.phoneNumber,
        companyId: this.formEditSupplier.value.companyId,
      })
      .subscribe({
        next: (res) => {
          res;
          this.msgSuccess = res.message;
        },
        error: (e) => this.showErrorAlert(e),
      });
  }

  public delete() {
    this.#supplierService
      .deleteSupplier(this.formEditSupplier.value.id)
      .subscribe({
        next: () => this.navigateToSuppliers(),
        error: (e) => this.showErrorAlert(e),
      });
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

  isPessoaFisica(): boolean {
    return this.formEditSupplier.value.tipoPessoa === 'fisica';
  }

  isPessoaJuridica(): boolean {
    return this.formEditSupplier.value.tipoPessoa === 'juridica';
  }
}
