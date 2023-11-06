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
  selector: 'app-simulaciontributariapersona',
  templateUrl: './simulaciontributariapersona.component.html',
  styleUrls: ['./simulaciontributariapersona.component.css']
})
export class SimulaciontributariapersonaComponent {
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

  //Inicio variables para validar bitacora ***
  //*******************************************//
  idModulo:number=2;
  nombreSeccion:string="simulaciontributariapersona";
  identificadorSeccion: string="";
  variableSeccion: string="";
  idUsuarioCargado: any;
  arrayResumen: any []=[];
  arrayResumenLegal: any;
  valorArray: any;
  buttonDisabled: boolean=true;
  //*******************************************//
  //Fin variables para validar bitacora ***
  constructor(public router:Router, private loginService:LoginService, private utilsService:UtilsService, private route: ActivatedRoute, private simulacionService:SimulacionesService) {}

  ngOnInit(): void {
      this.idUsuarioCargado=localStorage.getItem('identificador_usuario');
      //
      console.log("Usuario cargado: "+this.idUsuarioCargado);

      // Espera 3 segundos antes de mostrar el botón
      setTimeout(() => {
        this.buttonDisabled = false;
      }, 1500); // 1500 milisegundos = 1.5 segundos

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
      this.cargarDatosSimulacion();
    }else{
      console.log("VAL RUTA: this.router.navigate(["+this.identificadorSeccion+"])");
      this.router.navigate([this.variableSeccion]);//validar lo del usuario
    }
  }
  //*******************************************//
  //Fin funciones nuevas para validar bitacora. ***

  validarFlujo(){
      this.simulacionService.validarPreguntaTP(this.idUsuarioCargado).subscribe(
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
              this.flag=1;
              this.cargarResumenLegal();
        },
        (err) => {
          console.log(err); // Manejo de errores
        }
      );
    }
  }

  cargarDatosSimulacion(){
    this.validarFlujo();
    this.simulacionService.lecturaPreguntaTP(this.idUsuarioCargado,this.idPreguntas).subscribe(
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
    this.simulacionService.lecturaSiguienteTP(this.idUsuarioCargado,this.idPreguntas, this.valor).subscribe(
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
    this.simulacionService.lecturaResumenTributarioPersona(this.idUsuarioCargado).subscribe(
      (data) => {
        //
        this.arrayResumenLegal=data.avances_tributario_persona;
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
    this.simulacionService.resetTributarioPersona(this.idUsuarioCargado).subscribe(
      (data) => {
        //
        console.log("Reset Tributario Persona: "+data.reset_tributario_persona);
        this.recargarPagina();
      },
      (err) => {
        console.log(err); // Manejo de errores
      }
    );
  }

  reiniciarModuloSolamente(){
    this.simulacionService.resetTributarioPersona(this.idUsuarioCargado).subscribe(
      (data) => {
        //
        console.log("Reset Tributario Persona: "+data.reset_tributario_persona);
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
        this.restaurarBitacora();
        this.reiniciarModuloSolamente();
        this.router.navigate(['simulacionlegal']);
        console.log("Reset Legal: "+data.reset_legal);
      },
      (err) => {
        console.log(err); // Manejo de errores
      }
    );
  }

  restaurarBitacora(){
    const bitacoraR = {avance:1, idSeccion:18, idUsuario:parseInt(this.idUsuarioCargado)};
    this.loginService.crearBitacora(bitacoraR).subscribe( (data)=>{
      console.log("Bitacora actualizada");
    }, (err) => {
      console.log(err); // Manejo de errores
    });
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

  endRouteFinanciera(){
    //Inicio Modificacion Bitacora ***
    //*******************************************//
    const bitacora = {avance:1, idSeccion:21, idUsuario:parseInt(this.idUsuarioCargado)};
    this.loginService.crearBitacora(bitacora).subscribe( (data)=>{
      console.log("Bitacora registrada");
      this.router.navigate(['simulacionfinanciera']);
    }, (err) => {
      console.log(err); // Manejo de errores
    });
    //*******************************************//
    //Fin Modificacion Bitacora ***
  }

  saveRoute(){
    //this.router.navigate(['simulacionlegal'], { queryParams: { id: this.idUsuarioCreado} } );
    this.cargarSiguiente();

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
