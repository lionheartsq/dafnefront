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
  arrayOpciones: any[]=[];
  idRelacionIdea: any;
  idRelacionCriterio: any;
  varNuevaRelacion: { idUsuarioIdeas: any; idUsuarioCriterios: any; idUsuario: any; } | undefined;
  selectedValues: { [key: string]: number } = {};
  relacionIdea: any;
  relacionCriterio: any;
  arrayIdeas: any[]=[];
  arrayCriterios: any[]=[];

  constructor(public router:Router, private loginService:LoginService, private utilsService:UtilsService, private route: ActivatedRoute, private evaluacionService:EvaluacionService, private ideasService:IdeasService, private criteriosService:CriteriosService) {
    }
    ngOnInit(): void {
      this.route.queryParams.subscribe(params => {
        this.idUsuarioCreado = params['id'];
        //console.log(this.idUsuarioCreado);
        });

      this.cargarCriteriosPropio(this.idUsuarioCreado);
    }

    cargarCriteriosPropio(id: any): void {
      this.evaluacionService.getIdeasCriterios(id).subscribe(
        (data) => {
          console.log("Data Cargar:", data);
          if (data.criterios.length > 0) {
            for (const relacion of data.relacion_ideas_criterios) {
              const idRelacion = relacion.id;
              const idUsuarioIdeas = relacion.idUsuarioIdeas;
              const idUsuarioCriterios = relacion.idUsuarioCriterios;
              this.arrayOpciones.push({ idRelacion: idRelacion, idUsuarioIdeas: idUsuarioIdeas, idUsuarioCriterios: idUsuarioCriterios });
            }
          }
          else{
            this.generarRelaciones(this.idUsuarioCreado);
          }
        },
        (err) => {
          console.log(err); // Manejo de errores
        }
      );
    }

    poblarIdeas(id:any):void{
      this.ideasService.lecturaUsuarioIdeasPropio(id).subscribe(
        (data)=>{
          console.log("Data Ideas:", data);
          for (const relacionIdea of data.ideas) {
            const idRelacionIdea = relacionIdea.id;
            console.log("Valor id idea en loop ideas: "+idRelacionIdea);
            this.arrayIdeas.push({ idRelacionIdea });
          }
        },
        (err) => {
          console.log(err); // Manejo de errores
        }
      );
    }

    poblarCriterios(id:any){
        this.criteriosService.getCriteriosPropio(id).subscribe(
          (data)=>{
            console.log("Data Criterios:", data);
            for (const relacionCriterio of data.criterios) {
              const idRelacionCriterio = relacionCriterio.id;
              console.log("Valor id idea en loop criterios: "+idRelacionCriterio);
              this.arrayCriterios.push({ idRelacionCriterio });
            }
        },
        (err) => {
          console.log(err); // Manejo de errores
        }
      );
    }

    generarRelaciones(id:any): void {

      this.poblarIdeas(id);
      this.poblarCriterios(id);

      console.log("Foreach Out Ideas: "+this.arrayCriterios);

      for (let claveIdeas of this.arrayIdeas){
        console.log("ArrayIdeas: "+this.arrayIdeas[claveIdeas]);
        for (let claveCriterios of this.arrayCriterios){
          console.log("ArrayCriterios: "+this.arrayCriterios[claveCriterios]);

          this.varNuevaRelacion = {idUsuarioIdeas:this.idRelacionIdea, idUsuarioCriterios:this.idRelacionCriterio, idUsuario:this.idUsuarioCreado};
          console.log("Carga data relacion: "+this.varNuevaRelacion);

          this.evaluacionService.crearRelacion(this.varNuevaRelacion).subscribe(
              (data)=>{
                console.log(data); // Creación
            },
            (err) => {
              console.log(err); // Manejo de errores
            }
          );
        }
      }

      this.evaluacionService.getIdeasCriterios(id).subscribe(
        (data) => {
          console.log("Data Relacion:", data);
          if (data.criterios.length > 0) {
            for (const relacion of data.relacion_ideas_relacions) {
              const idRelacion = relacion.id;
              const idUsuarioIdeas = relacion.idUsuarioIdeas;
              const idUsuarioCriterios = relacion.idUsuarioCriterios;
              this.arrayOpciones.push({ idRelacion: idRelacion, idUsuarioIdeas: idUsuarioIdeas, idUsuarioCriterios: idUsuarioCriterios });
            }
          }
       },
       (err) => {
         console.log(err); // Manejo de errores
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
    this.criteriosService.enviarValor(data).subscribe(
      () => {
        console.log('Valor enviado correctamente');
      },
      (err) => {
        console.error('Error al enviar el valor:', err);
      }
    );
  }

    saveData(): void {

    }

  seleccionRoute(){
    this.router.navigate(['seleccion']);
  }

}
