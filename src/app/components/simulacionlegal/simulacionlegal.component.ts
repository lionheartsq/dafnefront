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
  idUsuarioCreado: any;
  idUsuarioCargado: any;
  arrayPreguntas: any;
  idPreguntas: any;
  preguntas: any;
  idPregunta: number=0;
  valor: number=1;
  arraySiguientes: any;
  idPreguntasNext: any;
  isChecked = true;
  constructor(public router:Router, private loginService:LoginService, private utilsService:UtilsService, private route: ActivatedRoute, private simulacionService:SimulacionesService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.idUsuarioCreado = params['id'];
      this.idUsuarioCargado=localStorage.getItem('identificador_usuario');
      //console.log(this.idUsuarioCreado);
      //
      console.log("Usuario cargado: "+this.idUsuarioCargado);

      this.cargarDatosSimulacion();
      });
  }


  cargarDatosSimulacion(){
    this.idPregunta=1; //acá debo implementar la lógica para traer el máx y de esa manera seguir el proceso.
    this.simulacionService.lecturaPregunta(this.idUsuarioCargado,this.idPregunta).subscribe(
      (data) => {
        //
        this.arrayPreguntas=data.pregunta_simulacion;
        for (let dato in this.arrayPreguntas){
          this.idPreguntas=this.arrayPreguntas[dato].id;
          this.preguntas=this.arrayPreguntas[dato].pregunta;
        }
        //console.log("Actual idEmpresa: "+this.idEmpresa);
      },
      (err) => {
        console.log(err); // Manejo de errores
      }
    );
  }

  cargarSiguiente(){
    this.idPregunta=1; //acá debo implementar la lógica para traer el máx y de esa manera seguir el proceso.
    this.simulacionService.lecturaSiguiente(this.idUsuarioCargado,this.idPregunta, this.valor).subscribe(
      (data) => {
        //
        this.arraySiguientes=data;
        for (let dato in this.arraySiguientes){
          this.idPreguntasNext=this.arraySiguientes[dato].message;
        }
        //console.log("Actual idEmpresa: "+this.idEmpresa);
      },
      (err) => {
        console.log(err); // Manejo de errores
      }
    );
  }

  validarCheck(){
    if(this.isChecked){
      this.valor=1;
    }else{
      this.valor=2;
    }
  }

  endRoute(){
    this.router.navigate(['simulacionlegal'], { queryParams: { id: this.idUsuarioCreado} } );
  }

  saveRoute(){
    //this.router.navigate(['simulacionlegal'], { queryParams: { id: this.idUsuarioCreado} } );
    // Actualiza el valor de this.valor en función del estado del toggle
    this.validarCheck();

    // Llama a cargarSiguiente con el nuevo valor de this.valor
    this.cargarSiguiente();

    // Muestra el valor actual de this.valor en la consola
    console.log("Valor actual de this.valor: " + this.valor);
    console.log("Valor actual de this.idUsuario: " + this.idUsuarioCargado);
    console.log("Valor actual de this.idP: " + this.idPregunta);
  }
}
