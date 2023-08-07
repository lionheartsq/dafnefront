import { Component, OnInit, ViewChild } from '@angular/core';
import { ElementRef, QueryList, ViewChildren } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service';
import { CriteriosService } from 'src/app/services/criterios.service';
import { IdeasService } from 'src/app/services/ideas.service';
import Swal from 'sweetalert2';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-evaluacion',
  templateUrl: './evaluacion.component.html',
  styleUrls: ['./evaluacion.component.css']
})
export class EvaluacionComponent {
  idUsuarioCreado: any;
  arrayOpciones: any;

  constructor(public router:Router, private loginService:LoginService, private utilsService:UtilsService, private route: ActivatedRoute, private criteriosService: CriteriosService, private ideasService: IdeasService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.idUsuarioCreado = params['id'];
      //console.log(this.idUsuarioCreado);
      });

    // Cargar hobbies propios del usuario
    this.cargarCriteriosPropio(this.idUsuarioCreado);
    this.cargarIdeasPropio(this.idUsuarioCreado);
  }


  cargarCriteriosPropio(id: any): void {
    this.criteriosService.getCriteriosPropio(id).subscribe(
      (data) => {
        console.log("Data Prop:", data);
        if (data.criterios.length > 0) {
          for (const criterio of data.criterios) {
            const idCriterioPropio = criterio.id;
            const criterioPropio = criterio.criterio;
            this.arrayOpciones.push({ idCriterio: idCriterioPropio, criterio: criterioPropio });
          }
        }
      },
      (err) => {
        console.log(err); // Manejo de errores
      }
    );
  }

  cargarIdeasPropio(id: any): void {
    this.ideasService.lecturaIdeasPropio(id).subscribe(
      (data) => {
        console.log("Data Prop:", data);
        if (data.ideas.length > 0) {
          for (const idea of data.ideas) {
            const idIdeaPropio = idea.id;
            const ideaPropio = idea.idea;
            this.arrayOpciones.push({ ididea: idIdeaPropio, idea: ideaPropio });
          }
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
