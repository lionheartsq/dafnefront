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
export class ExperienciaService {

  private urlBase=GlobalConstants.apiURL;

  //private urlBase='http://127.0.0.1:8000';

  private endpointSaveEscolaridad='api/auth/escolaridad/store';

  private endpointEscolaridad='api/auth/escolaridad';

  private endpointOneEscolaridad='api/auth/escolaridad/selectescolaridad';

  private endpointSaveOcupacion='api/auth/ocupacion/store';

  private endpointOcupacion='api/auth/ocupacion';

  private endpointOneOcupacion='api/auth/ocupacion/selectocupacion';

  private endpointSaveExperiencia='api/auth/experiencia/store';

  private endpointExperiencia='api/auth/experiencia';

  private endpointOneExperiencia='api/auth/experiencia/selectexperiencia';

  constructor(private httpClient: HttpClient) { }

  crearEscolaridad(user: any): Observable<any>{
    return this.httpClient.post(`${this.urlBase}/${this.endpointSaveEscolaridad}`, user)
  }

  public lecturaEscolaridad(): Observable<any> {
    return this.httpClient.get(`${this.urlBase}/${this.endpointEscolaridad}`);
  }

  public lecturaOneEscolaridad(id:any): Observable<any> {
    return this.httpClient.get(`${this.urlBase}/${this.endpointOneEscolaridad}/${id}`);
  }

  crearOcupacion(user: any): Observable<any>{
    return this.httpClient.post(`${this.urlBase}/${this.endpointSaveOcupacion}`, user)
  }

  public lecturaOcupacion(): Observable<any> {
    return this.httpClient.get(`${this.urlBase}/${this.endpointOcupacion}`);
  }

  public lecturaOneOcupacion(id:any): Observable<any> {
    return this.httpClient.get(`${this.urlBase}/${this.endpointOneOcupacion}/${id}`);
  }

  crearExperiencia(user: any): Observable<any>{
    return this.httpClient.post(`${this.urlBase}/${this.endpointSaveExperiencia}`, user)
  }

  public lecturaExperiencia(): Observable<any> {
    return this.httpClient.get(`${this.urlBase}/${this.endpointExperiencia}`);
  }

  public lecturaOneExperiencia(id:any): Observable<any> {
    return this.httpClient.get(`${this.urlBase}/${this.endpointOneExperiencia}/${id}`);
  }
}
