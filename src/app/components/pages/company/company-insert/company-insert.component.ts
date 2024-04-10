import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ListCompanyService } from '../../../../core/services/company/list-company.service';
import { EBrasilianStates } from '../../../../Enum/EBrasilianStates.enum';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-company-insert',
  standalone: true,
  imports: [ReactiveFormsModule, NgxMaskDirective],
  templateUrl: './company-insert.component.html',
  styleUrl: './company-insert.component.scss',
})
export class CompanyInsertComponent {
  #formBuilder = inject(FormBuilder);
  #companyService = inject(ListCompanyService);

  public brasilian = Object.values(EBrasilianStates).filter((key) =>
    isNaN(Number(key))
  );

  public formInsertCompany: FormGroup = this.#formBuilder.group({
    nomeFantasia: ['', [Validators.required]],
    cnpj: ['', [Validators.required]],
    uf: [null, [Validators.required]],
  });

  public msgError!: string;
  public msgSuccess!: string;

  public submitForm() {
    this.#companyService
      .insertCompany({
        fantasyName: this.formInsertCompany.value.nomeFantasia,
        cnpj: this.formInsertCompany.value.cnpj,
        uf: Number(this.formInsertCompany.value.uf),
      })
      .subscribe({
        next: (res) => {
          res;
          this.msgSuccess = res.message;
          this.formInsertCompany.reset();
        },
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
}
