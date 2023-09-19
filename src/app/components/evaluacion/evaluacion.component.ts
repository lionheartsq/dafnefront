import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EvaluacionService } from 'src/app/services/evaluacion.service';
import Swal from 'sweetalert2';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-evaluacion',
  templateUrl: './evaluacion.component.html',
  styleUrls: ['./evaluacion.component.css']
})
export class EvaluacionComponent implements OnInit {
  idUsuarioCreado: any;
  arrayIdeas: any[] = [];
  arrayCriterios: any[] = [];
  arrayCriteriosParcial: any[] = [];
  criteriosIdeas: { criterioId: any, ideaId: any, idUsuario: any, porcentaje: number }[] = [];
  arrayMatrizIdeas: any;
  idIdeaMatriz: any;
  nombreIdeaMatriz: any;
  valorPorcentajeAcumuladoMatriz: any;
  showSpinner = false;
  idParcial: any;
  flagMax: number=0;
  idParcialNuevo: any;
  suenosService: any;

  constructor(public router: Router, private route: ActivatedRoute, private evaluacionService: EvaluacionService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.idUsuarioCreado = params['id'];
      this.idParcial = params['idC'];
      console.log("IDC: "+this.idParcial);
    });

    this.cargarDatos(this.idUsuarioCreado, this.idParcial);
  }

  cargarDatos(id:any, idc:any) {
    this.arrayCriteriosParcial=[];
    this.obtenerIdeasPropio(id);
    this.obtenerCriteriosPropio(id, idc);
    this.cdr.detectChanges(); // Forzar la detección de cambios
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

  obtenerCriteriosPropio(id: any, idc: any) {
    this.evaluacionService.getCriteriosPropio(id).subscribe(
      (data) => {
        this.arrayCriterios = data.criterios;
        this.flagMax=(this.arrayCriterios.length)-1;
        console.log("MaxVal: "+this.flagMax);
        const idcNumero = parseInt(idc, 10); // Convierte idc a número base 10

        this.arrayCriterios.forEach((criterio, index) => {
          console.log("Iteración: " + index);
          console.log("Idc: " + idcNumero); // Utiliza la variable idcNumero convertida a número
          console.log("Salidas del arrayCriterios: id: " + criterio.id + " criterio: " + criterio.criterio + " index: " + index);
          if (index === idcNumero) {
            console.log("Verdadero en la iteración: " + index);
            // Almacena el valor actual en arrayCriteriosParcial
            this.arrayCriteriosParcial.push(criterio);
          }
        });

        this.arrayCriteriosParcial.forEach((criterio, index) => {
          console.log("IteraciónParcial: " + index);
          console.log("Salidas del arrayCriteriosParcial: id: " + criterio.id + " criterio: " + criterio.criterio + " index: " + index);
        });

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

  seleccionParcialSave() {
    this.criteriosIdeas = [];
    console.log("Nuevo orden de arrayIdeas:", this.arrayIdeas);
     this.arrayCriteriosParcial.forEach(criterio => {
      this.arrayIdeas.forEach((item, index) => {
        item.index = index;
        var val= parseInt(item.index)+1;
          const porcentaje = val === 1 ? 50 : (val === 2 ? 33 : 17);
          this.criteriosIdeas.push({ criterioId: criterio.id, ideaId: item.id, idUsuario: this.idUsuarioCreado, porcentaje: porcentaje });

          const usuario = { idCriterio: criterio.id, idIdea: item.id, idUsuario: this.idUsuarioCreado, porcentaje: porcentaje };

          console.log("Val val: "+val);
          console.log("Val Const Usuario: "+usuario);
           this.evaluacionService.crearRegistro(usuario).subscribe(
            data => {
              console.log(usuario);
            },
            err => {
              console.log(err);
            }
          );
      });
    });

    console.log(this.criteriosIdeas);

    this.idParcialNuevo=parseInt(this.idParcial, 10)+1;

    this.router.navigate(['evaluacion'], { queryParams: { id: this.idUsuarioCreado, idC: this.idParcialNuevo } });

    this.cargarDatos(this.idUsuarioCreado, this.idParcialNuevo);
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

  sendNumberValue(itemId: number, value: number) {
    // Aquí debes realizar la lógica para enviar el valor numérico al endpoint
    // junto con el ID del elemento correspondiente
    console.log('ID:', itemId, 'Valor:', value);
    // Realiza la lógica para enviar los datos al endpoint
    const data = {
      id: itemId,
      value: value
    };
    this.suenosService.enviarValor(data).subscribe(
      () => {
        console.log('Valor enviado correctamente');
      },
      (err: any) => {
        console.error('Error al enviar el valor:', err);
      }
    );
  }

  validateValues(): void {
    console.log("Nuevo orden de arrayIdeas:", this.arrayIdeas);
    this.arrayCriterios.forEach((item, index) => {
      item.index = index;
      var val= parseInt(item.index)+1;
      this.sendNumberValue(item.idEvaluacion, val);
    });
    //Pendiente validacion
    Swal.fire({
      icon: 'success',
      title: 'Solicitud enviada',
      text: 'Valores criterios registrados correctamente',
      footer: 'criterios   guardados'
    }).then(() => {
      //console.log("Final orden de arrayCriterios:", this.arrayCriterios);
      // Redireccionar a la página deseada
      this.router.navigate(['ideas'], { queryParams: { id: this.idUsuarioCreado} } );
    });
  }

  onDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      // Actualiza las posiciones de idHobby después de la reorganización
      this.arrayIdeas.forEach((item, index) => {
        item.index = index;
      });
    }
}
