import { Component, ViewChild } from '@angular/core';
import { ElementRef, QueryList, ViewChildren } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service';
import { LoginService } from 'src/app/services/login.service';
import { NgModel } from '@angular/forms';
import { DofaService } from 'src/app/services/dofa.service';
import Swal from 'sweetalert2';
import { isEmpty } from 'rxjs';
import { SimulacionesService } from 'src/app/services/simulaciones.service';

@Component({
  selector: 'app-simulacionlegal',
  templateUrl: './simulacionlegal.component.html',
  styleUrls: ['./simulacionlegal.component.css']
})
export class SimulacionlegalComponent {
  arrayPreguntas: any;
  idPreguntas: number=0;
  preguntas: any;
  valor: number=1;
  arraySiguientes: any;
  idPreguntasNext: any;
  isChecked: string="Sí";
  flag: number=0;
  idUsuarioSiguiente: any;
  arrayPersonas: any;
  idPersonasNext: any;
  paramUsuario: any;
  tipologia: any;

  buttonDisabled: boolean=true;
  idUsuarioEmprendedor: any;
  verPregunta: boolean=true;

  private isRequestInProgress: boolean = false;

  //Inicio variables para validar bitacora ***
  //*******************************************//
  idModulo:number=2;
  nombreSeccion:string="simulacionlegal";
  identificadorSeccion: string="";
  variableSeccion: string="";
  idUsuarioCargado: any;
  arrayResumen: any []=[];
  arrayResumenLegal: any;
  valorArray: any;
  //*******************************************//
  //Fin variables para validar bitacora ***
  constructor(public router:Router, private loginService:LoginService, private utilsService:UtilsService, private route: ActivatedRoute, private simulacionService:SimulacionesService) {}

