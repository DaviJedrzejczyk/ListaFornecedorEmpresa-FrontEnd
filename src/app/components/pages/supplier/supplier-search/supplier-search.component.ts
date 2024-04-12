import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-supplier-search',
  standalone: true,
  imports: [],
  templateUrl: './supplier-search.component.html',
  styleUrl: './supplier-search.component.scss',
})
export class SupplierSearchComponent {
  @Output() public emmitSearch: EventEmitter<string> = new EventEmitter();

  public search(value: string) {
    this.emmitSearch.emit(value);
  }
  public filterByDate(value: string) {
    const formattedDate = value.split('-').reverse().join('/');
    this.emmitSearch.emit(formattedDate);
  }
}
