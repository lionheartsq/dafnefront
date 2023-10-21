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
  idUsuarioCreado: any;
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

  constructor(public router:Router, private loginService:LoginService, private utilsService:UtilsService, private route: ActivatedRoute, private dofaService:DofaService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.idUsuarioCreado = params['id'];
      //console.log(this.idUsuarioCreado);

      this.cargarDatosDofa(this.idUsuarioCreado);
      });
  }

  cargarDatosDofa(idUsuario:any){
    this.dofaService.lecturaDofaPropio(idUsuario).subscribe(
      (data) => {
        //
        this.arrayDofa=data.matriz_dofa;
        for (let dato in this.arrayDofa){
          this.idDofa=this.arrayDofa[dato].id;
          this.debilidades1=this.arrayDofa[dato].debilidades1;
          this.oportunidades1=this.arrayDofa[dato].oportunidades1;
          this.fortalezas1=this.arrayDofa[dato].fortalezas1;
          this.amenazas1=this.arrayDofa[dato].amenazas1;
          this.debilidades2=this.arrayDofa[dato].debilidades2;
          this.oportunidades2=this.arrayDofa[dato].oportunidades2;
          this.fortalezas2=this.arrayDofa[dato].fortalezas2;
          this.amenazas2=this.arrayDofa[dato].amenazas2;
          this.debilidades3=this.arrayDofa[dato].debilidades3;
          this.oportunidades3=this.arrayDofa[dato].oportunidades3;
          this.fortalezas3=this.arrayDofa[dato].fortalezas3;
          this.amenazas3=this.arrayDofa[dato].amenazas3;
          this.debilidades4=this.arrayDofa[dato].debilidades4;
          this.oportunidades4=this.arrayDofa[dato].oportunidades4;
          this.fortalezas4=this.arrayDofa[dato].fortalezas4;
          this.amenazas4=this.arrayDofa[dato].amenazas4;
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
          case 0: this.colord="red"; this.mensajeDebilidades="No hay debilidades registradas";
            break;
          case 1: this.colord="orange"; this.mensajeDebilidades="No ha terminado el registro de debilidades";
            break;
          case 2: this.colord="green"; this.mensajeDebilidades="Registro de debilidades completo";
            break;
        }

        switch(this.avanceo){
          case 0: this.coloro="red"; this.mensajeOportunidades="No hay oportunidades registradas";
            break;
          case 1: this.coloro="orange"; this.mensajeOportunidades="No ha terminado el registro de oportunidades";
            break;
          case 2: this.coloro="green"; this.mensajeOportunidades="Registro de oportunidades completo";
            break;
        }

        switch(this.avancef){
          case 0: this.colorf="red"; this.mensajeFortalezas="No hay fortalezas registradas";
            break;
          case 1: this.colorf="orange"; this.mensajeFortalezas="No ha terminado el registro de fortalezas";
            break;
          case 2: this.colorf="green"; this.mensajeFortalezas="Registro de fortalezas completo";
            break;
        }

        switch(this.avancea){
          case 0: this.colora="red"; this.mensajeAmenazas="No hay amenazas registradas";
            break;
          case 1: this.colora="orange"; this.mensajeAmenazas="No ha terminado el registro de amenazas";
            break;
          case 2: this.colora="green"; this.mensajeAmenazas="Registro de amenazas completo";
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
     this.router.navigate(['debilidades'], { queryParams: { id: this.idUsuarioCreado} } );
  }

  uploadOportunidades() {
    //this.openPopup("oportunidades");
    this.router.navigate(['oportunidades'], { queryParams: { id: this.idUsuarioCreado} } );
  }

  uploadFortalezas() {
    //this.openPopup("fortalezas");
    this.router.navigate(['fortalezas'], { queryParams: { id: this.idUsuarioCreado} } );
  }

  uploadAmenazas() {
    //this.openPopup("amenazas");
    this.router.navigate(['amenazas'], { queryParams: { id: this.idUsuarioCreado} } );
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
    this.openPopup();
  }

  canvasRoute() {
    //this.openPopup("fortalezas");
    this.router.navigate(['canvas'], { queryParams: { id: this.idUsuarioCreado} } );
  }
}
