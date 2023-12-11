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
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.css']
})
export class GastosComponent {

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
  maquinaria: any;
  valor: any;
  vidaUtil: any;
  depreciacion: any;
  gasto: any;
  //*******************************************//
  //Fin variables para validar bitacora ***

  constructor(public router:Router, private loginService:LoginService, private utilsService:UtilsService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.idUsuarioCargado=localStorage.getItem('identificador_usuario');
    //
    console.log("Usuario cargado: "+this.idUsuarioCargado);

    this.cargarGastos(this.idUsuarioCargado);
  }

  cargarGastos(idUsuario:any){
    this.utilsService.lecturaGastos(idUsuario).subscribe(
      (data) => {
        console.log("Data: " + JSON.stringify(data));

        let localOrdinal = 0; // Variable local para manejar la posición en el array

        for (let dato of data.gastos) {
          this.options[localOrdinal] = {
            idGastos: dato.id,
            gasto: dato.gasto,
            valor: dato.valor
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

  regresarRoute(){
    this.router.navigate(['simulacionfinanciera']);
  }

  guardarRoute(){

    const varMensaje = {gasto:this.gasto, valor:this.valor, idUsuario:parseInt(this.idUsuarioCargado)};

    this.utilsService.crearGastos(varMensaje).subscribe((data)=>{
      Swal.fire(
        {
          icon: 'success',
          title: 'Solicitud enviada',
          text: 'Gastos empresa creado correctamente',
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
