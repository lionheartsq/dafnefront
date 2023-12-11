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
  selector: 'app-puntoequilibrio',
  templateUrl: './puntoequilibrio.component.html',
  styleUrls: ['./puntoequilibrio.component.css']
})
export class PuntoequilibrioComponent {

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
  concepto: any;
  costosGastos: any;
  precioVentaSinIva: any;
  productosInsumos: any;
  //*******************************************//
  //Fin variables para validar bitacora ***

  constructor(public router:Router, private loginService:LoginService, private utilsService:UtilsService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.idUsuarioCargado=localStorage.getItem('identificador_usuario');
    //
    console.log("Usuario cargado: "+this.idUsuarioCargado);

    this.cargarPuntoequilibrio(this.idUsuarioCargado);
  }

  cargarPuntoequilibrio(idUsuario:any){
    this.utilsService.lecturaPuntoequilibrio(idUsuario).subscribe(
      (data) => {
        console.log("Data: " + JSON.stringify(data));

        let localOrdinal = 0; // Variable local para manejar la posición en el array

        for (let dato of data.punto_equilibrio) {
          this.options[localOrdinal] = {
            idPuntoequilibrio: dato.id,
            costosGastos: dato.costosGastos,
            precioVentaSinIva: dato.precioVentaSinIva,
            productosInsumos: dato.productosInsumos
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

    const varMensaje = {costosGastos:this.costosGastos, precioVentaSinIva:this.precioVentaSinIva, productosInsumos:this.productosInsumos, idUsuario:parseInt(this.idUsuarioCargado)};

    this.utilsService.crearPuntoequilibrio(varMensaje).subscribe((data)=>{
      Swal.fire(
        {
          icon: 'success',
          title: 'Solicitud enviada',
          text: 'Punto equilibrio empresa creado correctamente',
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
