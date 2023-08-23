import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-amenazas',
  templateUrl: './amenazas.component.html',
  styleUrls: ['./amenazas.component.css']
})
export class AmenazasComponent {
  constructor(public router: Router) {
  }

  debilidadesRoute(){
    this.router.navigate(['debilidades']);
  }
}
