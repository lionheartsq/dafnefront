import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-estrategias2d2a',
  templateUrl: './estrategias2d2a.component.html',
  styleUrls: ['./estrategias2d2a.component.css']
})
export class Estrategias2d2aComponent {
  constructor(public router: Router) {
  }

  modelocanvasRoute(){
    this.router.navigate(['modelocanvas']);
  }
}
