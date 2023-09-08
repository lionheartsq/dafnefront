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
export class EvaluacionService {
  private urlBase=GlobalConstants.apiURL;

  //private urlBase='http://127.0.0.1:8000';

  private endpointGetideas='api/auth/usuario_ideas/usuarioideas';

  private endpointGetCriterios='api/auth/usuario_criterios/usuariocriterios';

  private endpointStore='api/auth/criterios_evaluacion/store';

  private endpointMatriz='api/auth/criterios_evaluacion/calcularmatriz';

  private endpointLeerMatriz='api/auth/matriz_evaluacion/selectmatriz_usuario';

  constructor(private httpClient: HttpClient) { }


  public getIdeasPropio(id:any): Observable<any> {
    return this.httpClient.get(`${this.urlBase}/${this.endpointGetideas}/${id}`);
  }

  public getCriteriosPropio(id:any): Observable<any> {
    return this.httpClient.get(`${this.urlBase}/${this.endpointGetCriterios}/${id}`);
  }

  public crearRegistro(user: any): Observable<any>{
    return this.httpClient.post(`${this.urlBase}/${this.endpointStore}`, user)
  }

  public crearMatriz(id:any): Observable<any> {
    return this.httpClient.get(`${this.urlBase}/${this.endpointMatriz}/${id}`);
  }

  public obtenerMatriz(id:any): Observable<any> {
    return this.httpClient.get(`${this.urlBase}/${this.endpointLeerMatriz}/${id}`);
  }
}
