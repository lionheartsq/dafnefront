import { Component, ViewChild } from '@angular/core';
import { ElementRef, QueryList, ViewChildren } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service';
import { LoginService } from 'src/app/services/login.service';
import { NgModel } from '@angular/forms';
import Swal from 'sweetalert2';
import { isEmpty } from 'rxjs';
import { GestorService } from 'src/app/services/gestor.service';

@Component({
  selector: 'app-verlistado',
  templateUrl: './verlistado.component.html',
  styleUrls: ['./verlistado.component.css']
})
export class VerlistadoComponent {
  idUsuarioCargado: any;
  arrayEmprendedores: any;

  constructor(public router:Router, private loginService:LoginService, private utilsService:UtilsService, private route: ActivatedRoute, private gestorService: GestorService) {}

  ngOnInit(): void {
    this.idUsuarioCargado=localStorage.getItem('identificador_usuario');
    //
    console.log("Usuario cargado: "+this.idUsuarioCargado);

    this.verEmprendedores(this.idUsuarioCargado);
  }

  verEmprendedores(idUsuario:any){
    this.gestorService.listadoEmprendedores(idUsuario).subscribe(
      (data) => {
        // console.log("Data Values: "+JSON.stringify(data));
        this.arrayEmprendedores=data.users;
        console.log("Array emprendedores: "+ JSON.stringify(this.arrayEmprendedores));
      },
      (err) => {
        console.log("SEC ERR: "+err); // Manejo de errores
      }
    );
  }

}
