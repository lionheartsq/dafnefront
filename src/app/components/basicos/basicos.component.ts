import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import Swal from 'sweetalert2';
import { BasicosService } from 'src/app/services/basicos.service';
import { Observable, ReplaySubject } from 'rxjs';
import { Router } from '@angular/router';
import { data } from 'jquery';
import { LoginService } from 'src/app/services/login.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styleUrls: ['./basicos.component.css']
})
export class BasicosComponent {
  nombre: string | undefined;
  tipoDocumento: string| undefined;
  numeroDocumento: string| undefined;
  correo: string| undefined;
  telefono: string| undefined;
  direccion: string| undefined;
  ciudad: string| undefined;
  sexo: string| undefined;
  idRol: number=3;
  divEspera: string| undefined;
  options: any[] = [];
  idCiudad: any;
  nombreCiudad: any;
  ordinal:number=0;
  idUsuarioCreado:any;

  constructor(private basicosService: BasicosService, public router:Router, private loginService:LoginService, private utilsService:UtilsService) {}

  ngOnInit(): void {
    //this.mostrarToken();
    this.fetchOptions();
  }

  mostrarToken(){
    console.log("Token: "+this.loginService.getToken());
  }

  fetchOptions() {
      this.utilsService.lecturaCiudades().subscribe(
      (data) => {
        //console.log("Type of Data: "+typeof(data.ciudad[0].ciudad));

        for (let dato in data.ciudad){
          this.idCiudad=data.ciudad[dato].ciudad;
          this.options[this.ordinal] = data.ciudad[dato].ciudad; // Asigna los datos obtenidos al arreglo de opciones
          //console.log("Array vuelta: "+this.ordinal+" - "+this.options[this.ordinal]);
          this.ordinal=this.ordinal+1;
          //console.log("CIUDAD: "+this.nombreCiudad);
        }
        //console.log("Array salida: "+this.options);
      },
      (err) => {
        console.log(err); // Manejo de errores
      }
    );
  }

  basicosSave(){
      const usuario = {nombre:this.nombre, tipodocumento:this.tipoDocumento, documento:this.numeroDocumento, email:this.correo, telefono:this.telefono, direccion:this.direccion, ciudad:this.ciudad, sexo:this.sexo, idRol:this.idRol};
      this.basicosService.crearUsuario(usuario).subscribe( (data)=>{
      Swal.fire(
        {
          icon: 'success',
          title: 'Solicitud enviada',
          text: 'Usuario creado correctamente',
          footer: data.message
        }
      ).then(() => {
        this.idUsuarioCreado=data.idUsuario;
        // Aquí la alerta se ha cerrado
        //this.router.navigateByUrl('experiencia');
        //
        this.router.navigate(['experiencia'], { queryParams: { id: this.idUsuarioCreado} } );
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

  experienciaRoute(){
    this.router.navigate(['experiencia']);
  }

}

