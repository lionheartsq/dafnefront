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
export class CanvasService {
  private urlBase=GlobalConstants.apiURL;

  //private urlBase='http://127.0.0.1:8000';

  private endpointSaveCanvas='api/auth/modelo_canvas/store';

  private endpointCanvasGeneral='api/auth/modelo_canvas';

  private endpointCanvasPropio='api/auth/modelo_canvas/selectmodelo_canvaspropio';

  private endpointUpdateCanvas='api/auth/modelo_canvas/update';

  constructor(private httpClient: HttpClient) { }

  public crearCanvas(user: any): Observable<any>{
    return this.httpClient.post(`${this.urlBase}/${this.endpointSaveCanvas}`, user)
  }

  public lecturaCanvasGeneral(): Observable<any> {
    return this.httpClient.get(`${this.urlBase}/${this.endpointCanvasGeneral}`);
  }

  public lecturaCanvasPropio(id:any): Observable<any> {
    return this.httpClient.get(`${this.urlBase}/${this.endpointCanvasPropio}/${id}`);
  }

  public enviarValor(data: any): Observable<any> {
    const url = `${this.urlBase}/${this.endpointUpdateCanvas}`; // Reemplaza con la URL de tu endpoint
    return this.httpClient.put(url, data);
  }
}
