import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environments';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { EBrasilianStates } from '../../../Enum/EBrasilianStates.enum';

@Injectable({
  providedIn: 'root',
})
export class ListCompanyService {
  private url = signal<string>(environment.apiCompany);

  constructor(private httpClient: HttpClient, private router: Router) {}

  get apiListAllCompanies(): Observable<any> {
    return this.httpClient
      .get<any>(`${this.url()}/AllCompanys`)
      .pipe(tap((res) => res));
  }

  public apiGetCompanies(url: string): Observable<any> {
    return this.httpClient.get<any>(url).pipe(map((res) => res));
  }

  public insertCompany(payLoad: {
    fantasyName: string;
    cnpj: string;
    uf: number;
  }): Observable<any> {
    return this.httpClient.post(`${this.url()}/InsertCompany`, payLoad).pipe(
      catchError((e) => {
        if (e.error.message) return throwError(() => e.error.message);
        return throwError(
          () =>
            'No momento não estamos conseguindo validar este dados, tente novamente mais tarde!'
        );
      })
    );
  }

  public editCompany(payLoad: {
    id: number;
    fantasyName: string;
    cnpj: string;
    uf: number;
  }): Observable<any> {
    return this.httpClient.put(`${this.url()}/EditCompany`, payLoad).pipe(
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

  public deleteCompany(id: number): Observable<any> {
    return this.httpClient.delete(`${this.url()}/DeleteCompany?id=${id}`).pipe(
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
