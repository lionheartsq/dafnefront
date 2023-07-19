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
export class HobbiesService {

  private urlBase=GlobalConstants.apiURL;

  //private urlBase='http://127.0.0.1:8000';

  private endpointSaveHobbies='api/auth/hobbies/store';

  private endpointHobbiesGeneral='api/auth/hobbies/selecthobbiesgeneral';

  private endpointHobbiesPropio='api/auth/hobbies/selecthobbiespropio';

  private endpointCloseRelacion='api/auth/usuario_hobbies/closedeal';

  private endpointCountRelacion='api/auth/usuario_hobbies/counthobbies';

  private endpointGetRelacion='api/auth/usuario_hobbies/usuariohobbies';

  private endpointUpdateRelacion='api/auth/usuario_hobbies/updateusuariohobbies';

  constructor(private httpClient: HttpClient) { }

  crearHobbies(user: any): Observable<any>{
    return this.httpClient.post(`${this.urlBase}/${this.endpointSaveHobbies}`, user)
  }

  public lecturaHobbiesGeneral(): Observable<any> {
    return this.httpClient.get(`${this.urlBase}/${this.endpointHobbiesGeneral}`);
  }

  public lecturaHobbiesPropio(id:any): Observable<any> {
    return this.httpClient.get(`${this.urlBase}/${this.endpointHobbiesPropio}/${id}`);
  }

  cerrarRelacionHobbies(user: any): Observable<any>{
    return this.httpClient.post(`${this.urlBase}/${this.endpointCloseRelacion}`, user)
  }

  public countHobbiesPropio(id:any): Observable<any> {
    return this.httpClient.get(`${this.urlBase}/${this.endpointCountRelacion}/${id}`);
  }

  public getHobbiesPropio(id:any): Observable<any> {
    return this.httpClient.get(`${this.urlBase}/${this.endpointGetRelacion}/${id}`);
  }

  enviarValor(data: any): Observable<any> {
    const url = `${this.urlBase}/${this.endpointUpdateRelacion}`; // Reemplaza con la URL de tu endpoint
    return this.httpClient.post(url, data);
  }
}
