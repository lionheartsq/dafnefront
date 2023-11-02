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
import { GlobalConstants } from '../common/global-constants';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private urlBase=GlobalConstants.apiURL;

  //private urlBase='http://127.0.0.1:8000';

  private endpointEmail='api/auth/usuario/selectemaillogin';

  private endpoint= 'api/auth/login';

  private endpointRegister= 'api/auth/register';

  private endpointSeccion='api/auth/bitacora/validaravance';

  private endpointBitacora='api/auth/bitacora/store';

  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};
  idUsuario: any;

  constructor(private http: HttpClient, public router: Router){}

    // Sign-in
    signIn(user:any) {
      return this.http.post<any>(`${this.urlBase}/${this.endpoint}`, user)
        .subscribe((res: any) => {
          localStorage.setItem('access_token', res.access_token);
          localStorage.setItem('nombre_usuario', res.nombre_usuario);
          localStorage.setItem('email_usuario', res.email_usuario);
          localStorage.setItem('identificador_usuario', res.id_usuario);
          localStorage.setItem('rol', res.rol);
          console.log("Item idUsuario: "+localStorage.getItem('identificador_usuario'));
          console.log("Item rol: "+localStorage.getItem('rol'));
          //console.log("Token: "+res.access_token);
          if(res.rol==1){
            this.router.navigate(['administrador']);
          }else if(res.rol==3){
            this.router.navigate(['home']);
          }

        })
    }

    public crearEmprendedor(user: any): Observable<any>{
      return this.http.post(`${this.urlBase}/${this.endpointRegister}`, user)
    }

    public verAvance(idUsuario:any, idModulo:any): Observable<any> {
      //
      console.log("Query Ver Avance: "+`${this.urlBase}/${this.endpointSeccion}?idUsuario=${idUsuario}&idModulo=${idModulo}`);
      return this.http.get(`${this.urlBase}/${this.endpointSeccion}?idUsuario=${idUsuario}&idModulo=${idModulo}`);
    }

    public crearBitacora(user: any): Observable<any>{
      return this.http.post(`${this.urlBase}/${this.endpointBitacora}`, user)
    }

    public lecturaUsuario(email:any): Observable<any> {
      //console.log("Query: "+`${this.urlBase}/${this.endpointEmail}/${email}`);
      return this.http.get(`${this.urlBase}/${this.endpointEmail}/${email}`);
    }

    public fetchOptions(email: any): Observable<any> {
      return this.lecturaUsuario(email).pipe(
        map((data) => data.idUsuario)
      );
    }

    getToken() {
      return localStorage.getItem('access_token');
    }

    getUsuario() {
      return localStorage.getItem('nombre_usuario');
    }

    getIdUsuario() {
      return localStorage.getItem('identificador_usuario');
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
      localStorage.clear();
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
