import { Component, ViewChild } from '@angular/core';
import { ElementRef, QueryList, ViewChildren } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service';
import { LoginService } from 'src/app/services/login.service';
import { NgModel } from '@angular/forms';
import { DofaService } from 'src/app/services/dofa.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-matrizdofa',
  templateUrl: './matrizdofa.component.html',
  styleUrls: ['./matrizdofa.component.css']
})
export class MatrizdofaComponent {
  debilidades1: any="";
  debilidades2: any="";
  debilidades3: any="";
  debilidades4: any="";
  oportunidades1: any="";
  oportunidades2: any="";
  oportunidades3: any="";
  oportunidades4: any="";
  fortalezas1: any="";
  fortalezas2: any="";
  fortalezas3: any="";
  fortalezas4: any="";
  amenazas1: any="";
  amenazas2: any="";
  amenazas3: any="";
  amenazas4: any="";
  avanced: number=0;
  arrayDofa: any;
  avanceo: number=0;
  idDofa: any="";
  avancef: number=0;
  avancea: number=0;
  valorescarga: string="";
  debilidadesConsolidado: string="";
  oportunidadesConsolidado: string="";
  fortalezasConsolidado: string="";
  amenazasConsolidado: string="";
  colord: string="";
  coloro: string="";
  colorf: string="";
  colora: string="";
  mensajeDebilidades: string="";
  mensajeOportunidades: string="";
  mensajeFortalezas: string="";
  mensajeAmenazas: string="";
  totalavance: number=0;

    //Inicio variables para validar bitacora ***
    //*******************************************//
    idModulo:number=1;
    nombreSeccion:string="matrizdofa";
    identificadorSeccion: string="";
    variableSeccion: string="";
    idUsuarioCargado: any;
    //*******************************************//
    //Fin variables para validar bitacora ***

