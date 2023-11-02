import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import Swal from 'sweetalert2';
import { BasicosService } from 'src/app/services/basicos.service';
import { Observable, ReplaySubject } from 'rxjs';
import { Router } from '@angular/router';
import { data } from 'jquery';
import { LoginService } from 'src/app/services/login.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-crearusuarios',
  templateUrl: './crearusuarios.component.html',
  styleUrls: ['./crearusuarios.component.css']
})
export class CrearusuariosComponent {
  nombre: string | undefined;
  correo: string| undefined;
  password: string| undefined;
  idRol: number=3;
  divEspera: string| undefined;
  options: any[] = [];
  ordinal:number=0;

  //Inicio variables para validar bitacora ***
  //*******************************************//
  idUsuarioCargado:any;
  idModulo:number=1;
  nombreSeccion:string="basicos";
  identificadorSeccion: string="";
  variableSeccion: string="";
  //*******************************************//
  //Fin variables para validar bitacora ***

  constructor(private basicosService: BasicosService, public router:Router, private loginService:LoginService, private utilsService:UtilsService) {}


  ngOnInit(): void {
    //this.mostrarToken();
    this.idUsuarioCargado=localStorage.getItem('identificador_usuario');
  }

  mostrarToken(){
    console.log("Token: "+this.loginService.getToken());
  }


  emprendedorSave(){
      //***************** En const usuario añadir id:this.idUsuarioCargado, ************************//
      const usuario = {name:this.nombre, email:this.correo, rol:this.idRol, gestor:this.idUsuarioCargado, password:this.password};
      this.loginService.crearEmprendedor(usuario).subscribe( (data)=>{
      Swal.fire(
        {
          icon: 'success',
          title: 'Solicitud enviada',
          text: 'Usuario creado correctamente',
          footer: data.message
        }
      ).then(() => {
          this.router.navigate(['administrador']);
      });
    }, (err) => {
      //debugger
      Swal.fire(
        {
          icon: 'error',
          title: 'Error al crear',
          html: 'Por favor verifique los datos e intente nuevamente',
          footer: 'No se ha podido completar el registro'
        }
      )
    });
  }

  //Inicio nueva Ruta ***
  //*******************************************//
  homeRoute(){
    this.router.navigate(['administrador']);
  }
  //*******************************************//
  //Fin nueva Ruta ***
}
