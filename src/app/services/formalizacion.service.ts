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
export class FormalizacionService {
  private urlBase=GlobalConstants.apiURL;

  //private urlBase='http://127.0.0.1:8000';

  private endpointUpdatePersona='api/auth/formalizacion_persona/update';

  private endpointUpdateEmpresa='api/auth/formalizacion_empresa/update';

  private endpointResumenEmpresa='api/auth/formalizacion_empresa/selectformalizacion_empresa_propio';

  private endpointResumenPersona='api/auth/formalizacion_persona/selectformalizacion_persona_propio';

  private validarProcesoSimulacion='api/auth/avances_legal/validarRegistroEmpresa';

  private validarSimulacionPersona='api/auth/avances_legal/validarPersona';

  private directorio='api/auth/directorio';

  private directorioUnico='api/auth/directorio/selectdirectorio';

  constructor(private httpClient: HttpClient) { }

  public formalizacionUpdatePersona(data: any): Observable<any>{
    return this.httpClient.put(`${this.urlBase}/${this.endpointUpdatePersona}`, data);
  }

  public formalizacionUpdateEmpresa(data: any): Observable<any>{
    return this.httpClient.put(`${this.urlBase}/${this.endpointUpdateEmpresa}`, data);
  }

  public lecturaResumenPersona(idUsuario:any): Observable<any> {
    return this.httpClient.get(`${this.urlBase}/${this.endpointResumenPersona}/${idUsuario}`);
  }

  public lecturaResumenEmpresa(idUsuario:any): Observable<any> {
    return this.httpClient.get(`${this.urlBase}/${this.endpointResumenEmpresa}/${idUsuario}`);
  }

  public validarSimulacion(idUsuario:any): Observable<any> {
    return this.httpClient.get(`${this.urlBase}/${this.validarProcesoSimulacion}/${idUsuario}`);
  }

  public validarSimulaPersona(idUsuario:any): Observable<any> {
    return this.httpClient.get(`${this.urlBase}/${this.validarSimulacionPersona}/${idUsuario}`);
  }

  public cargarDirectorio(): Observable<any> {
    return this.httpClient.get(`${this.urlBase}/${this.directorio}`);
  }

  public cargarDirectorioUno(id:any): Observable<any> {
    return this.httpClient.get(`${this.urlBase}/${this.directorioUnico}/${id}`);
  }

}
