import { Component, OnInit, inject } from '@angular/core';
import { environment } from '../../../../environments/environments';
import { ListSupplierService } from '../../../../core/services/supplier/list-supplier.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-supplier',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './supplier.component.html',
  styleUrl: './supplier.component.scss',
})
export class SupplierComponent implements OnInit {
  #supplierApi = inject(ListSupplierService);

  public getAllSuppliers: any;

  ngOnInit(): void {
    this.#supplierApi.apiListAllSuppliers.subscribe((res) => {
      this.getAllSuppliers = res;
    });
  }
}
