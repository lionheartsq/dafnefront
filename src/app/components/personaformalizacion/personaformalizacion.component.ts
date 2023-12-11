import { Component, ViewChild } from '@angular/core';
import { ElementRef, QueryList, ViewChildren } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service';
import { LoginService } from 'src/app/services/login.service';
import { NgModel } from '@angular/forms';
import Swal from 'sweetalert2';
import { isEmpty } from 'rxjs';
import { SimulacionesService } from 'src/app/services/simulaciones.service';
import { FormalizacionService } from '../../services/formalizacion.service';

@Component({
  selector: 'app-personaformalizacion',
  templateUrl: './personaformalizacion.component.html',
  styleUrls: ['./personaformalizacion.component.css']
})
export class PersonaformalizacionComponent {
  arrayValores: any;
  isChecked: string="Sí";
  flag: number=0;
  idUsuarioSiguiente: any;
  arrayPersonas: any;
  idPersonasNext: any;
  paramUsuario: any;
  tipoProducto: any;
  valor: any;
  isVerificadoNombre: any;
  nombreEmpresa: any;

  private isRequestInProgress: boolean = false;

  //Inicio variables para validar bitacora ***
  //*******************************************//
  idModulo:number=3;
  nombreSeccion:string="personaformalizacion";
  identificadorSeccion: string="";
  variableSeccion: string="";
  idUsuarioCargado: any;
  pasosAvance: number=0;
  personaNaturalFlag: any;
  mensaje: string="";
  //*******************************************//
  //Fin variables para validar bitacora ***
  constructor(public router:Router, private loginService:LoginService, private utilsService:UtilsService, private route: ActivatedRoute, private simulacionService:SimulacionesService, private formalizacionService:FormalizacionService) {}

  ngOnInit(): void {
    this.idUsuarioCargado=localStorage.getItem('identificador_usuario');
    //
    console.log("Usuario cargado: "+this.idUsuarioCargado);
    this.verAvance(this.idUsuarioCargado,this.idModulo);
  }

    //Inicio funciones nuevas para validar bitacora. ***
  //*******************************************//
  verAvance(idUsuario:any, idModulo:any){
    this.loginService.verAvance(idUsuario, idModulo).subscribe(
      (data) => {
        console.log("Seccion: "+JSON.stringify(data));

        if (data.seccion !== null) {
          this.variableSeccion = String(data.seccion.seccion);
        } else {
          this.variableSeccion = this.nombreSeccion; // O cualquier valor predeterminado que desees
        }

        console.log("VALOR VARIABLESECCION IN: "+this.variableSeccion);
        this.luegoDeObtenerVariableSeccion(this.variableSeccion);
      },
      (err) => {
        this.luegoDeObtenerVariableSeccion(this.nombreSeccion);
        console.log("SEC ERR: "+err); // Manejo de errores
      }
    );
  }

  luegoDeObtenerVariableSeccion(variableSeccion:any) {
    console.log("VALOR VARIABLESECCION OUT: " + variableSeccion);
    this.identificadorSeccion=variableSeccion;
    // Coloca aquí cualquier lógica que dependa de this.variableSeccion
    console.log("Identificador Seccion: "+this.identificadorSeccion);
    console.log("nombre Seccion: "+this.nombreSeccion);

    if(this.identificadorSeccion===this.nombreSeccion){
      this.mensaje="Cargado";
    }else{
      console.log("VAL RUTA: this.router.navigate(["+this.identificadorSeccion+"])");
      this.router.navigate([this.variableSeccion]);//validar lo del usuario
    }
  }
  //*******************************************//
  //Fin funciones nuevas para validar bitacora. ***


  endRouteFormalizacion(){

  }

  reiniciarModulo(){

  }

  reiniciarTodo(){

  }

  guardarUno(){
    this.pasosAvance=1;
  }

  guardarDos(){
    this.pasosAvance=2;
  }

  guardarTres(){
    this.pasosAvance=3;
  }

  guardarCuatro(){
    this.pasosAvance=4;
  }

  guardarCinco(){
    this.pasosAvance=5;
  }

  guardarSeis(){
    this.pasosAvance=6;
  }

  guardarSiete(){
    this.pasosAvance=7;
  }

  guardarOcho(){
    this.pasosAvance=8;
  }

  guardarNueve(){
    this.pasosAvance=9;
  }

  guardarDiez(){
    this.pasosAvance=10;
  }

  guardarOnce(){
    this.pasosAvance=11;
  }

  guardarDoce(){
    this.pasosAvance=12;
  }

  guardarTrece(){
    this.pasosAvance=99;
  }

  //Inicio nueva Ruta ***
  //*******************************************//
  homeRoute(){
    this.router.navigate(['home']);
  }
  //*******************************************//
  //Fin nueva Ruta ***
}
