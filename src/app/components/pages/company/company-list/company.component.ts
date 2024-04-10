import { Component, OnInit, inject } from '@angular/core';
import { ListCompanyService } from '../../../../core/services/company/list-company.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-company',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './company.component.html',
  styleUrl: './company.component.scss',
})
export class CompanyComponent implements OnInit {
  #companyApi = inject(ListCompanyService);
  public getAllCompanies: any;

  ngOnInit(): void {
    this.#companyApi.apiListAllCompanies.subscribe((res) => {
      this.getAllCompanies = res;
    });
  }
}