  ngOnInit(): void {
      this.idUsuarioCargado=localStorage.getItem('identificador_usuario');
      this.idUsuarioEmprendedor=localStorage.getItem('identificador_emprendedor');
      //
      console.log("Usuario cargado: "+this.idUsuarioCargado);
      console.log("Usuario emprendedor: "+this.idUsuarioEmprendedor);

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
      this.cargarDatosSimulacion();
    }else{
      console.log("VAL RUTA: this.router.navigate(["+this.identificadorSeccion+"])");
      this.router.navigate([this.variableSeccion]);//validar lo del usuario
    }
  }
  //*******************************************//
  //Fin funciones nuevas para validar bitacora. ***

  validarFlujo(){
      this.simulacionService.validarPregunta(this.idUsuarioCargado).subscribe(
        (data) => {
          //
          this.actualizarDatosSimulacion(data);
          //
          console.log("Proceso IF, usuario cargado: "+this.idUsuarioCargado);
        },
        (err) => {
          console.log(err); // Manejo de errores
        }
      );
  }

  actualizarDatosSimulacion(data: any) {
    // Actualiza las variables con los datos de la simulación
    try {
      this.idPreguntas = data.pregunta_simulacion[0].id;
      this.preguntas = data.pregunta_simulacion[0].pregunta;
    } catch (error) {
      this.simulacionService.lecturaSiguiente(this.idUsuarioCargado,this.idPreguntas, this.valor).subscribe(
        (data) => {
          //
          this.arraySiguientes=data;
          for (let dato in this.arraySiguientes){
            this.idPreguntasNext=this.arraySiguientes[dato].message;
          }
          console.log("Siguiente pregunta CATCH: "+this.idPreguntasNext);
              console.log("ENTRA POR USUARIO CARGADO");
              this.paramUsuario=this.idUsuarioCargado;
              this.simulacionService.validatePersona(this.idUsuarioCargado).subscribe(
                (data) => {
                  //
                  console.log("DATA PERSONA: "+JSON.stringify(data));
                  this.idUsuarioSiguiente = data.cant_enunciado;

                  if(this.idUsuarioSiguiente==0){
                    //Si el valor es cero se va por empresa
                    this.flag=1;
                    this.tipologia="Empresa";
                    this.cargarResumenLegal();
                    console.log("idUsuarioSiguiente: "+this.idUsuarioSiguiente);
                  }else{
                    //Si el valor es uno se va por persona
                    this.flag=2;
                    this.tipologia="Persona";
                    this.cargarResumenLegal();
                    console.log("idUsuarioSiguiente: "+this.idUsuarioSiguiente);
                  }
                },
                (err) => {
                  console.log(err); // Manejo de errores
                }
              );
          },
        (err) => {
          console.log(err); // Manejo de errores
        }
      );
    }
  }

  cargarDatosSimulacion(){
    this.validarFlujo();
    this.simulacionService.lecturaPregunta(this.idUsuarioCargado,this.idPreguntas).subscribe(
      (data) => {
        //
        this.arrayPreguntas=data.pregunta_simulacion;
        for (let dato in this.arrayPreguntas){
          this.idPreguntas=this.arrayPreguntas[dato].id;
          this.preguntas=this.arrayPreguntas[dato].pregunta;
        }
        //
        console.log("Actual idPregunta: "+this.idPreguntas);
      },
      (err) => {
        console.log(err); // Manejo de errores
      }
    );
  }

  cargarDatosCaracterizacion(){
    this.simulacionService.lecturaPregunta(this.idUsuarioCargado,this.idPreguntas).subscribe(
      (data) => {
        //
        this.arrayPreguntas=data.pregunta_simulacion;
        for (let dato in this.arrayPreguntas){
          this.idPreguntas=this.arrayPreguntas[dato].id;
          this.preguntas=this.arrayPreguntas[dato].pregunta;
        }
        //
        console.log("Actual idPregunta: "+this.idPreguntas);
      },
      (err) => {
        console.log(err); // Manejo de errores
      }
    );
  }

  cargarSiguiente(){
    this.validarFlujo();
    // Actualiza el valor de this.valor en función del estado del toggle
    this.validarCheck();
    this.simulacionService.lecturaSiguiente(this.idUsuarioCargado,this.idPreguntas, this.valor).subscribe(
      (data) => {
        //
        this.arraySiguientes=data;
        for (let dato in this.arraySiguientes){
          this.idPreguntasNext=this.arraySiguientes[dato].message;
        }

        console.log("Siguiente pregunta: "+this.idPreguntasNext);

        this.recargarPagina();
      },
      (err) => {
        console.log(err); // Manejo de errores
      }
    );
  }

  cargarResumenLegal(){
    this.simulacionService.lecturaResumenLegal(this.idUsuarioCargado).subscribe(
      (data) => {
        //
        this.arrayResumenLegal=data.avances_legal;
        console.log("ARRAY RESUMEN LEGAL: "+JSON.stringify(this.arrayResumenLegal));
        for (let dato in this.arrayResumenLegal){
          console.log("DATO: "+this.arrayResumenLegal[dato].cadena);
          this.arrayResumen.push({cadena:this.arrayResumenLegal[dato].cadena});
        }
        console.log("ARRAY RESUMEN: "+JSON.stringify(this.arrayResumen));
      },
      (err) => {
        console.log(err); // Manejo de errores
      }
    );
  }

  reiniciarModulo(){
    this.simulacionService.resetLegal(this.idUsuarioCargado).subscribe(
      (data) => {
        //
        console.log("Reset Legal: "+data.reset_legal);
        this.recargarPagina();
      },
      (err) => {
        console.log(err); // Manejo de errores
      }
    );
  }

  reiniciarTodo(){
    this.simulacionService.resetLegal(this.idUsuarioCargado).subscribe(
      (data) => {
        //
        console.log("Reset Legal: "+data.reset_legal);
        this.recargarPagina();
      },
      (err) => {
        console.log(err); // Manejo de errores
      }
    );
  }

  recargarPagina() {
    window.location.reload();
  }


  validarCheck() {
    if (this.isChecked === 'Sí') {
      this.valor = 1;
    } else {
      this.valor = 2;
    }
  }

  endRouteEmpresa(){
    //Inicio Modificacion Bitacora ***
    //*******************************************//
    const bitacora = {avance:1, idSeccion:19, idUsuario:parseInt(this.idUsuarioCargado)};
    this.loginService.crearBitacora(bitacora).subscribe( (data)=>{
      console.log("Bitacora registrada");
      this.router.navigate(['simulaciontributaria']);
    }, (err) => {
      console.log(err); // Manejo de errores
    });
    //*******************************************//
    //Fin Modificacion Bitacora ***
  }

  endRoutePersona(){
    //Inicio Modificacion Bitacora ***
    //*******************************************//
    const bitacora = {avance:1, idSeccion:20, idUsuario:parseInt(this.idUsuarioCargado)};
    this.loginService.crearBitacora(bitacora).subscribe( (data)=>{
      console.log("Bitacora registrada");
      this.router.navigate(['simulaciontributariapersona']);
    }, (err) => {
      console.log(err); // Manejo de errores
    });
    //*******************************************//
    //Fin Modificacion Bitacora ***
  }

  saveRoute(){
    if (this.isRequestInProgress) {
      return;
    }

    this.isRequestInProgress = true;

    setTimeout(() => {
      this.cargarSiguiente();

      this.isRequestInProgress = false;
    }, 1000);

    // Muestra el valor actual de this.valor en la consola
    console.log("Valor actual de this.valor: " + this.valor);
    console.log("Valor actual de this.idUsuario: " + this.idUsuarioCargado);
    console.log("Valor actual de this.idP: " + this.idPreguntas);
  }

 //Inicio nueva Ruta ***
  //*******************************************//
  homeRoute(){
    this.router.navigate(['home']);
  }
  //*******************************************//
  //Fin nueva Ruta ***

}
