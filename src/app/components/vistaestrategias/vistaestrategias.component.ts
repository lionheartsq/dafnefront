import { Component, ViewChild } from '@angular/core';
import { ElementRef, QueryList, ViewChildren } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service';
import { LoginService } from 'src/app/services/login.service';
import { NgModel } from '@angular/forms';
import { DofaService } from 'src/app/services/dofa.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vistaestrategias',
  templateUrl: './vistaestrategias.component.html',
  styleUrls: ['./vistaestrategias.component.css']
})
export class VistaestrategiasComponent {

  idUsuarioCreado: any;
  arrayDofa: any;
  idDofa: any="";
  valorescarga: string="";
  colord: string="";
  coloro: string="";
  colorf: string="";
  colora: string="";
  totalavance: number=0;
  accionFO: any;
  accionDO: any;
  accionFA: any;
  accionDA: any;
  estrategiaFO: any;
  estrategiaDO: any;
  estrategiaFA: any;
  estrategiaDA: any;
  avanceFO: any;
  avanceDO: any;
  avanceFA: any;
  avanceDA: any;

  constructor(public router:Router, private loginService:LoginService, private utilsService:UtilsService, private route: ActivatedRoute, private dofaService:DofaService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.idUsuarioCreado = params['id'];
      //console.log(this.idUsuarioCreado);

      this.cargarDatosDofa(this.idUsuarioCreado);
      });
  }

  cargarDatosDofa(idUsuario:any){
    this.dofaService.lecturaEstrategiasPropio(idUsuario).subscribe(
      (data) => {
        //
        this.arrayDofa=data.estrategias;
        for (let dato in this.arrayDofa){
          this.idDofa=this.arrayDofa[dato].id;
          this.accionFO = this.arrayDofa[dato].accionFO == null ? "" : this.arrayDofa[dato].accionFO;
          this.accionDO = this.arrayDofa[dato].accionDO == null ? "" : this.arrayDofa[dato].accionDO;
          this.accionFA = this.arrayDofa[dato].accionFA == null ? "" : this.arrayDofa[dato].accionFA;
          this.accionDA = this.arrayDofa[dato].accionDA == null ? "" : this.arrayDofa[dato].accionDA;
          this.estrategiaFO = this.arrayDofa[dato].estrategiaFO == null ? "" : this.arrayDofa[dato].estrategiaFO;
          this.estrategiaDO = this.arrayDofa[dato].estrategiaDO == null ? "" : this.arrayDofa[dato].estrategiaDO;
          this.estrategiaFA = this.arrayDofa[dato].estrategiaFA == null ? "" : this.arrayDofa[dato].estrategiaFA;
          this.estrategiaDA = this.arrayDofa[dato].estrategiaDA == null ? "" : this.arrayDofa[dato].estrategiaDA;
          this.avanceFO=this.arrayDofa[dato].avanceFO;
          this.avanceDO=this.arrayDofa[dato].avanceDO;
          this.avanceFA=this.arrayDofa[dato].avanceFA;
          this.avanceDA=this.arrayDofa[dato].avanceDA;
          this.totalavance=parseInt(this.avanceFO.toString(), 10)+parseInt(this.avanceDO.toString(), 10)+parseInt(this.avanceFA.toString(), 10)+parseInt(this.avanceDA.toString(), 10);
        }
        //console.log("Actual idEmpresa: "+this.idEmpresa);
      },
      (err) => {
        console.log(err); // Manejo de errores
      }
    );
  }

  matrizRoute() {
    //this.openPopup("debilidades");
    this.router.navigate(['estrategias']);
 }

}
