import { Component, ViewChild } from '@angular/core';
import { ElementRef, QueryList, ViewChildren } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service';
import { LoginService } from 'src/app/services/login.service';
import { EvaluacionService } from 'src/app/services/evaluacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-evaluacion',
  templateUrl: './evaluacion.component.html',
  styleUrls: ['./evaluacion.component.css']
})
export class EvaluacionComponent {
  idUsuarioCreado: any;
  @ViewChildren('checkboxes') checkboxesRef!: QueryList<ElementRef>;
  idIdeaPropia: any;
  ideaPropia: any;
  arrayIdeas: any[]=[];
  arrayCriterios: any[]=[];
  idCriterioPropio: any;
  criterioPropio: any;
  selectedValues: { [key: string]: number } = {};

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
  }

  obtenerIdeasPropio(id:any){
    this.evaluacionService.getIdeasPropio(id).subscribe(
      (data) => {
        //
        console.log("Data IdeasGen:"+data);
        for (let dato in data.ideas){
          this.idIdeaPropia=data.ideas[dato].id;
          this.ideaPropia=data.ideas[dato].idea;
          this.arrayIdeas.push({idIdea:this.idIdeaPropia, idea: this.ideaPropia});
        }
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
        console.log("Data CriteriosGen:"+data);
        for (let dato in data.criterios){
          this.idCriterioPropio=data.criterios[dato].id;
          this.criterioPropio=data.criterios[dato].criterio;
          this.arrayCriterios.push({idCriterio:this.idCriterioPropio, criterio: this.criterioPropio});
        }
      },
      (err) => {
        console.log(err); // Manejo de errores
      }
    );
  }

  seleccionRoute(){
    this.router.navigate(['seleccion']);
  }

}
