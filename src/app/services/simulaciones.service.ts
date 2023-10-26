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
export class SimulacionesService {
  private urlBase=GlobalConstants.apiURL;

  //private urlBase='http://127.0.0.1:8000';

  private endpointPregunta='api/auth/preguntas_legal/pre';

  private endpointSiguiente='api/auth/preguntas_legal/nextflow';

  constructor(private httpClient: HttpClient) { }

  public lecturaPregunta(idUsuario:any, idP:any): Observable<any> {
    return this.httpClient.get(`${this.urlBase}/${this.endpointPregunta}?idUsuario=${idUsuario}&idP=${idP}`);
  }

  public lecturaSiguiente(idUsuario:any, idP:any, valor:any): Observable<any> {
    return this.httpClient.get(`${this.urlBase}/${this.endpointSiguiente}?idUsuario=${idUsuario}&idP=${idP}&valor=${valor}`);
  }
}
