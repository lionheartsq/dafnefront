import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-estrategias',
  templateUrl: './estrategias.component.html',
  styleUrls: ['./estrategias.component.css']
})
export class EstrategiasComponent {
  constructor(public router: Router) {
  }

  estrategias1f10Route(){
    this.router.navigate(['estrategias1f10']);
  }
}
