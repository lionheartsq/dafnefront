/* Comentarios respecto al uso
Este servicio controla la autenticación y el almacenamiento del token en local storage, de igual forma hace uso del manejo
adecuado del mismo al momento del logout; el endpoint no se trabaja como global dado que apunta a otro servidor; la ruta se
establece en el archivo proxy para evitar el error de cors; al momento de recibir respuesta correcta redirecciona al componente
indicado; en este caso un componente en blanco llamado home.
*/

import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  endpoint: string = 'http://127.0.0.1:8000/api/auth/login';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};

  constructor(private http: HttpClient, public router: Router){}

    // Sign-in
    signIn(user:any, usuario:any) {
      return this.http.post<any>(`${this.endpoint}`, user)
        .subscribe((res: any) => {
          localStorage.setItem('access_token', res.access_token);
          localStorage.setItem('nombre_usuario', usuario);
          //console.log("Token: "+res.access_token);
          this.router.navigate(['home']);
        })
    }

    getToken() {
      return localStorage.getItem('access_token');
    }

    getUsuario() {
      return localStorage.getItem('nombre_usuario');
    }

    get isLoggedIn(): boolean {
      let authToken = localStorage.getItem('access_token');
      return (authToken !== null) ? true : false;
    }

    get isLoggedOut(): boolean {
      let authToken = localStorage.getItem('access_token');
      return (authToken === null) ? true : false;
    }

    doLogout() {
      let removeToken = localStorage.removeItem('access_token');
      if (removeToken == null) {
        this.router.navigate(['auth']);
      }
    }

    // Error
    handleError(error: HttpErrorResponse) {
      let msg = '';
      if (error.error instanceof ErrorEvent) {
        // client-side error
        msg = error.error.message;
      } else {
        // server-side error
        msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      return throwError(msg);
    }
}
