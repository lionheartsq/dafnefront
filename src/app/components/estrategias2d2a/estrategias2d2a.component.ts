import { Component, ViewChild } from '@angular/core';
import { ElementRef, QueryList, ViewChildren } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service';
import { LoginService } from 'src/app/services/login.service';
import { NgModel } from '@angular/forms';
import { DofaService } from 'src/app/services/dofa.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-estrategias2d2a',
  templateUrl: './estrategias2d2a.component.html',
  styleUrls: ['./estrategias2d2a.component.css']
})
export class Estrategias2d2aComponent {
  arrayEstrategias: any;
  idEstrategias: any;
  accionFO: String="";
  accionDO: String="";
  accionFA: String="";
  accionDA: String="";
  estrategiaFO: String="";
  estrategiaDO: String="";
  estrategiaFA: String="";
  estrategiaDA: String="";
  avanceFO: number=0;
  avanceDO: number=0;
  avanceFA: number=0;
  avanceDA: number=0;
  totalavance: number=0;
  flag: number=0;

  //Inicio variables para validar bitacora ***
  //*******************************************//
  idUsuarioCargado: any;
  //*******************************************//
  //Fin variables para validar bitacora ***

  constructor(public router:Router, private loginService:LoginService, private utilsService:UtilsService, private route: ActivatedRoute, private dofaService:DofaService) {}

  ngOnInit(): void {
    this.idUsuarioCargado=localStorage.getItem('identificador_usuario');
    //
    console.log("Usuario cargado: "+this.idUsuarioCargado);

    this.cargarDatosEstrategias(this.idUsuarioCargado);
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
      },
      (err) => {
        console.log(err); // Manejo de errores
      }
    );
  }

  terminarRoute(){
      this.flag=1;
      this.avanceDA=2;
      const varMensaje = {id:this.idEstrategias, idUsuario:this.idUsuarioCargado, accionFO:this.accionFO, accionDO:this.accionDO, accionFA:this.accionFA, accionDA:this.accionDA,estrategiaFO:this.estrategiaFO, estrategiaDO:this.estrategiaDO,
        estrategiaFA:this.estrategiaFA, estrategiaDA:this.estrategiaDA, avanceFO:this.avanceFO, avanceDO:this.avanceDO, avanceFA:this.avanceFA, avanceDA:this.avanceDA};

      console.log("Var dofa: "+varMensaje);

      this.dofaService.enviarValorEstrategias(varMensaje).subscribe((data)=>{
        Swal.fire(
          {
            icon: 'success',
            title: 'Solicitud enviada',
            text: 'Estrategias empresa cargadas correctamente',
            footer: data.message
          }
        ).then(() => {
          this.router.navigate(['estrategias']);
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

    console.log("Valor flag: "+this.flag);
  }

  continuarRoute(){
      this.flag=1;
      this.avanceDA=1;
      const varMensaje = {id:this.idEstrategias, idUsuario:this.idUsuarioCargado, accionFO:this.accionFO, accionDO:this.accionDO, accionFA:this.accionFA, accionDA:this.accionDA,estrategiaFO:this.estrategiaFO, estrategiaDO:this.estrategiaDO,
        estrategiaFA:this.estrategiaFA, estrategiaDA:this.estrategiaDA, avanceFO:this.avanceFO, avanceDO:this.avanceDO, avanceFA:this.avanceFA, avanceDA:this.avanceDA};

        console.log("Var dofa: " + JSON.stringify(varMensaje, null, 2));

      this.dofaService.enviarValorEstrategias(varMensaje).subscribe((data)=>{
        Swal.fire(
          {
            icon: 'success',
            title: 'Solicitud enviada',
            text: 'Estrategias empresa cargadas correctamente',
            footer: data.message
          }
        ).then(() => {
          //window.location.reload();
          this.router.navigate(['estrategias']);
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

    console.log("Valor flag: "+this.flag);
  }

}
