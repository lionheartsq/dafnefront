import { Component, ViewChild } from '@angular/core';
import { ElementRef, QueryList, ViewChildren } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service';
import { LoginService } from 'src/app/services/login.service';
import { NgModel } from '@angular/forms';
import { DofaService } from 'src/app/services/dofa.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-estrategias1f10',
  templateUrl: './estrategias1f10.component.html',
  styleUrls: ['./estrategias1f10.component.css']
})
export class Estrategias1f10Component {
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
    this.dofaService.lecturaFOPropio(idUsuario).subscribe(
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

  estrategias1d20Route(){
    this.router.navigate(['estrategias1d20'], { queryParams: { id: this.idUsuarioCreado} } );
  }

  partialSaveRoute(){
    this.router.navigate(['estrategias1f10'], { queryParams: { id: this.idUsuarioCreado} } );
  }
}
