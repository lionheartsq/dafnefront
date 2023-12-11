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
  selector: 'app-basicoformalizacion',
  templateUrl: './basicoformalizacion.component.html',
  styleUrls: ['./basicoformalizacion.component.css']
})
export class BasicoformalizacionComponent {

  buttonDisabled: boolean=true;
  idUsuarioEmprendedor: any;
  verPregunta: boolean=true;

  //Inicio variables para validar bitacora ***
  //*******************************************//
  idModulo:number=3;
  nombreSeccion:string="basicoformalizacion";
  identificadorSeccion: string="";
  variableSeccion: string="";
  idUsuarioCargado: any;
  personaNaturalFlag: string="empresa";
  //*******************************************//
  //Fin variables para validar bitacora ***
  constructor(public router:Router, private loginService:LoginService, private utilsService:UtilsService, private route: ActivatedRoute, private simulacionService:SimulacionesService, private formalizacionService:FormalizacionService) {}

  ngOnInit(): void {
    this.idUsuarioCargado=localStorage.getItem('identificador_usuario');
    this.idUsuarioEmprendedor=localStorage.getItem('identificador_emprendedor');
    //
    console.log("Usuario cargado: "+this.idUsuarioCargado);

    if(this.idUsuarioEmprendedor===null){
      this.verPregunta=false;
    }
    else{
      // Espera 3 segundos antes de mostrar el botón
      setTimeout(() => {
        this.buttonDisabled = false;
      }, 3000); // 3000 milisegundos = 3 segundos

      this.verAvance(this.idUsuarioCargado,this.idModulo);
    }
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
      this.validarPersona(this.idUsuarioCargado);
    }else{
      console.log("VAL RUTA: this.router.navigate(["+this.identificadorSeccion+"])");
      this.router.navigate([this.variableSeccion]);//validar lo del usuario
    }
  }
  //*******************************************//
  //Fin funciones nuevas para validar bitacora. ***

  validarPersona(idUsuario:any){
    this.utilsService.validarPersona(idUsuario).subscribe(
      (data) => {
        if (data.persona_natural === 0) {
          this.personaNaturalFlag = "empresa"; //No es persona - recomienda empresa
        } else {
          this.personaNaturalFlag = "persona"; //No es empresa - recomienda persona
        }
      },
      (err) => {
        console.log("SEC ERR: "+err); // Manejo de errores
      }
    );
  }

  formalizacionPersona(){
        //Inicio Modificacion Bitacora ***
        //*******************************************//
        const bitacora = {avance:1, idSeccion:24, idUsuario:parseInt(this.idUsuarioCargado)};
        this.loginService.crearBitacora(bitacora).subscribe( (data)=>{
          console.log("Bitacora registrada");
          this.router.navigate(['personaformalizacion']);
        }, (err) => {
          console.log(err); // Manejo de errores
        });
        //*******************************************//
        //Fin Modificacion Bitacora ***
  }

  formalizacionEmpresa(){
        //Inicio Modificacion Bitacora ***
        //*******************************************//
        const bitacora = {avance:1, idSeccion:25, idUsuario:parseInt(this.idUsuarioCargado)};
        this.loginService.crearBitacora(bitacora).subscribe( (data)=>{
          console.log("Bitacora registrada");
          this.router.navigate(['empresaformalizacion']);
        }, (err) => {
          console.log(err); // Manejo de errores
        });
        //*******************************************//
        //Fin Modificacion Bitacora ***
  }


  //Inicio nueva Ruta ***
  //*******************************************//
  homeRoute(){
    this.router.navigate(['home']);
  }
  //*******************************************//
  //Fin nueva Ruta ***
}
