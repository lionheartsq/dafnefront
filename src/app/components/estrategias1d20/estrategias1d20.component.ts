import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-estrategias1d20',
  templateUrl: './estrategias1d20.component.html',
  styleUrls: ['./estrategias1d20.component.css']
})
export class Estrategias1d20Component {
  constructor(public router: Router) {
  }

  estrategias1f1aRoute(){
    this.router.navigate(['estrategias1f1a']);
  }
}
