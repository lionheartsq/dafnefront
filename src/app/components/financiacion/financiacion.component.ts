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
  selector: 'app-financiacion',
  templateUrl: './financiacion.component.html',
  styleUrls: ['./financiacion.component.css']
})
export class FinanciacionComponent {

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
  anual: string='1';
  tasaAnual: any;
  tasaMensual: any;
  cantidadPeriodos: any;
  tasa: any;
  //*******************************************//
  //Fin variables para validar bitacora ***

  constructor(public router:Router, private loginService:LoginService, private utilsService:UtilsService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.idUsuarioCargado=localStorage.getItem('identificador_usuario');
    //
    console.log("Usuario cargado: "+this.idUsuarioCargado);

    this.cargarFinanciacion(this.idUsuarioCargado);
  }

  cargarFinanciacion(idUsuario:any){
    this.utilsService.lecturaFinanciacion(idUsuario).subscribe(
      (data) => {
        console.log("Data: " + JSON.stringify(data));

        let localOrdinal = 0; // Variable local para manejar la posición en el array

        for (let dato of data.financiacion) {
          this.options[localOrdinal] = {
            idFinanciacion: dato.id,
            valor: dato.valor,
            anual: dato.anual,
            tasaAnual: dato.tasaAnual,
            tasaMensual: dato.tasaMensual,
            cantidadPeriodos: dato.cantidadPeriodos,
            cuota: dato.cuota,
            periodo: dato.periodo,
            capitalInicial: dato.capitalInicial,
            interes: dato.interes,
            amortizacion: dato.amortizacion,
            saldo: dato.saldo
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

  validarTasa() {
    if (this.anual === '1') {
      this.tasaAnual = this.tasa;
      this.tasaMensual = 0;
    } else {
      this.tasaAnual = 0;
      this.tasaMensual = this.tasa;
    }
  }

  guardarRoute(){

    this.validarTasa();

    const varMensaje = {valor:this.valor, anual:this.anual, tasaAnual:this.tasaAnual, tasaMensual:this.tasaMensual, cantidadPeriodos:this.cantidadPeriodos, idUsuario:parseInt(this.idUsuarioCargado)};

    this.utilsService.crearFinanciacion(varMensaje).subscribe((data)=>{
      Swal.fire(
        {
          icon: 'success',
          title: 'Solicitud enviada',
          text: 'Financiación creada correctamente',
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
