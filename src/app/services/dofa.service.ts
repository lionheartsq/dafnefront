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

  private endpointSaveFvsO='api/auth/matriz_dofa/store';

  private endpointFvsOGeneral='api/auth/matriz_dofa';

  private endpointFvsOPropio='api/auth/matriz_dofa/selectmatriz_dofa';

  private endpointUpdateFvsO='api/auth/matriz_dofa/update';

  private endpointSaveFvsA='api/auth/matriz_dofa/store';

  private endpointFvsAGeneral='api/auth/matriz_dofa';

  private endpointFvsAPropio='api/auth/matriz_dofa/selectmatriz_dofa';

  private endpointUpdateFvsA='api/auth/matriz_dofa/update';

  private endpointSaveDvsO='api/auth/matriz_dofa/store';

  private endpointDvsOGeneral='api/auth/matriz_dofa';

  private endpointDvsOPropio='api/auth/matriz_dofa/selectmatriz_dofa';

  private endpointUpdateDvsO='api/auth/matriz_dofa/update';

  private endpointSaveDvsA='api/auth/matriz_dofa/store';

  private endpointDvsAGeneral='api/auth/matriz_dofa';

  private endpointDvsAPropio='api/auth/matriz_dofa/selectmatriz_dofa';

  private endpointUpdateDvsA='api/auth/matriz_dofa/update';

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
}
