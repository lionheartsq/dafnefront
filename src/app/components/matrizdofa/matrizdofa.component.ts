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
  debilidades: any="";
  oportunidades: any="";
  fortalezas: any="";
  amenazas: any="";
  avanced: any="0";
  arrayDofa: any;
  avanceo: any="";
  idDofa: any="";
  avancef: any="";
  avancea: any="";

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
          this.debilidades=this.arrayDofa[dato].debilidades;
          this.oportunidades=this.arrayDofa[dato].oportunidades;
          this.fortalezas=this.arrayDofa[dato].fortalezas;
          this.amenazas=this.arrayDofa[dato].amenazas;
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

  uploadDebilidades() {
    const varDebilidades = {id:this.idDofa, idUsuario:this.idUsuarioCreado, debilidades:this.debilidades, oportunidades:this.oportunidades, fortalezas:this.fortalezas, amenazas:this.amenazas, avanced:this.avanced, avanceo:this.avanceo, avancef:this.avancef, avancea:this.avancea};
    console.log("Var Debilidades: "+varDebilidades);
    this.dofaService.enviarValor(varDebilidades).subscribe( (data)=>{
      Swal.fire(
        {
          icon: 'success',
          title: 'Solicitud enviada',
          text: 'Debilidades empresa cargadas correctamente',
          footer: data.message
        }
      ).then(() => {
        //this.router.navigate(['resumen'], { queryParams: { id: this.idUsuarioCreado} } );
        //
        window.location.reload();
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

  uploadOportunidades() {
    const varOportunidades = {id:this.idDofa, idUsuario:this.idUsuarioCreado, debilidades:this.debilidades, oportunidades:this.oportunidades, fortalezas:this.fortalezas, amenazas:this.amenazas, avanced:this.avanced, avanceo:this.avanceo, avancef:this.avancef, avancea:this.avancea};
    console.log("Var Oportunidades: "+varOportunidades);
    this.dofaService.enviarValor(varOportunidades).subscribe( (data)=>{
      Swal.fire(
        {
          icon: 'success',
          title: 'Solicitud enviada',
          text: 'Oportunidades empresa cargadas correctamente',
          footer: data.message
        }
      ).then(() => {
        //this.router.navigate(['resumen'], { queryParams: { id: this.idUsuarioCreado} } );
        //
        window.location.reload();
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

  uploadFortalezas() {
    const varFortalezas = {id:this.idDofa, idUsuario:this.idUsuarioCreado, debilidades:this.debilidades, oportunidades:this.oportunidades, fortalezas:this.fortalezas, amenazas:this.amenazas, avanced:this.avanced, avanceo:this.avanceo, avancef:this.avancef, avancea:this.avancea};
    console.log("Var Fortalezas: "+varFortalezas);
    this.dofaService.enviarValor(varFortalezas).subscribe( (data)=>{
      Swal.fire(
        {
          icon: 'success',
          title: 'Solicitud enviada',
          text: 'Fortalezas empresa cargadas correctamente',
          footer: data.message
        }
      ).then(() => {
        //this.router.navigate(['resumen'], { queryParams: { id: this.idUsuarioCreado} } );
        //
        window.location.reload();
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

  uploadAmenazas() {
    const varAmenazas = {id:this.idDofa, idUsuario:this.idUsuarioCreado, debilidades:this.debilidades, oportunidades:this.oportunidades, fortalezas:this.fortalezas, amenazas:this.amenazas, avanced:this.avanced, avanceo:this.avanceo, avancef:this.avancef, avancea:this.avancea};
    console.log("Var Amenazas: "+varAmenazas);
    this.dofaService.enviarValor(varAmenazas).subscribe( (data)=>{
      Swal.fire(
        {
          icon: 'success',
          title: 'Solicitud enviada',
          text: 'Amenazas empresa cargadas correctamente',
          footer: data.message
        }
      ).then(() => {
        //this.router.navigate(['resumen'], { queryParams: { id: this.idUsuarioCreado} } );
        //
        window.location.reload();
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

  amenazasRoute(){
    this.router.navigate(['amenazas']);
  }
}
