import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seleccion',
  templateUrl: './seleccion.component.html',
  styleUrls: ['./seleccion.component.css']
})
export class SeleccionComponent {

  ideaNegocio: string | undefined;
  checkboxOptions = ['Opción 1', 'Opción 2', 'Opción 3', 'Opción 4', 'Opción 5'];

  constructor(public router: Router) {
  }

  resumenRoute(){
    this.router.navigate(['resumen']);
  }
}
