import { Component, OnInit, ViewChild } from '@angular/core';
import { ElementRef, QueryList, ViewChildren } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service';
import { LoginService } from 'src/app/services/login.service';
import { EvaluacionService } from 'src/app/services/evaluacion.service';
import Swal from 'sweetalert2';
import { IdeasService } from '../../services/ideas.service';
import { CriteriosService } from 'src/app/services/criterios.service';
import { data } from 'jquery';

@Component({
  selector: 'app-evaluacion',
  templateUrl: './evaluacion.component.html',
  styleUrls: ['./evaluacion.component.css']
})
export class EvaluacionComponent implements OnInit {
  idUsuarioCreado: any;
  @ViewChildren('checkboxes') checkboxesRef!: QueryList<ElementRef>;
  idIdeaPropia: any;
  ideaPropia: any;
  arrayIdeas: any[]=[];
  arrayCriterios: any[]=[];
  idCriterioPropio: any;
  criterioPropio: any;
  datoVuelta: number=0;
  criteriosIdeas: { criterioId: any, ideaId: any, idUsuario: any, porcentaje: number }[] = [];
  porcentaje: number=0;

  constructor(public router:Router, private loginService:LoginService, private utilsService:UtilsService, private route: ActivatedRoute, private evaluacionService:EvaluacionService) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.idUsuarioCreado = params['id'];
      //console.log(this.idUsuarioCreado);
      });

    //this.llamarAPI();
    this.obtenerIdeasPropio(this.idUsuarioCreado);
    this.obtenerCriteriosPropio(this.idUsuarioCreado);
    console.log("Data IdeasArray:"+this.arrayIdeas.length);
    console.log("Data CriteriosArray:"+this.arrayCriterios.length);
  }

  obtenerIdeasPropio(id:any){
    this.evaluacionService.getIdeasPropio(id).subscribe(
      (data) => {
        //
        this.arrayIdeas=data.ideas;
      },
      (err) => {
        console.log(err); // Manejo de errores
      }
    );
  }

  obtenerCriteriosPropio(id:any){
    this.evaluacionService.getCriteriosPropio(id).subscribe(
      (data) => {
        //
        this.arrayCriterios=data.criterios;
      },
      (err) => {
        console.log(err); // Manejo de errores
      }
    );
  }

  seleccionSave() {
    // Create an array to store the relationships between criterios, ideas, and values
    this.criteriosIdeas = [];

    // Loop through the criterios and their associated ideas to capture the relationships and values
    this.arrayCriterios.forEach(criterio => {
      this.arrayIdeas.forEach(idea => {
        const inputValue = this.getInputValue(criterio.id, idea.id);
        if (inputValue !== null) {
          const valor = parseInt(inputValue, 10);
          if (!isNaN(valor) && valor >= 1 && valor <= 3) {

            if(valor==1){this.porcentaje=50}
            else if(valor==2){this.porcentaje=33}
            else if(valor==3){this.porcentaje=17}

            this.criteriosIdeas.push({ criterioId: criterio.id, ideaId: idea.id, idUsuario:this.idUsuarioCreado, porcentaje: this.porcentaje });

            const usuario = {idCriterio: criterio.id, idIdea: idea.id, idUsuario:this.idUsuarioCreado, porcentaje: this.porcentaje};

            this.evaluacionService.crearRegistro(usuario).subscribe( (data)=>{
              console.log(usuario);
          }, (err) => {
            //debugger
            console.log(err);
          });

          }
        }
      });
    });

        console.log(this.criteriosIdeas); // This will show the collected data
        this.router.navigate(['matriz'], { queryParams: { id: this.idUsuarioCreado} } );
  }

  private getInputValue(criterioId: any, ideaId: any): string | null {
    const inputElement = document.getElementById(`${criterioId}_${ideaId}`) as HTMLInputElement;
    return inputElement ? inputElement.value : null;
  }

  seleccionRoute(){
    this.router.navigate(['seleccion']);
  }

}
