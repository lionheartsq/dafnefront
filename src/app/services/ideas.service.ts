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
export class IdeasService {
  private urlBase=GlobalConstants.apiURL;

  //private urlBase='http://127.0.0.1:8000';

  private endpointSaveIdeas='api/auth/ideas/store';

  private endpointIdeasGeneral='api/auth/ideas/selectideasgeneral';

  private endpointIdeasPropio='api/auth/ideas/selectideaspropio';

  private endpointCloseRelacion='api/auth/usuario_ideas/closedeal';

  private endpointCountRelacion='api/auth/usuario_ideas/countideas';

  private endpointUsuarioIdeasPropio='api/auth/usuario_ideas/usuarioideas';

  constructor(private httpClient: HttpClient) { }

  public crearIdeas(user: any): Observable<any>{
    return this.httpClient.post(`${this.urlBase}/${this.endpointSaveIdeas}`, user)
  }

  public lecturaIdeasGeneral(): Observable<any> {
    return this.httpClient.get(`${this.urlBase}/${this.endpointIdeasGeneral}`);
  }

  public lecturaIdeasPropio(id:any): Observable<any> {
    return this.httpClient.get(`${this.urlBase}/${this.endpointIdeasPropio}/${id}`);
  }

  public cerrarRelacionIdeas(user: any): Observable<any>{
    return this.httpClient.post(`${this.urlBase}/${this.endpointCloseRelacion}`, user)
  }

  public countIdeasPropio(id:any): Observable<any> {
    return this.httpClient.get(`${this.urlBase}/${this.endpointCountRelacion}/${id}`);
  }

  public lecturaUsuarioIdeasPropio(id:any): Observable<any> {
    return this.httpClient.get(`${this.urlBase}/${this.endpointUsuarioIdeasPropio}/${id}`);
  }
}
