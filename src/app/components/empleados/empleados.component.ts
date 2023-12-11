import { Component, ViewChild } from '@angular/core';
import { ElementRef, QueryList, ViewChildren } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service';
import { LoginService } from 'src/app/services/login.service';
import { FormsModule } from '@angular/forms';
import { DofaService } from 'src/app/services/dofa.service';
import Swal from 'sweetalert2';
import { isEmpty } from 'rxjs';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent {

  //Inicio variables para validar bitacora ***
  //*******************************************//
  idUsuarioCargado: any;
  options: any[]=[];
  optionsP: any[]=[];
  empleado: any;
  produccion: any;
  idRiesgo: any;
  idPerfil: any;
  isProduccion: string='1';
  //*******************************************//
  //Fin variables para validar bitacora ***

  constructor(public router:Router, private loginService:LoginService, private utilsService:UtilsService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.idUsuarioCargado=localStorage.getItem('identificador_usuario');
    //
    console.log("Usuario cargado: "+this.idUsuarioCargado);

    this.cargarEmpleados(this.idUsuarioCargado);
    this.cargarPerfiles(this.idUsuarioCargado);
  }

  cargarPerfiles(idUsuario:any){
    this.utilsService.lecturaPerfiles(idUsuario).subscribe(
      (data) => {
        console.log("Data: " + JSON.stringify(data));

        let localOrdinal = 0; // Variable local para manejar la posición en el array

        for (let dato of data.perfiles_empresa) {
          this.optionsP[localOrdinal] = {
            idPerfil: dato.id,
            perfil: dato.perfil,
            precio: dato.precio
          };

          localOrdinal = localOrdinal + 1;
        }

        console.log("Array salida: " + JSON.stringify(this.options));
      },
      (err) => {
        console.log(err); // Manejo de errores
      }
    );
  }

  cargarEmpleados(idUsuario:any){
    this.utilsService.lecturaEmpleados(idUsuario).subscribe(
      (data) => {
        console.log("Data: " + JSON.stringify(data));

        let localOrdinal = 0; // Variable local para manejar la posición en el array

        for (let dato of data.empleados_empresa) {
          this.options[localOrdinal] = {
            idEmpleado: dato.id,
            empleado: dato.empleado,
            produccion: dato.produccion,
            idRiesgo: dato.idRiesgo,
            idPerfil: dato.idPerfil
          };

          localOrdinal = localOrdinal + 1;
        }

        console.log("Array salida: " + JSON.stringify(this.options));
      },
      (err) => {
        console.log(err); // Manejo de errores
      }
    );
  }

  validarProduccion() {
    if (this.isProduccion === '1') {
      this.produccion = 1;
    } else {
      this.produccion = 0;
    }
  }

  regresarRoute(){
    this.router.navigate(['simulacionfinanciera']);
  }

  guardarRoute(){

    this.validarProduccion();

    const varMensaje = {empleado:this.empleado, produccion:this.produccion, idRiesgo:this.idRiesgo, idPerfil:this.idPerfil, idUsuario:parseInt(this.idUsuarioCargado)};

    this.utilsService.crearEmpleado(varMensaje).subscribe((data)=>{
      Swal.fire(
        {
          icon: 'success',
          title: 'Solicitud enviada',
          text: 'Empleado empresa creado correctamente',
          footer: data.message
        }
      ).then(() => {
        //
        window.location.reload();
        //this.router.navigate(['matrizdofa']);
      });
    }, (err) => {
      //debugger
      console.log(err);
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

}
