import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-estrategias1f10',
  templateUrl: './estrategias1f10.component.html',
  styleUrls: ['./estrategias1f10.component.css']
})
export class Estrategias1f10Component {
  constructor(public router: Router) {
  }

  estrategias1d20Route(){
    this.router.navigate(['estrategias1d20']);
  }
}
