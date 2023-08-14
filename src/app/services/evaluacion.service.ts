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

  private endpointGetIdeasCriterios='api/auth/relacion_ideas_criterios/relacionideascriterios';

  private endpointCountRelacion='api/auth/relacion_ideas_criterios/countrelacionideascriterios';

  private endpointSaveIdeas='api/auth/relacion_ideas_criterios/store';

  private endpointUpdateRelacion='api/auth/relacion_ideas_criterios/updaterelacionideascriterios';

  constructor(private httpClient: HttpClient) { }


  public getIdeasCriterios(id:any): Observable<any> {
    return this.httpClient.get(`${this.urlBase}/${this.endpointGetIdeasCriterios}/${id}`);
  }

  public countRelacionPropio(id:any): Observable<any> {
    return this.httpClient.get(`${this.urlBase}/${this.endpointCountRelacion}/${id}`);
  }

  public crearRelacion(user: any): Observable<any>{
    return this.httpClient.post(`${this.urlBase}/${this.endpointSaveIdeas}`, user)
  }

  public enviarValor(data: any): Observable<any> {
    const url = `${this.urlBase}/${this.endpointUpdateRelacion}`; // Reemplaza con la URL de tu endpoint
    return this.httpClient.post(url, data);
  }
}
