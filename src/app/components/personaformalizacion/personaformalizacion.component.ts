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
  nombre: any;
  marca: any;
  codigoCiiu: any;
  usoDeSuelo: any;
  direccion: any;
  rut: any;
  rues: any;
  sayco: any;
  bomberil: any;
  placa: any;
  seguridad: any;
  afiliacion: any;
  id: any;
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
      this.cargarDatosFormalizacion();
    }else{
      console.log("VAL RUTA: this.router.navigate(["+this.identificadorSeccion+"])");
      this.router.navigate([this.variableSeccion]);//validar lo del usuario
    }
  }
  //*******************************************//
  //Fin funciones nuevas para validar bitacora. ***

  cargarDatosFormalizacion(){
    this.formalizacionService.lecturaResumenPersona(this.idUsuarioCargado).subscribe(
      (data) => {
        //
        console.log("Data formalizacion: "+JSON.stringify(data));
        this.arrayValores=data.formalizacion_persona;
        for (let dato in this.arrayValores){
          this.id=this.arrayValores[dato].id;
          this.nombre=this.arrayValores[dato].nombre;
          this.marca=this.arrayValores[dato].marca;
          this.codigoCiiu=this.arrayValores[dato].codigoCiiu;
          this.usoDeSuelo=this.arrayValores[dato].usoDeSuelo;
          this.direccion=this.arrayValores[dato].direccion;
          this.rut=this.arrayValores[dato].rut;
          this.rues=this.arrayValores[dato].rues;
          this.sayco=this.arrayValores[dato].sayco;
          this.bomberil=this.arrayValores[dato].bomberil;
          this.placa=this.arrayValores[dato].placa;
          this.seguridad=this.arrayValores[dato].seguridad;
          this.afiliacion=this.arrayValores[dato].afiliacion;
          this.pasosAvance=this.arrayValores[dato].pasosAvance;
          console.log("PasosAvance: "+this.pasosAvance);
        }
      },
      (err) => {
        console.log(err); // Manejo de errores
      }
    );
  }

  endRouteFormalizacion(){

  }

  reiniciarModulo(){

  }

  reiniciarTodo(){

  }

  updateFormalizacion(){

    const persona={id:this.id, nombre:this.nombre, marca:this.marca, codigoCiiu:this.codigoCiiu, usoDeSuelo:this.usoDeSuelo, direccion:this.direccion, rut:this.rut, rues:this.rues, sayco:this.sayco, bomberil:this.bomberil,
      placa:this.placa, seguridad:this.seguridad, afiliacion:this.afiliacion, pasosAvance:this.pasosAvance, idUsuario:parseInt(this.idUsuarioCargado)};

      this.formalizacionService.formalizacionUpdatePersona(persona).subscribe((data) => {
        console.log("Bitacora actualizada");
        this.recargarPagina();
      }, (err) => {
        console.log(err); // Manejo de errores
      });
}

  guardarUno(){
    this.pasosAvance=1;
    this.updateFormalizacion();
  }

  guardarDos(){
    this.pasosAvance=2;
    this.updateFormalizacion();
  }

  guardarTres(){
    this.pasosAvance=3;
    this.updateFormalizacion();
  }

  guardarCuatro(){
    this.pasosAvance=4;
    this.updateFormalizacion();
  }

  guardarCinco(){
    this.pasosAvance=5;
    this.updateFormalizacion();
  }

  guardarSeis(){
    this.pasosAvance=6;
    this.updateFormalizacion();
  }

  guardarSiete(){
    this.pasosAvance=7;
    this.updateFormalizacion();
  }

  guardarOcho(){
    this.pasosAvance=8;
    this.updateFormalizacion();
  }

  guardarNueve(){
    this.pasosAvance=9;
    this.updateFormalizacion();
  }

  guardarDiez(){
    this.pasosAvance=10;
    this.updateFormalizacion();
  }

  guardarOnce(){
    this.pasosAvance=11;
    this.updateFormalizacion();
  }

  guardarDoce(){
    this.pasosAvance=12;
    this.updateFormalizacion();
  }

  guardarTrece(){
    this.pasosAvance=99;
  }

  recargarPagina() {
    window.location.reload();
  }

  //Inicio nueva Ruta ***
  //*******************************************//
  homeRoute(){
    this.router.navigate(['home']);
  }
  //*******************************************//
  //Fin nueva Ruta ***
}
