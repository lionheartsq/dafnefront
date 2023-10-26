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
export class DofaService {
  private urlBase=GlobalConstants.apiURL;

  //private urlBase='http://127.0.0.1:8000';

  private endpointSaveDofa='api/auth/matriz_dofa/store';

  private endpointDofaGeneral='api/auth/matriz_dofa';

  private endpointDofaPropio='api/auth/matriz_dofa/selectmatriz_dofa';

  private endpointUpdateDofa='api/auth/matriz_dofa/update';

  private endpointSaveEstrategias='api/auth/estrategias/store';

  private endpointEstrategiasGeneral='api/auth/estrategias';

  private endpointEstrategiasPropio='api/auth/estrategias/selectestrategias';

  private endpointUpdateEstrategias='api/auth/estrategias/update';

  constructor(private httpClient: HttpClient) { }

  public crearDofa(user: any): Observable<any>{
    return this.httpClient.post(`${this.urlBase}/${this.endpointSaveDofa}`, user)
  }

  public lecturaDofaGeneral(): Observable<any> {
    return this.httpClient.get(`${this.urlBase}/${this.endpointDofaGeneral}`);
  }

  public lecturaDofaPropio(id:any): Observable<any> {
    return this.httpClient.get(`${this.urlBase}/${this.endpointDofaPropio}/${id}`);
  }

  public enviarValor(data: any): Observable<any>{
    const url = `${this.urlBase}/${this.endpointUpdateDofa}`;
    return this.httpClient.put(url, data);
  }

//////////////////////////////////////////////////////////////

  public crearEstrategias(user: any): Observable<any>{
    return this.httpClient.post(`${this.urlBase}/${this.endpointSaveEstrategias}`, user)
  }

  public lecturaEstrategiasGeneral(): Observable<any> {
    return this.httpClient.get(`${this.urlBase}/${this.endpointEstrategiasGeneral}`);
  }

  public lecturaEstrategiasPropio(id:any): Observable<any> {
    return this.httpClient.get(`${this.urlBase}/${this.endpointEstrategiasPropio}/${id}`);
  }

  public enviarValorEstrategias(data: any): Observable<any>{
    const url = `${this.urlBase}/${this.endpointUpdateEstrategias}`;
    return this.httpClient.put(url, data);
  }

}
