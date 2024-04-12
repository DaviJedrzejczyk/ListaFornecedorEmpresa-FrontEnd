import { Component } from '@angular/core';
import { CompanyComponent } from '../company/company-list/company.component';
import { SupplierComponent } from '../supplier/supplier-list/supplier.component';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../../header/header.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CompanyComponent, SupplierComponent, HeaderComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
