import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(public router: Router) {
  }

  loginFake(){
    this.router.navigate(['home']);
  }

  basicosRoute(){
    this.router.navigate(['basicos']);
  }

  simulacionRoute(){
    this.router.navigate(['basicos']);
  }

  formalizacionRoute(){
    this.router.navigate(['basicos']);
  }

}
