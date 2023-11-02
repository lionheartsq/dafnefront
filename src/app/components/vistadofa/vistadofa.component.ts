import { Component, ViewChild } from '@angular/core';
import { ElementRef, QueryList, ViewChildren } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service';
import { LoginService } from 'src/app/services/login.service';
import { NgModel } from '@angular/forms';
import { DofaService } from 'src/app/services/dofa.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vistadofa',
  templateUrl: './vistadofa.component.html',
  styleUrls: ['./vistadofa.component.css']
})
export class VistadofaComponent {
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
        this.debilidadesConsolidado="<ul><li>"+this.debilidades1+"</li><li>"+this.debilidades2+"</li><li>"+this.debilidades3+"</li><li>"+this.debilidades4+"</li></ul>";
        this.oportunidadesConsolidado="<ul><li>"+this.oportunidades1+"</li><li>"+this.oportunidades2+"</li><li>"+this.oportunidades3+"</li><li>"+this.oportunidades4+"</li></ul>";
        this.fortalezasConsolidado="<ul><li>"+this.fortalezas1+"</li><li>"+this.fortalezas2+"</li><li>"+this.fortalezas3+"</li><li>"+this.fortalezas4+"</li></ul>";
        this.amenazasConsolidado="<ul><li>"+this.amenazas1+"</li><li>"+this.amenazas2+"</li><li>"+this.amenazas3+"</li><li>"+this.amenazas4+"</li></ul>";
      },
      (err) => {
        console.log(err); // Manejo de errores
      }
    );
  }

  matrizRoute() {
    //this.openPopup("debilidades");
    this.router.navigate(['matrizdofa'], { queryParams: { id: this.idUsuarioCreado} } );
 }
}
