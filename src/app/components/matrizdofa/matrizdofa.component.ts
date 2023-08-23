import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-matrizdofa',
  templateUrl: './matrizdofa.component.html',
  styleUrls: ['./matrizdofa.component.css']
})
export class MatrizdofaComponent {
  constructor(public router: Router) {
  }

  amenazasRoute(){
    this.router.navigate(['amenazas']);
  }
}
