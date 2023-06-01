import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-evaluacion',
  templateUrl: './evaluacion.component.html',
  styleUrls: ['./evaluacion.component.css']
})
export class EvaluacionComponent {

  constructor(public router: Router) {
  }

  seleccionRoute(){
    this.router.navigate(['seleccion']);
  }

}
