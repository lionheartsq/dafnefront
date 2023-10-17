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
  debilidades: any;
  oportunidades: any;
  fortalezas: any;
  amenazas: any;
  avance: any;

  constructor(public router:Router, private route: ActivatedRoute, private dofaService:DofaService) {}

  uploadDebilidades() {
    const varNuevaEmpresa = {idUsuario:this.idUsuarioCreado, debilidades:this.debilidades, oportunidades:this.oportunidades, fortalezas:this.fortalezas, amenazas:this.amenazas, avance:this.avance};
    console.log("Var nuevaEmpresa: "+varNuevaEmpresa);
    this.dofaService.crearDofa(varNuevaEmpresa).subscribe( (data)=>{
      Swal.fire(
        {
          icon: 'success',
          title: 'Solicitud enviada',
          text: 'Misión empresa cargada correctamente',
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
