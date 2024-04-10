import { Component, OnInit, inject, signal } from '@angular/core';
import { ListCompanyService } from '../../../../core/services/company/list-company.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { environment } from '../../../../environments/environments';
import { forkJoin } from 'rxjs';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EBrasilianStates } from '../../../../Enum/EBrasilianStates.enum';
import { NgxMaskDirective, NgxMaskPipe, NgxMaskService } from 'ngx-mask';

@Component({
  selector: 'app-company-edit',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, NgxMaskDirective],
  templateUrl: './company-edit.component.html',
  styleUrl: './company-edit.component.scss',
})
export class CompanyEditComponent implements OnInit {
  #companyService = inject(ListCompanyService);
  #activeRouter = inject(ActivatedRoute);
  #formBuilder = inject(FormBuilder);

  #url = signal(environment.apiCompany);

  constructor(private router: Router) {}

  navigateToCompanies() {
    this.router.navigateByUrl('/Companies');
  }

  public brasilian = Object.values(EBrasilianStates).filter((key) =>
    isNaN(Number(key))
  );

  public formEditCompany: FormGroup = this.#formBuilder.group({
    id: [0, [Validators.required]],
    nomeFantasia: ['', [Validators.required]],
    cnpj: ['', [Validators.required]],
    uf: [null, [Validators.required]],
  });

  public company: any;

  public isLoading: boolean = false;
  public apiError: boolean = false;

  public msgError!: string;
  public msgSuccess!: string;

  ngOnInit(): void {
    this.getCompany();
  }

  public getCompany() {
    const idCompany = this.#activeRouter.snapshot.params['id'];
    const company = this.#companyService.apiGetCompanies(
      `${this.#url()}/EditCompany?id=${idCompany}`
    );

    return forkJoin(company).subscribe(
      (res) => {
        const companyData = res[0];

        this.formEditCompany.patchValue({
          id: companyData.id,
          nomeFantasia: companyData.fantasyName,
          cnpj: companyData.cnpj,
          uf: companyData.uf,
        });

        this.isLoading = true;
      },
      (error) => {
        this.apiError = true;
      }
    );
  }

  public submitForm() {
    this.#companyService
      .editCompany({
        id: this.formEditCompany.value.id,
        fantasyName: this.formEditCompany.value.nomeFantasia,
        cnpj: this.formEditCompany.value.cnpj,
        uf: Number(this.formEditCompany.value.uf),
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
    this.#companyService
      .deleteCompany(this.formEditCompany.value.id)
      .subscribe({
        next: () => this.navigateToCompanies(),
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
