import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { retry, catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SuenosService {

  private urlBase='http://127.0.0.1:8000';

  private endpointSaveSuenos='api/auth/suenos/store';

  private endpointSuenosGeneral='api/auth/suenos/selectsuenosgeneral';

  private endpointSuenosPropio='api/auth/suenos/selectsuenospropio';

  private endpointCloseRelacion='api/auth/usuario_suenos/closedeal';

  private endpointCountRelacion='api/auth/usuario_suenos/countsuenos';

  constructor(private httpClient: HttpClient) { }

  crearSuenos(user: any): Observable<any>{
    return this.httpClient.post(`${this.urlBase}/${this.endpointSaveSuenos}`, user)
  }

  public lecturaSuenosGeneral(): Observable<any> {
    return this.httpClient.get(`${this.urlBase}/${this.endpointSuenosGeneral}`);
  }

  public lecturaSuenosPropio(id:any): Observable<any> {
    return this.httpClient.get(`${this.urlBase}/${this.endpointSuenosPropio}/${id}`);
  }

  cerrarRelacionSuenos(user: any): Observable<any>{
    return this.httpClient.post(`${this.urlBase}/${this.endpointCloseRelacion}`, user)
  }

  public countSuenosPropio(id:any): Observable<any> {
    return this.httpClient.get(`${this.urlBase}/${this.endpointCountRelacion}/${id}`);
  }
}
