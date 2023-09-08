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
export class ResumenempresaService {
  private urlBase=GlobalConstants.apiURL;

  //private urlBase='http://127.0.0.1:8000';

  private endpointGetEmpresa='api/auth/resumen_empresa/selectresumen_empresa';

  private endpointStore='api/auth/resumen_empresa/store';

  private endpointUpdate='api/auth/resumen_empresa/update';

  private endpointLeerResumen='api/auth/resumen_empresa/selectresumen_empresa_usuario';

  private endpointLeerExperiencia='api/auth/experiencia/selectresumen_experiencia_usuario';

  private endpointLeerOcupacion='api/auth/ocupacion/selectresumen_ocupacion_usuario';

  private endpointLeerEscolaridad='api/auth/escolaridad/selectresumen_escolaridad_usuario';

  private endpointUsuario='api/auth/usuario/selectusuario';

  private endpointHobbies='api/auth/usuario_hobbies/usuariohobbies';

  private endpointSuenos='api/auth/usuario_suenos/usuariosuenos';

  private endpointCargarImagen='api/auth/upload-image';

  constructor(private httpClient: HttpClient) { }


  public getEmpresa(id:any): Observable<any> {
    return this.httpClient.get(`${this.urlBase}/${this.endpointGetEmpresa}/${id}`);
  }

  public getEmpresaPropio(id:any): Observable<any> {
    return this.httpClient.get(`${this.urlBase}/${this.endpointLeerResumen}/${id}`);
  }

  public getExperienciaPropio(id:any): Observable<any> {
    return this.httpClient.get(`${this.urlBase}/${this.endpointLeerExperiencia}/${id}`);
  }

  public getEscolaridadPropio(id:any): Observable<any> {
    return this.httpClient.get(`${this.urlBase}/${this.endpointLeerEscolaridad}/${id}`);
  }

  public getOcupacionPropio(id:any): Observable<any> {
    return this.httpClient.get(`${this.urlBase}/${this.endpointLeerOcupacion}/${id}`);
  }

  public getUsuario(id:any): Observable<any> {
    return this.httpClient.get(`${this.urlBase}/${this.endpointUsuario}/${id}`);
  }

  public getHobbies(id:any): Observable<any> {
    return this.httpClient.get(`${this.urlBase}/${this.endpointHobbies}/${id}`);
  }

  public getSuenos(id:any): Observable<any> {
    return this.httpClient.get(`${this.urlBase}/${this.endpointSuenos}/${id}`);
  }

  public crearEmpresa(user: any): Observable<any>{
    return this.httpClient.post(`${this.urlBase}/${this.endpointStore}`, user)
  }

  public actualizarEmpresa(data: any): Observable<any>{
    const url = `${this.urlBase}/${this.endpointUpdate}`;
    return this.httpClient.put(url, data);
  }

  public cargarImagen(user: any): Observable<any>{
    return this.httpClient.post(`${this.urlBase}/${this.endpointCargarImagen}`, user)
  }

}
