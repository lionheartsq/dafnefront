import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { retry, catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  private endpointCiudades='http://127.0.0.1:8000/api/auth/ciudad';

  constructor(private httpClient: HttpClient) { }

  public lecturaCiudades(): Observable<any> {
    return this.httpClient.get(`${this.endpointCiudades}`);
  }

}
