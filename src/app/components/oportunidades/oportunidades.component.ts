import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-oportunidades',
  templateUrl: './oportunidades.component.html',
  styleUrls: ['./oportunidades.component.css']
})
export class OportunidadesComponent {
  constructor(public router: Router) {
  }

  estrategiasRoute(){
    this.router.navigate(['estrategias']);
  }
}
