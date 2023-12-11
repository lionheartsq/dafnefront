import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { retry, catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { GlobalConstants } from '../common/global-constants';

@Injectable({
  providedIn: 'root'
})
export class GestorService {
  private urlBase=GlobalConstants.apiURL;

  //private urlBase='http://127.0.0.1:8000';

  private endpointGetEmprendedores='api/auth/usuarioGestor';

  constructor(private httpClient: HttpClient) { }

  public listadoEmprendedores(idUsuario:any): Observable<any> {
    return this.httpClient.get(`${this.urlBase}/${this.endpointGetEmprendedores}/${idUsuario}`);
  }
}
