import { Component, ViewChild } from '@angular/core';
import { ElementRef, QueryList, ViewChildren } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service';
import { LoginService } from 'src/app/services/login.service';
import { NgModel } from '@angular/forms';
import { DofaService } from 'src/app/services/dofa.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-estrategias',
  templateUrl: './estrategias.component.html',
  styleUrls: ['./estrategias.component.css']
})
export class EstrategiasComponent {
  idUsuarioCreado: any;
  colorda: string="#E74C3C";
  mensajeDA: string="";
  colorfa: string="#E74C3C";
  mensajeFA: string="";
  colordo: string="#E74C3C";
  mensajeDO: string="";
  mensajeFO: string="";
  colorfo: string="#E74C3C";
  totalavance: number=0;
  arrayEstrategias: any;
  idEstrategias: any;
  accionFO: string="";
  accionDO: string="";
  accionFA: string="";
  accionDA: string="";
  estrategiaFO: string="";
  estrategiaDO: string="";
  estrategiaFA: string="";
  estrategiaDA: string="";
  avanceFO: number=0;
  avanceDO: number=0;
  avanceFA: number=0;
  avanceDA: number=0;
  constructor(public router:Router, private loginService:LoginService, private utilsService:UtilsService, private route: ActivatedRoute, private dofaService:DofaService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.idUsuarioCreado = params['id'];
      //console.log(this.idUsuarioCreado);

      this.cargarDatosEstrategias(this.idUsuarioCreado);
      });
  }


  cargarDatosEstrategias(idUsuario:any){
    this.dofaService.lecturaEstrategiasPropio(idUsuario).subscribe(
      (data) => {
        //
        this.arrayEstrategias=data.estrategias;
        for (let dato in this.arrayEstrategias){
          this.idEstrategias=this.arrayEstrategias[dato].id;
          this.accionFO = this.arrayEstrategias[dato].accionFO == null ? "" : this.arrayEstrategias[dato].accionFO;
          this.accionDO = this.arrayEstrategias[dato].accionDO == null ? "" : this.arrayEstrategias[dato].accionDO;
          this.accionFA = this.arrayEstrategias[dato].accionFA == null ? "" : this.arrayEstrategias[dato].accionFA;
          this.accionDA = this.arrayEstrategias[dato].accionDA == null ? "" : this.arrayEstrategias[dato].accionDA;

          this.estrategiaFO = this.arrayEstrategias[dato].estrategiaFO == null ? "" : this.arrayEstrategias[dato].estrategiaFO;
          this.estrategiaDO = this.arrayEstrategias[dato].estrategiaDO == null ? "" : this.arrayEstrategias[dato].estrategiaDO;
          this.estrategiaFA = this.arrayEstrategias[dato].estrategiaFA == null ? "" : this.arrayEstrategias[dato].estrategiaFA;
          this.estrategiaDA = this.arrayEstrategias[dato].estrategiaDA == null ? "" : this.arrayEstrategias[dato].estrategiaDA;

          this.avanceFO=this.arrayEstrategias[dato].avanceFO;
          this.avanceDO=this.arrayEstrategias[dato].avanceDO;
          this.avanceFA=this.arrayEstrategias[dato].avanceFA;
          this.avanceDA=this.arrayEstrategias[dato].avanceDA;
          this.totalavance=parseInt(this.avanceFO.toString(), 10)+parseInt(this.avanceDO.toString(), 10)+parseInt(this.avanceFA.toString(), 10)+parseInt(this.avanceDA.toString(), 10);

        }
        //console.log("Actual idEmpresa: "+this.idEmpresa);

        switch(this.avanceFO){
          case 0: this.colorfo="#E74C3C"; this.mensajeFO="No hay registros";
            break;
          case 1: this.colorfo="#F4D03F"; this.mensajeFO="No ha terminado el registro";
            break;
          case 2: this.colorfo="#229954"; this.mensajeFO="Registro completo";
            break;
        }

        switch(this.avanceDO){
          case 0: this.colordo="#E74C3C"; this.mensajeDO="No hay registros";
            break;
          case 1: this.colordo="#F4D03F"; this.mensajeDO="No ha terminado el registro";
            break;
          case 2: this.colordo="#229954"; this.mensajeDO="Registro completo";
            break;
        }

        switch(this.avanceFA){
          case 0: this.colorfa="#E74C3C"; this.mensajeFA="No hay registros";
            break;
          case 1: this.colorfa="#F4D03F"; this.mensajeFA="No ha terminado el registro";
            break;
          case 2: this.colorfa="#229954"; this.mensajeFA="Registro completo";
            break;
        }

        switch(this.avanceDA){
          case 0: this.colorda="#E74C3C"; this.mensajeDA="No hay registros";
            break;
          case 1: this.colorda="#F4D03F"; this.mensajeDA="No ha terminado el registro";
            break;
          case 2: this.colorda="#229954"; this.mensajeDA="Registro completo";
            break;
        }
      },
      (err) => {
        console.log(err); // Manejo de errores
      }
    );
  }

  uploadFO() {
    //this.openPopup("fortalezas");
    this.router.navigate(['estrategias1f10'], { queryParams: { id: this.idUsuarioCreado} } );
  }

  uploadDO() {
      //this.openPopup("debilidades");
      this.router.navigate(['estrategias1d20'], { queryParams: { id: this.idUsuarioCreado} } );
  }

  uploadFA() {
    //this.openPopup("amenazas");
    this.router.navigate(['estrategias1f1a'], { queryParams: { id: this.idUsuarioCreado} } );
  }

  uploadDA() {
    //this.openPopup("oportunidades");
    this.router.navigate(['estrategias2d2a'], { queryParams: { id: this.idUsuarioCreado} } );
  }

  canvasRoute(){
    this.router.navigate(['modelocanvas'], { queryParams: { id: this.idUsuarioCreado} } );
  }
}
