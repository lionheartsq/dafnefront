import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-estrategias1f1a',
  templateUrl: './estrategias1f1a.component.html',
  styleUrls: ['./estrategias1f1a.component.css']
})
export class Estrategias1f1aComponent {
  constructor(public router: Router) {
  }

  estrategias2d2aRoute(){
    this.router.navigate(['estrategias2d2a']);
  }
}
