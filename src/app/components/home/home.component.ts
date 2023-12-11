import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  idUsuario:any;
  globales: any;
  auxilio: any;
  uvt: any;
  minimo: any;

  constructor(public router: Router, private loginService:LoginService) {}

  async ngOnInit(): Promise<void> {
    console.log("UsuarioLocal: " + localStorage.getItem('nombre_usuario'));
    console.log("idUsuarioLocal: " + localStorage.getItem('identificador_usuario'));

    // Esperar a que setearGlobales termine antes de continuar
    this.globales = await this.setearGlobales();

    console.log("auxilioTransporte: " + localStorage.getItem('auxilio_transporte'));
    console.log("uvtActual: " + localStorage.getItem('uvt_actual'));
    console.log("sueldoMinimo: " + localStorage.getItem('sueldo_minimo'));
  }

  async setearGlobales(): Promise<any> {
    try {
      const data = await this.loginService.lecturaGlobales().toPromise();
      const globales = data.variables_globales;

      const auxilio = globales[0]["valor"];
      const uvt = globales[1]["valor"];
      const minimo = globales[2]["valor"];

      localStorage.setItem('auxilio_transporte', auxilio);
      localStorage.setItem('uvt_actual', uvt);
      localStorage.setItem('sueldo_minimo', minimo);

      return globales;  // Devolver globales para su uso posterior si es necesario
    } catch (err) {
      console.error(err);
      // Manejo de errores si es necesario
    }
  }

  loginFake(){
    this.router.navigate(['home']);
  }

  basicosRoute(){
    this.router.navigate(['basicos']);
  }

  simulacionRoute(){
    this.router.navigate(['simulacionlegal']);
  }

  formalizacionRoute(){
    this.router.navigate(['basicoformalizacion']);
  }

}
