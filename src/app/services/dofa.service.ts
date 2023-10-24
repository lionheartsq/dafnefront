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

  private endpointSaveFvsO='api/auth/fortalezas_oportunidades/store';

  private endpointFvsOGeneral='api/auth/fortalezas_oportunidades';

  private endpointFvsOPropio='api/auth/fortalezas_oportunidades/selectfortalezas_oportunidades';

  private endpointUpdateFvsO='api/auth/fortalezas_oportunidades/update';

  private endpointSaveFvsA='api/auth/fortalezas_amenazas/store';

  private endpointFvsAGeneral='api/auth/fortalezas_amenazas';

  private endpointFvsAPropio='api/auth/fortalezas_amenazas/selectfortalezas_amenazas';

  private endpointUpdateFvsA='api/auth/fortalezas_amenazas/update';

  private endpointSaveDvsO='api/auth/debilidades_oportunidades/store';

  private endpointDvsOGeneral='api/auth/debilidades_oportunidades';

  private endpointDvsOPropio='api/auth/debilidades_oportunidades/selectdebilidades_oportunidades';

  private endpointUpdateDvsO='api/auth/debilidades_oportunidades/update';

  private endpointSaveDvsA='api/auth/debilidades_amenazas/store';

  private endpointDvsAGeneral='api/auth/debilidades_amenazas';

  private endpointDvsAPropio='api/auth/debilidades_amenazas/selectdebilidades_amenazas';

  private endpointUpdateDvsA='api/auth/debilidades_amenazas/update';

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

  public crearFO(user: any): Observable<any>{
    return this.httpClient.post(`${this.urlBase}/${this.endpointSaveFvsO}`, user)
  }

  public lecturaFOGeneral(): Observable<any> {
    return this.httpClient.get(`${this.urlBase}/${this.endpointFvsOGeneral}`);
  }

  public lecturaFOPropio(id:any): Observable<any> {
    return this.httpClient.get(`${this.urlBase}/${this.endpointFvsOPropio}/${id}`);
  }

  public enviarValorFO(data: any): Observable<any>{
    const url = `${this.urlBase}/${this.endpointUpdateFvsO}`;
    return this.httpClient.put(url, data);
  }

//////////////////////////////////////////////////////////////

  public crearFA(user: any): Observable<any>{
    return this.httpClient.post(`${this.urlBase}/${this.endpointSaveFvsA}`, user)
  }

  public lecturaFAGeneral(): Observable<any> {
    return this.httpClient.get(`${this.urlBase}/${this.endpointFvsAGeneral}`);
  }

  public lecturaFAPropio(id:any): Observable<any> {
    return this.httpClient.get(`${this.urlBase}/${this.endpointFvsAPropio}/${id}`);
  }

  public enviarValorFA(data: any): Observable<any>{
    const url = `${this.urlBase}/${this.endpointUpdateFvsA}`;
    return this.httpClient.put(url, data);
  }

//////////////////////////////////////////////////////////////

  public crearDO(user: any): Observable<any>{
    return this.httpClient.post(`${this.urlBase}/${this.endpointSaveDvsO}`, user)
  }

  public lecturaDOGeneral(): Observable<any> {
    return this.httpClient.get(`${this.urlBase}/${this.endpointDvsOGeneral}`);
  }

  public lecturaDOPropio(id:any): Observable<any> {
    return this.httpClient.get(`${this.urlBase}/${this.endpointDvsOPropio}/${id}`);
  }

  public enviarValorDO(data: any): Observable<any>{
    const url = `${this.urlBase}/${this.endpointUpdateDvsO}`;
    return this.httpClient.put(url, data);
  }

//////////////////////////////////////////////////////////////

  public crearDA(user: any): Observable<any>{
    return this.httpClient.post(`${this.urlBase}/${this.endpointSaveDvsA}`, user)
  }

  public lecturaDAGeneral(): Observable<any> {
    return this.httpClient.get(`${this.urlBase}/${this.endpointDvsAGeneral}`);
  }

  public lecturaDAPropio(id:any): Observable<any> {
    return this.httpClient.get(`${this.urlBase}/${this.endpointDvsAPropio}/${id}`);
  }

  public enviarValorDA(data: any): Observable<any>{
    const url = `${this.urlBase}/${this.endpointUpdateDvsA}`;
    return this.httpClient.put(url, data);
  }

}
