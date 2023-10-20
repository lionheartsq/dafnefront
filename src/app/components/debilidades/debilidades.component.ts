import { Component, ViewChild } from '@angular/core';
import { ElementRef, QueryList, ViewChildren } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service';
import { LoginService } from 'src/app/services/login.service';
import { NgModel } from '@angular/forms';
import { DofaService } from 'src/app/services/dofa.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-debilidades',
  templateUrl: './debilidades.component.html',
  styleUrls: ['./debilidades.component.css']
})
export class DebilidadesComponent {
  idUsuarioCreado: any;
  arrayDofa: any;
  idDofa: any;
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
  avanceo: number=0;
  avancef: number=0;
  avancea: number=0;

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
        }
        //console.log("Actual idEmpresa: "+this.idEmpresa);
      },
      (err) => {
        console.log(err); // Manejo de errores
      }
    );
  }

  terminarRoute(){
    this.avanced=2;
    const varMensaje = {id:this.idDofa, idUsuario:this.idUsuarioCreado, debilidades1:this.debilidades1, debilidades2:this.debilidades2, debilidades3:this.debilidades3, debilidades4:this.debilidades4,
      oportunidades1:this.oportunidades1, oportunidades2:this.oportunidades2, oportunidades3:this.oportunidades3, oportunidades4:this.oportunidades4, fortalezas1:this.fortalezas1, fortalezas2:this.fortalezas2, fortalezas3:this.fortalezas3, fortalezas4:this.fortalezas4,
      amenazas1:this.amenazas1, amenazas2:this.amenazas2, amenazas3:this.amenazas3, amenazas4:this.amenazas4, avanced:this.avanced, avanceo:this.avanceo, avancef:this.avancef, avancea:this.avancea};
    console.log("Var dofa: "+varMensaje);

    this.dofaService.enviarValor(varMensaje).subscribe((data)=>{
      Swal.fire(
        {
          icon: 'success',
          title: 'Solicitud enviada',
          text: 'Debilidades empresa cargadas correctamente',
          footer: data.message
        }
      ).then(() => {
        this.router.navigate(['matrizdofa'], { queryParams: { id: this.idUsuarioCreado} } );
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

  continuarRoute(){
    this.avanced=1;
    const varMensaje = {id:this.idDofa, idUsuario:this.idUsuarioCreado, debilidades1:this.debilidades1, debilidades2:this.debilidades2, debilidades3:this.debilidades3, debilidades4:this.debilidades4,
      oportunidades1:this.oportunidades1, oportunidades2:this.oportunidades2, oportunidades3:this.oportunidades3, oportunidades4:this.oportunidades4, fortalezas1:this.fortalezas1, fortalezas2:this.fortalezas2, fortalezas3:this.fortalezas3, fortalezas4:this.fortalezas4,
      amenazas1:this.amenazas1, amenazas2:this.amenazas2, amenazas3:this.amenazas3, amenazas4:this.amenazas4, avanced:this.avanced, avanceo:this.avanceo, avancef:this.avancef, avancea:this.avancea};
      console.log("Var dofa: " + JSON.stringify(varMensaje, null, 2));

    this.dofaService.enviarValor(varMensaje).subscribe((data)=>{
      Swal.fire(
        {
          icon: 'success',
          title: 'Solicitud enviada',
          text: 'Debilidades empresa cargadas correctamente',
          footer: data.message
        }
      ).then(() => {
        //window.location.reload();
        this.router.navigate(['matrizdofa'], { queryParams: { id: this.idUsuarioCreado} } );
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
}
