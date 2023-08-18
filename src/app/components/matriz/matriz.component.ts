import { Component, ViewChild } from '@angular/core';
import { ElementRef, QueryList, ViewChildren } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service';
import { LoginService } from 'src/app/services/login.service';
import { EvaluacionService } from 'src/app/services/evaluacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-matriz',
  templateUrl: './matriz.component.html',
  styleUrls: ['./matriz.component.css']
})
export class MatrizComponent {
  idUsuarioCreado: any;
  arrayIdeas: any;

  constructor(public router:Router, private loginService:LoginService, private utilsService:UtilsService, private route: ActivatedRoute, private evaluacionService:EvaluacionService) {
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
    this.evaluacionService.crearMatriz(id).subscribe(
      (data) => {
        //
        this.arrayIdeas=data.criterios_evaluacion;
      },
      (err) => {
        console.log(err); // Manejo de errores
      }
    );
  }

  seleccionSave(){

  }

}
