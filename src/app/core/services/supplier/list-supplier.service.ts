import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environments';
import { Observable, catchError, map, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ListSupplierService {
  private url = signal<string>(environment.apiSupplier);

  constructor(private httpClient: HttpClient, private router: Router) {}

  get apiListAllSuppliers(): Observable<any> {
    return this.httpClient
      .get<any>(`${this.url()}/AllSuppliers`)
      .pipe(tap((res) => res));
  }

  public apiGetSupplier(url: string): Observable<any> {
    return this.httpClient.get<any>(url).pipe(map((res) => res));
  }

  public insertSupplier(payLoad: {
    name: string;
    cpf: string;
    cnpj: string;
    phoneNumber: string;
    companyId: number;
    rg: string;
    birthDate: Date;
  }): Observable<any> {
    console.log(payLoad);
    return this.httpClient.post(`${this.url()}/InsertSupplier`, payLoad).pipe(
      catchError((e) => {
        if (e.error.message) return throwError(() => e.error.message);
        return throwError(
          () =>
            'No momento não estamos conseguindo validar este dados, tente novamente mais tarde!'
        );
      })
    );
  }

  public editSupplier(payLoad: {
    id: number;
    name: string;
    cpf: string;
    cnpj: string;
    rg: string;
    birthDate: Date;
    phoneNumber: string;
    companyId: number;
  }): Observable<any> {
    return this.httpClient.put(`${this.url()}/EditSupplier`, payLoad).pipe(
      catchError((e) => {
        console.log(e);
        if (e.error.message) return throwError(() => e.error.message);
        return throwError(
          () =>
            'No momento não estamos conseguindo validar este dados, tente novamente mais tarde!'
        );
      })
    );
  }

  public deleteSupplier(id: number): Observable<any> {
    return this.httpClient.delete(`${this.url()}/DeleteSupplier?id=${id}`).pipe(
      catchError((e) => {
        console.log(e);
        if (e.error.message) return throwError(() => e.error.message);
        return throwError(
          () =>
            'No momento não estamos conseguindo validar este dados, tente novamente mais tarde!'
        );
      })
    );
  }
}
