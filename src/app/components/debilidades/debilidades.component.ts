import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-debilidades',
  templateUrl: './debilidades.component.html',
  styleUrls: ['./debilidades.component.css']
})
export class DebilidadesComponent {
  constructor(public router: Router) {
  }

  fortalezasRoute(){
    this.router.navigate(['fortalezas']);
  }
}
