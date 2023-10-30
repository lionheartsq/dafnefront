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
  idUsuarioCreado: any=0;
  idUsuarioCargado: any;
  arrayPreguntas: any;
  idPreguntas: number=0;
  preguntas: any;
  valor: number=1;
  arraySiguientes: any;
  idPreguntasNext: any;
  isChecked = true;
  flag: number=0;
  idUsuarioSiguiente: any;
  arrayPersonas: any;
  idPersonasNext: any;
  paramUsuario: any;
  constructor(public router:Router, private loginService:LoginService, private utilsService:UtilsService, private route: ActivatedRoute, private simulacionService:SimulacionesService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.idUsuarioCreado = params['id'];
      this.idUsuarioCargado=localStorage.getItem('identificador_usuario');
      //
      console.log("Usuario creado: "+this.idUsuarioCreado);
      //
      console.log("Usuario cargado: "+this.idUsuarioCargado);

      this.cargarDatosSimulacion();
      });
  }

  validarFlujo(){
    if(this.idUsuarioCreado==0 || this.idUsuarioCreado==="" || this.idUsuarioCreado===undefined){
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
    }else{
      this.simulacionService.validarPreguntaTP(this.idUsuarioCreado).subscribe(
        (data) => {
          //
          this.actualizarDatosSimulacion(data);

          console.log("Proceso IF, usuario creado: "+this.idUsuarioCreado);
        },
        (err) => {
          console.log(err); // Manejo de errores
        }
      );
    }
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
          if(this.idPreguntasNext===undefined){
            if(this.idUsuarioCreado==0 || this.idUsuarioCreado==="" || this.idUsuarioCreado===undefined){
              console.log("ENTRA POR USUARIO CARGADO");
              this.paramUsuario=this.idUsuarioCargado;
              this.flag=1;
            }else{
              console.log("ENTRA POR USUARIO CREADO");
              this.paramUsuario=this.idUsuarioCreado;
              this.flag=1;
            }
          }
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

  recargarPagina() {
    window.location.reload();
  }

  validarCheck(){
    if(this.isChecked){
      this.valor=1;
    }else{
      this.valor=2;
    }
  }

  endRouteFinanciera(){
    this.router.navigate(['simulacionfinanciera'], { queryParams: { id: this.paramUsuario} } );
  }

  saveRoute(){
    //this.router.navigate(['simulacionlegal'], { queryParams: { id: this.idUsuarioCreado} } );
    this.cargarSiguiente();

    // Muestra el valor actual de this.valor en la consola
    console.log("Valor actual de this.valor: " + this.valor);
    console.log("Valor actual de this.idUsuario: " + this.idUsuarioCargado);
    console.log("Valor actual de this.idP: " + this.idPreguntas);
  }
}
