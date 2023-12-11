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
  selector: 'app-proyeccionmensual',
  templateUrl: './proyeccionmensual.component.html',
  styleUrls: ['./proyeccionmensual.component.css']
})
export class ProyeccionmensualComponent {

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
  ingresosActividadesOrdinarias: any;
  costoVentas: any;
  utilidadBruta: any;
  gastosOperacionales: any;
  utilidadOperacional: any;
  otrosIngresos: any;
  otrosEgresos: any;
  utilidadAntesImpuesto: any;
  //*******************************************//
  //Fin variables para validar bitacora ***

  constructor(public router:Router, private loginService:LoginService, private utilsService:UtilsService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.idUsuarioCargado=localStorage.getItem('identificador_usuario');
    //
    console.log("Usuario cargado: "+this.idUsuarioCargado);

    this.cargarProyeccionmensual(this.idUsuarioCargado);
  }

  cargarProyeccionmensual(idUsuario:any){
    this.utilsService.lecturaProyeccionmensual(idUsuario).subscribe(
      (data) => {
        console.log("Data: " + JSON.stringify(data));

        let localOrdinal = 0; // Variable local para manejar la posición en el array

        for (let dato of data.proyeccion_mensual) {
          this.options[localOrdinal] = {
            idProyeccionmensual: dato.id,
            ingresosActividadesOrdinarias: dato.ingresosActividadesOrdinarias,
            costoVentas: dato.costoVentas,
            utilidadBruta: dato.utilidadBruta,
            gastosOperacionales: dato.gastosOperacionales,
            utilidadOperacional: dato.utilidadOperacional,
            otrosIngresos: dato.otrosIngresos,
            otrosEgresos: dato.otrosEgresos,
            utilidadAntesImpuesto: dato.utilidadAntesImpuesto
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

    const varMensaje = {ingresosActividadesOrdinarias:this.ingresosActividadesOrdinarias, costoVentas:this.costoVentas, utilidadBruta:this.utilidadBruta, gastosOperacionales:this.gastosOperacionales,
      utilidadOperacional:this.utilidadOperacional, otrosIngresos:this.otrosIngresos, otrosEgresos:this.otrosIngresos, idUsuario:parseInt(this.idUsuarioCargado)};

    this.utilsService.crearProyeccionmensual(varMensaje).subscribe((data)=>{
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
