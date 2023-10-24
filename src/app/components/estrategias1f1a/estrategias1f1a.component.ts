import { Component, ViewChild } from '@angular/core';
import { ElementRef, QueryList, ViewChildren } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service';
import { LoginService } from 'src/app/services/login.service';
import { NgModel } from '@angular/forms';
import { DofaService } from 'src/app/services/dofa.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-estrategias1f1a',
  templateUrl: './estrategias1f1a.component.html',
  styleUrls: ['./estrategias1f1a.component.css']
})
export class Estrategias1f1aComponent {
  idUsuarioCreado: any;
  arrayDofa: any;
  idDofa: any;
  constructor(public router:Router, private loginService:LoginService, private utilsService:UtilsService, private route: ActivatedRoute, private dofaService:DofaService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.idUsuarioCreado = params['id'];
      //console.log(this.idUsuarioCreado);

      this.cargarDatosEstrategias(this.idUsuarioCreado);
      });
  }

  cargarDatosEstrategias(idUsuario:any){
    this.dofaService.lecturaDofaPropio(idUsuario).subscribe(
      (data) => {
        //
        this.arrayDofa=data.matriz_dofa;
        for (let dato in this.arrayDofa){
          this.idDofa=this.arrayDofa[dato].id;
/*           this.debilidades1 = this.arrayDofa[dato].debilidades1 == null ? "" : this.arrayDofa[dato].debilidades1;
          this.oportunidades1 = this.arrayDofa[dato].oportunidades1 == null ? "" : this.arrayDofa[dato].oportunidades1; */
        //console.log("Actual idEmpresa: "+this.idEmpresa);
        }
      },
      (err) => {
        console.log(err); // Manejo de errores
      }
    );
  }

  estrategias2d2aRoute(){
    this.router.navigate(['estrategias2d2a'], { queryParams: { id: this.idUsuarioCreado} } );
  }

  partialSaveRoute(){
    this.router.navigate(['estrategias1f1a'], { queryParams: { id: this.idUsuarioCreado} } );
  }
}