  constructor(public router:Router, private loginService:LoginService, private utilsService:UtilsService, private route: ActivatedRoute, private dofaService:DofaService) {}

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
      this.cargarDatosDofa(this.idUsuarioCargado);
    }else{
      console.log("VAL RUTA: this.router.navigate(["+this.identificadorSeccion+"])");
      this.router.navigate([this.variableSeccion]);//validar lo del usuario
    }
  }
  //*******************************************//
  //Fin funciones nuevas para validar bitacora. ***

  cargarDatosDofa(idUsuario:any){
    this.dofaService.lecturaDofaPropio(idUsuario).subscribe(
      (data) => {
        //
        this.arrayDofa=data.matriz_dofa;
        for (let dato in this.arrayDofa){
          this.idDofa=this.arrayDofa[dato].id;
          this.debilidades1 = this.arrayDofa[dato].debilidades1 == null ? "" : this.arrayDofa[dato].debilidades1;
          this.oportunidades1 = this.arrayDofa[dato].oportunidades1 == null ? "" : this.arrayDofa[dato].oportunidades1;
          this.fortalezas1 = this.arrayDofa[dato].fortalezas1 == null ? "" : this.arrayDofa[dato].fortalezas1;
          this.amenazas1 = this.arrayDofa[dato].amenazas1 == null ? "" : this.arrayDofa[dato].amenazas1;
          this.debilidades2 = this.arrayDofa[dato].debilidades2 == null ? "" : this.arrayDofa[dato].debilidades2;
          this.oportunidades2 = this.arrayDofa[dato].oportunidades2 == null ? "" : this.arrayDofa[dato].oportunidades2;
          this.fortalezas2 = this.arrayDofa[dato].fortalezas2 == null ? "" : this.arrayDofa[dato].fortalezas2;
          this.amenazas2 = this.arrayDofa[dato].amenazas2 == null ? "" : this.arrayDofa[dato].amenazas2;
          this.debilidades3 = this.arrayDofa[dato].debilidades3 == null ? "" : this.arrayDofa[dato].debilidades3;
          this.oportunidades3 = this.arrayDofa[dato].oportunidades3 == null ? "" : this.arrayDofa[dato].oportunidades3;
          this.fortalezas3 = this.arrayDofa[dato].fortalezas3 == null ? "" : this.arrayDofa[dato].fortalezas3;
          this.amenazas3 = this.arrayDofa[dato].amenazas3 == null ? "" : this.arrayDofa[dato].amenazas3;
          this.debilidades4 = this.arrayDofa[dato].debilidades4 == null ? "" : this.arrayDofa[dato].debilidades4;
          this.oportunidades4 = this.arrayDofa[dato].oportunidades4 == null ? "" : this.arrayDofa[dato].oportunidades4;
          this.fortalezas4 = this.arrayDofa[dato].fortalezas4 == null ? "" : this.arrayDofa[dato].fortalezas4;
          this.amenazas4 = this.arrayDofa[dato].amenazas4 == null ? "" : this.arrayDofa[dato].amenazas4;
          this.avanced=this.arrayDofa[dato].avanced;
          this.avanceo=this.arrayDofa[dato].avanceo;
          this.avancef=this.arrayDofa[dato].avancef;
          this.avancea=this.arrayDofa[dato].avancea;
          this.totalavance=parseInt(this.avanced.toString(), 10)+parseInt(this.avanceo.toString(), 10)+parseInt(this.avancef.toString(), 10)+parseInt(this.avancea.toString(), 10);
        }
        //console.log("Actual idEmpresa: "+this.idEmpresa);
        this.debilidadesConsolidado=this.debilidades1+"\n"+this.debilidades2+"\n"+this.debilidades3+"\n"+this.debilidades4;
        this.oportunidadesConsolidado=this.oportunidades1+"\n"+this.oportunidades2+"\n"+this.oportunidades3+"\n"+this.oportunidades4;
        this.fortalezasConsolidado=this.fortalezas1+"\n"+this.fortalezas2+"\n"+this.fortalezas3+"\n"+this.fortalezas4;
        this.amenazasConsolidado=this.amenazas1+"\n"+this.amenazas2+"\n"+this.amenazas3+"\n"+this.amenazas4;

        switch(this.avanced){
          case 0: this.colord="#E74C3C"; this.mensajeDebilidades="No hay debilidades registradas";
            break;
          case 1: this.colord="#F4D03F"; this.mensajeDebilidades="No ha terminado el registro de debilidades";
            break;
          case 2: this.colord="#229954"; this.mensajeDebilidades="Registro de debilidades completo";
            break;
        }

        switch(this.avanceo){
          case 0: this.coloro="#E74C3C"; this.mensajeOportunidades="No hay oportunidades registradas";
            break;
          case 1: this.coloro="#F4D03F"; this.mensajeOportunidades="No ha terminado el registro de oportunidades";
            break;
          case 2: this.coloro="#229954"; this.mensajeOportunidades="Registro de oportunidades completo";
            break;
        }

        switch(this.avancef){
          case 0: this.colorf="#E74C3C"; this.mensajeFortalezas="No hay fortalezas registradas";
            break;
          case 1: this.colorf="#F4D03F"; this.mensajeFortalezas="No ha terminado el registro de fortalezas";
            break;
          case 2: this.colorf="#229954"; this.mensajeFortalezas="Registro de fortalezas completo";
            break;
        }

        switch(this.avancea){
          case 0: this.colora="#E74C3C"; this.mensajeAmenazas="No hay amenazas registradas";
            break;
          case 1: this.colora="#F4D03F"; this.mensajeAmenazas="No ha terminado el registro de amenazas";
            break;
          case 2: this.colora="#229954"; this.mensajeAmenazas="Registro de amenazas completo";
            break;
        }
      },
      (err) => {
        console.log(err); // Manejo de errores
      }
    );
  }

  uploadDebilidades() {
     //this.openPopup("debilidades");
     this.router.navigate(['debilidades']);
  }

  uploadOportunidades() {
    //this.openPopup("oportunidades");
    this.router.navigate(['oportunidades']);
  }

  uploadFortalezas() {
    //this.openPopup("fortalezas");
    this.router.navigate(['fortalezas']);
  }

  uploadAmenazas() {
    //this.openPopup("amenazas");
    this.router.navigate(['amenazas']);
  }


  openPopup() {
      // Crea el contenido HTML que deseas mostrar en el cuadro de diálogo
      const tablaHTML = `
      <table class="table">
        <tr>
          <td>
            <p>D</p>
            <mat-card class="example-card" [style.background-color]="colord">
              <mat-card-content>`+
                this.debilidadesConsolidado
              +`</mat-card-content>
            </mat-card>
          </td>
          <td>
            <p>O</p>
            <mat-card class="example-card" [style.background-color]="coloro">
              <mat-card-content>`+
                this.oportunidadesConsolidado
              +`</mat-card-content>
            </mat-card>
          </td>
        </tr>
        <tr>
          <td>
            <p>F</p>
            <mat-card class="example-card" [style.background-color]="colorf">
              <mat-card-content>`+
                this.fortalezasConsolidado
              +`</mat-card-content>
            </mat-card>
          </td>
          <td>
            <p>A</p>
            <mat-card class="example-card" [style.background-color]="colora">
              <mat-card-content>`+
                this.amenazasConsolidado
              +`</mat-card-content>
            </mat-card>
          </td>
        </tr>
      </table>
      `;

      // Muestra el cuadro de diálogo SweetAlert 2 con el contenido HTML
      Swal.fire({
      title: 'Matriz Dofa',
      html: tablaHTML,
      showCloseButton: true,
      showCancelButton: false,
      showConfirmButton: false,
      });
    }

  matrizRoute() {
    //this.openPopup();
    this.router.navigate(['vistadofa'], { queryParams: { id: this.idUsuarioCargado} } );
  }

  canvasRoute() {
    //Inicio Modificacion Bitacora ***
    //*******************************************//
    const bitacora = {avance:1, idSeccion:15, idUsuario:parseInt(this.idUsuarioCargado)};
    this.loginService.crearBitacora(bitacora).subscribe( (data)=>{
      console.log("Bitacora registrada");
      this.router.navigate(['estrategias']);
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
