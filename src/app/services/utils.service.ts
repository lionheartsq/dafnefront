import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { retry, catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  private urlBase='http://127.0.0.1:8000';

  private endpointCiudades='api/auth/ciudad';

  private endpointUserEmail='api/auth/usuario/selectemail';

  constructor(private httpClient: HttpClient, private loginService:LoginService) { }

  public lecturaCiudades(): Observable<any> {
    return this.httpClient.get(`${this.urlBase}/${this.endpointCiudades}`);
  }

  public lecturaUsuarioEmail(idUser:any): Observable<any> {
    return this.httpClient.get(`${this.urlBase}/${this.endpointUserEmail}/${idUser}`);
  }
}
