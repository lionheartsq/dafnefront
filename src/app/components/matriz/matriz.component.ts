import { Component, ViewChild } from '@angular/core';
import { ElementRef, QueryList, ViewChildren } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service';
import { LoginService } from 'src/app/services/login.service';
import { EvaluacionService } from 'src/app/services/evaluacion.service';
import Swal from 'sweetalert2';
import { NgModel } from '@angular/forms';
import { ResumenempresaService } from 'src/app/services/resumenempresa.service';

@Component({
  selector: 'app-matriz',
  templateUrl: './matriz.component.html',
  styleUrls: ['./matriz.component.css']
})
export class MatrizComponent {
  idUsuarioCreado: any;
  arrayIdeas: any;
  selectedIdea: any;
  isOptionSelected: boolean = false;

  constructor(public router:Router, private loginService:LoginService, private utilsService:UtilsService, private route: ActivatedRoute, private evaluacionService:EvaluacionService, private resumenempresaService:ResumenempresaService) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.idUsuarioCreado = params['id'];
      //console.log(this.idUsuarioCreado);
      });

    //this.llamarAPI();
    this.obtenerMatriz(this.idUsuarioCreado);
  }

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
      const varNuevaEmpresa = {idUsuario:this.idUsuarioCreado, nombreIdea:this.selectedIdea};
        this.resumenempresaService.crearEmpresa(varNuevaEmpresa).subscribe( (data)=>{
          Swal.fire(
            {
              icon: 'success',
              title: 'Solicitud enviada',
              text: 'Nueva empresa registrada correctamente',
              footer: data.message
            }
          ).then(() => {
            //
            this.router.navigate(['resumen'], { queryParams: { id: this.idUsuarioCreado} } );
            //window.location.reload();
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
