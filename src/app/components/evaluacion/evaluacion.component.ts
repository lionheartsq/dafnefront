import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EvaluacionService } from 'src/app/services/evaluacion.service';

@Component({
  selector: 'app-evaluacion',
  templateUrl: './evaluacion.component.html',
  styleUrls: ['./evaluacion.component.css']
})
export class EvaluacionComponent implements OnInit {
  idUsuarioCreado: any;
  arrayIdeas: any[] = [];
  arrayCriterios: any[] = [];
  criteriosIdeas: { criterioId: any, ideaId: any, idUsuario: any, porcentaje: number }[] = [];

  constructor(public router: Router, private route: ActivatedRoute, private evaluacionService: EvaluacionService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.idUsuarioCreado = params['id'];
    });

    this.obtenerIdeasPropio(this.idUsuarioCreado);
    this.obtenerCriteriosPropio(this.idUsuarioCreado);
  }

  obtenerIdeasPropio(id: any) {
    this.evaluacionService.getIdeasPropio(id).subscribe(
      (data) => {
        this.arrayIdeas = data.ideas;
        this.initializeIdeaValues();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  obtenerCriteriosPropio(id: any) {
    this.evaluacionService.getCriteriosPropio(id).subscribe(
      (data) => {
        this.arrayCriterios = data.criterios;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  initializeIdeaValues() {
    this.arrayIdeas.forEach(idea => {
      idea.valores = {}; // Inicializar un objeto para almacenar los valores de los criterios
    });
  }

  seleccionSave() {
    this.criteriosIdeas = [];

    this.arrayCriterios.forEach(criterio => {
      this.arrayIdeas.forEach(idea => {
        const inputValue = idea.valores[criterio.id];
        if (inputValue !== undefined && inputValue >= 1 && inputValue <= 3) {
          const porcentaje = inputValue === 1 ? 50 : (inputValue === 2 ? 33 : 17);
          this.criteriosIdeas.push({ criterioId: criterio.id, ideaId: idea.id, idUsuario: this.idUsuarioCreado, porcentaje: porcentaje });

          const usuario = { idCriterio: criterio.id, idIdea: idea.id, idUsuario: this.idUsuarioCreado, porcentaje: porcentaje };

          this.evaluacionService.crearRegistro(usuario).subscribe(
            data => {
              console.log(usuario);
            },
            err => {
              console.log(err);
            }
          );
        }
      });
    });

    console.log(this.criteriosIdeas);
    this.router.navigate(['matriz'], { queryParams: { id: this.idUsuarioCreado } });
  }
}
