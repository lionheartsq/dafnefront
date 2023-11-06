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

  private endpointUpdateBitacora='api/auth/bitacora/updatereg';

  private endpointFlujo='api/auth/preguntas_legal/next';

  private endpointPregunta='api/auth/preguntas_legal/pre';

  private endpointSiguiente='api/auth/preguntas_legal/nextflow';

  private endpointValidatePersona='api/auth/preguntas_legal/validatepersona';

  private endpointFlujoT='api/auth/preguntas_tributario/next';

  private endpointPreguntaT='api/auth/preguntas_tributario/pre';

  private endpointSiguienteT='api/auth/preguntas_tributario/nextflow';

  private endpointFlujoTP='api/auth/preguntas_tributario_persona/next';

  private endpointPreguntaTP='api/auth/preguntas_tributario_persona/pre';

  private endpointSiguienteTP='api/auth/preguntas_tributario_persona/nextflow';

  private endpointResumenLegal='api/auth/avances_legal/selectavances_legalresumen';

  private endpointResumenTributarioPersona='api/auth/avances_tributario_persona/selectavances_tributario_personaresumen';

  private endpointResumenTributarioEmpresa='api/auth/avances_tributario/selectavances_tributarioresumen';

  private endpointResetLegal='api/auth/avances_legal/resetlegal';

  private endpointResetTributarioPersona='api/auth/avances_tributario_persona/resettributariopersona';

  private endpointResetTributarioEmpresa='api/auth/avances_tributario/resettributarioempresa';

  constructor(private httpClient: HttpClient) { }

  public validarPregunta(idUsuario:any): Observable<any> {
    return this.httpClient.get(`${this.urlBase}/${this.endpointFlujo}?idUsuario=${idUsuario}`);
  }

  public lecturaPregunta(idUsuario:any, idP:any): Observable<any> {
    return this.httpClient.get(`${this.urlBase}/${this.endpointPregunta}?idUsuario=${idUsuario}&idP=${idP}`);
  }

  public lecturaSiguiente(idUsuario:any, idP:any, valor:any): Observable<any> {
    return this.httpClient.get(`${this.urlBase}/${this.endpointSiguiente}?idUsuario=${idUsuario}&idP=${idP}&valor=${valor}`);
  }

  public validatePersona(idUsuario:any): Observable<any> {
    console.log("QUERY SIGUIENTE: "+`${this.urlBase}/${this.endpointValidatePersona}?idUsuario=${idUsuario}`);
    return this.httpClient.get(`${this.urlBase}/${this.endpointValidatePersona}?idUsuario=${idUsuario}`);
  }

  public validarPreguntaT(idUsuario:any): Observable<any> {
    return this.httpClient.get(`${this.urlBase}/${this.endpointFlujoT}?idUsuario=${idUsuario}`);
  }

  public lecturaPreguntaT(idUsuario:any, idP:any): Observable<any> {
    return this.httpClient.get(`${this.urlBase}/${this.endpointPreguntaT}?idUsuario=${idUsuario}&idP=${idP}`);
  }

  public lecturaSiguienteT(idUsuario:any, idP:any, valor:any): Observable<any> {
    return this.httpClient.get(`${this.urlBase}/${this.endpointSiguienteT}?idUsuario=${idUsuario}&idP=${idP}&valor=${valor}`);
  }

  public validarPreguntaTP(idUsuario:any): Observable<any> {
    return this.httpClient.get(`${this.urlBase}/${this.endpointFlujoTP}?idUsuario=${idUsuario}`);
  }

  public lecturaPreguntaTP(idUsuario:any, idP:any): Observable<any> {
    return this.httpClient.get(`${this.urlBase}/${this.endpointPreguntaTP}?idUsuario=${idUsuario}&idP=${idP}`);
  }

  public lecturaSiguienteTP(idUsuario:any, idP:any, valor:any): Observable<any> {
    return this.httpClient.get(`${this.urlBase}/${this.endpointSiguienteTP}?idUsuario=${idUsuario}&idP=${idP}&valor=${valor}`);
  }

  public lecturaResumenLegal(idUsuario:any): Observable<any> {
    return this.httpClient.get(`${this.urlBase}/${this.endpointResumenLegal}/${idUsuario}`);
  }

  public lecturaResumenTributarioPersona(idUsuario:any): Observable<any> {
    return this.httpClient.get(`${this.urlBase}/${this.endpointResumenTributarioPersona}/${idUsuario}`);
  }

  public lecturaResumenTributarioEmpresa(idUsuario:any): Observable<any> {
    return this.httpClient.get(`${this.urlBase}/${this.endpointResumenTributarioEmpresa}/${idUsuario}`);
  }

  public resetLegal(idUsuario:any): Observable<any> {
    return this.httpClient.get(`${this.urlBase}/${this.endpointResetLegal}/${idUsuario}`);
  }

  public resetTributarioEmpresa(idUsuario:any): Observable<any> {
    return this.httpClient.get(`${this.urlBase}/${this.endpointResetTributarioEmpresa}/${idUsuario}`);
  }

  public resetTributarioPersona(idUsuario:any): Observable<any> {
    return this.httpClient.get(`${this.urlBase}/${this.endpointResetTributarioPersona}/${idUsuario}`);
  }

  public updateBitacora(data: any): Observable<any>{
    return this.httpClient.put(`${this.urlBase}/${this.endpointUpdateBitacora}`, data);
  }
}
