import { Component, ViewChild } from '@angular/core';
import { ElementRef, QueryList, ViewChildren } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service';
import { LoginService } from 'src/app/services/login.service';
import { EvaluacionService } from 'src/app/services/evaluacion.service';
import Swal from 'sweetalert2';
import { NgModel } from '@angular/forms';
import { ResumenempresaService } from 'src/app/services/resumenempresa.service';
import { DofaService } from 'src/app/services/dofa.service';
import { CanvasService } from 'src/app/services/canvas.service';

@Component({
  selector: 'app-matriz',
  templateUrl: './matriz.component.html',
  styleUrls: ['./matriz.component.css']
})
export class MatrizComponent {
  arrayIdeas: any;
  selectedIdea: any;
  isOptionSelected: boolean = false;

  //Inicio variables para validar bitacora ***
  //*******************************************//
  idUsuarioCargado:any;
  idModulo:number=1;
  nombreSeccion:string="matriz";
  identificadorSeccion: string="";
  variableSeccion: string="";
  //*******************************************//
  //Fin variables para validar bitacora ***

  constructor(public router:Router, private loginService:LoginService, private utilsService:UtilsService, private route: ActivatedRoute, private evaluacionService:EvaluacionService, private resumenempresaService:ResumenempresaService, private dofaService:DofaService, private canvasService:CanvasService) {
  }

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
      //this.llamarAPI();
      this.obtenerMatriz(this.idUsuarioCargado);
    }else{
      console.log("VAL RUTA: this.router.navigate(["+this.identificadorSeccion+"])");
      this.router.navigate([this.variableSeccion]);//validar lo del usuario
    }
  }
  //*******************************************//
  //Fin funciones nuevas para validar bitacora. ***

  obtenerMatriz(id:any){
    this.evaluacionService.obtenerMatriz(id).subscribe(
      (data) => {
        //
        this.arrayIdeas=data.matriz_evaluacion;
      },
      (err) => {
        console.log(err); // Manejo de errores
      }
    );
  }

  changeOptional(){
    this.isOptionSelected = true;
    console.log("Value optional: "+this.isOptionSelected);
  }

  seleccionSave() {
    // Aquí puedes utilizar this.selectedIdea para acceder a la idea seleccionada
    console.log('Idea seleccionada:', this.selectedIdea);
    // Realiza las acciones que necesites con la idea seleccionada
    const varNuevaEmpresa = {idUsuario:this.idUsuarioCargado, nombreIdea:this.selectedIdea};
      this.resumenempresaService.crearEmpresa(varNuevaEmpresa).subscribe( (data)=>{
        console.log("Empresa creada");
          const varNuevoDofa = {idUsuario:this.idUsuarioCargado}
          this.dofaService.crearDofa(varNuevoDofa).subscribe( (data)=>{
              console.log("Matriz DOFA creada");
              const varNuevaEstrategia = {idUsuario:this.idUsuarioCargado}
              this.dofaService.crearEstrategias(varNuevaEstrategia).subscribe( (data)=>{

                const varNuevoCanvas = {idUsuario:this.idUsuarioCargado}
                  this.canvasService.crearCanvas(varNuevoCanvas).subscribe( (data)=>{
                    console.log("Modelo canvas creado");
                    //Inicio Modificacion Bitacora ***
                    //*******************************************//
                    const bitacora = {avance:1, idSeccion:12, idUsuario:parseInt(this.idUsuarioCargado)};
                    this.loginService.crearBitacora(bitacora).subscribe( (data)=>{
                      console.log("Bitacora registrada");
                      Swal.fire(
                        {
                          icon: 'success',
                          title: 'Solicitud enviada',
                          text: 'Nueva empresa registrada correctamente',
                          footer: data.message
                        }
                        ).then(() => {
                          this.router.navigate(['resumen']);
                        });
                    }, (err) => {
                      console.log(err); // Manejo de errores
                    });
                    //*******************************************//
                    //Fin Modificacion Bitacora ***
                  }, (err) => {
                    console.log(err);
                  });
            }, (err) => {
              console.log(err);
            });
        }, (err) => {
          console.log(err);
        });
      }, (err) => {
        //debugger
        Swal.fire(
          {
            icon: 'error',
            title: 'Error al crear',
            html: 'Por favor verifique los datos e intente nuevamente',
            footer: 'No se ha podido completar el registro'
          }
        )
      });
}

  //Inicio nueva Ruta ***
  //*******************************************//
  homeRoute(){
    this.router.navigate(['home']);
  }
  //*******************************************//
  //Fin nueva Ruta ***
}
