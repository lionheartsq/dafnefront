import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { retry, catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { GlobalConstants } from '../common/global-constants';

@Injectable({
  providedIn: 'root'
})
export class CriteriosService {
  private urlBase=GlobalConstants.apiURL;

  //private urlBase='http://127.0.0.1:8000';

  private endpointSaveCriterios='api/auth/criterios/store';

  private endpointCriteriosGeneral='api/auth/criterios/selectcriteriosgeneral';

  private endpointCriteriosPropio='api/auth/criterios/selectcriteriospropio';

  private endpointCloseRelacion='api/auth/usuario_criterios/closedeal';

  private endpointCountRelacion='api/auth/usuario_criterios/countcriterios';

  private endpointGetRelacion='api/auth/usuario_criterios/usuariocriterios';

  private endpointUpdateRelacion='api/auth/usuario_criterios/updateusuariocriterios';

  constructor(private httpClient: HttpClient) { }

  crearCriterios(user: any): Observable<any>{
    return this.httpClient.post(`${this.urlBase}/${this.endpointSaveCriterios}`, user)
  }

  public lecturaCriteriosGeneral(): Observable<any> {
    return this.httpClient.get(`${this.urlBase}/${this.endpointCriteriosGeneral}`);
  }

  public lecturaCriteriosPropio(id:any): Observable<any> {
    return this.httpClient.get(`${this.urlBase}/${this.endpointCriteriosPropio}/${id}`);
  }

  cerrarRelacionCriterios(user: any): Observable<any>{
    return this.httpClient.post(`${this.urlBase}/${this.endpointCloseRelacion}`, user)
  }

  public countCriteriosPropio(id:any): Observable<any> {
    return this.httpClient.get(`${this.urlBase}/${this.endpointCountRelacion}/${id}`);
  }

  public getCriteriosPropio(id:any): Observable<any> {
    return this.httpClient.get(`${this.urlBase}/${this.endpointGetRelacion}/${id}`);
  }

  public enviarValor(data: any): Observable<any> {
    const url = `${this.urlBase}/${this.endpointUpdateRelacion}`; // Reemplaza con la URL de tu endpoint
    return this.httpClient.post(url, data);
  }
}
