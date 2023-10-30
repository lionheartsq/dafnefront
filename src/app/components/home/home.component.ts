import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  idUsuario:any;

  constructor(public router: Router, private loginService:LoginService) {}

  ngOnInit(): void {
    console.log("UsuarioLocal: " + localStorage.getItem('nombre_usuario'));
    console.log("idUsuarioLocal: " + localStorage.getItem('identificador_usuario'));
  }

  loginFake(){
    this.router.navigate(['home']);
  }

  basicosRoute(){
    this.router.navigate(['basicos']);
  }

  simulacionRoute(){
    this.router.navigate(['simulacionlegal']);
  }

  formalizacionRoute(){
    this.router.navigate(['basicos']);
  }

}
