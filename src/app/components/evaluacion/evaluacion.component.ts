import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EvaluacionService } from 'src/app/services/evaluacion.service';
import Swal from 'sweetalert2';

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
  arrayMatrizIdeas: any;
  idIdeaMatriz: any;
  nombreIdeaMatriz: any;
  valorPorcentajeAcumuladoMatriz: any;
  showSpinner = false;

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

    this.obtenerMatriz(this.idUsuarioCreado);

    //this.router.navigate(['matriz'], { queryParams: { id: this.idUsuarioCreado } });
  }

  obtenerMatriz(id:any){
    this.showSpinner = true;
    this.evaluacionService.crearMatriz(id).subscribe(
      (data) => {
        //
        this.arrayMatrizIdeas=data.criterios_evaluacion;

        console.log("Data ArrayMatrizPost: "+data);
        console.log("Tipo ArrayMatrizPost: "+typeof(this.arrayMatrizIdeas));
        console.log("Length ArrayMatrizPost: "+this.arrayMatrizIdeas.length);

        for (let dato in this.arrayMatrizIdeas){
          this.idIdeaMatriz=this.arrayMatrizIdeas[dato].idIdeaUsuario;
          this.nombreIdeaMatriz=this.arrayMatrizIdeas[dato].nombreIdea;
          this.valorPorcentajeAcumuladoMatriz=this.arrayMatrizIdeas[dato].valorPorcentajeAcumulado;

          console.log("Salidas del arrayMatriz: idIdea: "+this.idIdeaMatriz+" nombreIdea: "+this.nombreIdeaMatriz+" valorPorcentaje: "+this.valorPorcentajeAcumuladoMatriz)
        }
        this.showSpinner = false;
        Swal.fire(
          {
            icon: 'success',
            title: 'Solicitud enviada',
            text: 'Matriz calculada exitosamente',
            footer: 'Matriz guardada'
          }
        ).then(() => {
          this.router.navigate(['matriz'], { queryParams: { id: this.idUsuarioCreado } });
        });
      },
      (err) => {
        console.log(err); // Manejo de errores
        Swal.fire(
          {
            icon: 'error',
            title: 'Error al crear',
            html: 'Por favor verifique los datos e intente nuevamente',
            footer: 'No se ha podido completar el registro'
          }
        )
      }
    );
  }
}
