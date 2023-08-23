import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resumenideacion',
  templateUrl: './resumenideacion.component.html',
  styleUrls: ['./resumenideacion.component.css']
})
export class ResumenideacionComponent {

  constructor(public router: Router) {
  }

  fakeRoute(){
    this.router.navigate(['home']);
  }

}
