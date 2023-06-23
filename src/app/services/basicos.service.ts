import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { retry, catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BasicosService {

  private endpoint='http://127.0.0.1:8000/api/auth/usuario/store';

  private endpointUsuarios='http://127.0.0.1:8000/api/auth/usuario';

  private endpointUsuario='http://127.0.0.1:8000/api/auth/usuario/selectusuario';

  constructor(private httpClient: HttpClient) { }

  crearUsuario(user: any): Observable<any>{
    return this.httpClient.post(`${this.endpoint}`, user)
  }

  public lecturaUsuarios(): Observable<any> {
    return this.httpClient.get(`${this.endpointUsuarios}`);
  }

  public lecturaUsuario(id:any): Observable<any> {
    return this.httpClient.get(`${this.endpointUsuario}/${id}`);
  }

}
