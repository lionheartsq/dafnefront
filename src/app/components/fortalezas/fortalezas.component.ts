import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fortalezas',
  templateUrl: './fortalezas.component.html',
  styleUrls: ['./fortalezas.component.css']
})
export class FortalezasComponent {
  constructor(public router: Router) {
  }

  oportunidadesRoute(){
    this.router.navigate(['oportunidades']);
  }
}
