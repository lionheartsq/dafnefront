import { Component, ViewChild } from '@angular/core';
import { ElementRef, QueryList, ViewChildren } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service';
import { LoginService } from 'src/app/services/login.service';
import { NgModel } from '@angular/forms';
import Swal from 'sweetalert2';
import { isEmpty } from 'rxjs';
import { SimulacionesService } from 'src/app/services/simulaciones.service';

@Component({
  selector: 'app-resumensimulacion',
  templateUrl: './resumensimulacion.component.html',
  styleUrls: ['./resumensimulacion.component.css']
})
export class ResumensimulacionComponent {
  arrayValoresResultados: any;
  isChecked: string="Sí";
  flag: number=0;
  idUsuarioSiguiente: any;
  arrayPersonas: any;
  idPersonasNext: any;
  paramUsuario: any;
  tipoProducto: any;
  valor: any;

  private isRequestInProgress: boolean = false;

  //Inicio variables para validar bitacora ***
  //*******************************************//
  idModulo:number=2;
  nombreSeccion:string="resumensimulacion";
  identificadorSeccion: string="";
  variableSeccion: string="";
  idUsuarioCargado: any;
  arrayResumen: any []=[];
  arrayResumenFinanciero: any;
  valorArray: any;
  buttonDisabled: boolean=true;
  idPreguntas: any;
  preguntas: any;
  arraySiguientes: any;
  idPreguntasNext: any;
  producto: any;
  nombreProducto: any;
  descripcionProducto: any;
  nombreEmpresa: any;
  cantidadProducto: any;
  costoMateriales: any;
  costoCompra: any;
  personaNatural: any;
  codigoCiiu: any;
  nivelRiesgo: any;
  costosIndirectos: any;
  talentoHumano: any;
  valorPrestamo: any;
  valorGastos: any;
  margenGanancia: any;
  precioVenta: any;
  precioIva: any;
  puntoEquilibrio: any;
  ingresosAdicionales: any;
  ingresosOrdinarios: any;
  costoVentas: any;
  utilidadBruta: any;
  gastosOperacionales: any;
  utilidadOperacional: any;
  egresosAdicionales: any;
  utilidadPreImpuesto: any;
  idUsuario: any;
  id: any;
  pasosAvance: any;
  isProducto: string='1';
  isMaterial: string='1';
  isMaterias: string='1';
  isInsumos: string='1';
  isNomina: string='1';
  idCiuu: any;
  nivelarl: any;
  options: any[]=[];
  isMaquinas: string='1';
  isFinanciado: string='1';
  selectCiuu: any;
  arrayResumenCiuu: any;
  personaNaturalFlag: any;
  arrayValores: any;
  arrayValoresCostos: any;
  arrayValoresGastos: any;
  valorBaseCostos: any;
  valorBaseGastos: any;
  globalBaseCostos: number=0;
  globalBaseGastos: number=0;
  totalMat: number=0;
  totalTal: number=0;
  totalCi: number=0;
  consolidadoCostosMes: number=0;
  totalMatMes: number=0;
  totalTalMes: number=0;
  totalCiMes: number=0;
  consolidadoCostosUnidad: number=0;
  totalPrestMes: number=0;
  totalGastMes: number=0;
  consolidadoGastosUnidad: number=0;
  //*******************************************//
  //Fin variables para validar bitacora ***
  constructor(public router:Router, private loginService:LoginService, private utilsService:UtilsService, private route: ActivatedRoute, private simulacionService:SimulacionesService) {}

  ngOnInit(): void {
    this.idUsuarioCargado=localStorage.getItem('identificador_usuario');
    //
    console.log("Usuario cargado: "+this.idUsuarioCargado);

    // Espera 3 segundos antes de mostrar el botón
    setTimeout(() => {
      this.buttonDisabled = false;
    }, 3000); // 3000 milisegundos = 3 segundos

    this.verAvance(this.idUsuarioCargado,this.idModulo);
  }

    //Inicio funciones nuevas para validar bitacora. ***
  //*******************************************//
  verAvance(idUsuario:any, idModulo:any){
    this.loginService.verAvance(idUsuario, idModulo).subscribe(
      (data) => {
        console.log("Seccion: "+JSON.stringify(data));

        if (data.seccion !== null) {
          this.variableSeccion = String(data.seccion.seccion);
        } else {
          this.variableSeccion = this.nombreSeccion; // O cualquier valor predeterminado que desees
        }

        console.log("VALOR VARIABLESECCION IN: "+this.variableSeccion);
        this.luegoDeObtenerVariableSeccion(this.variableSeccion);
      },
      (err) => {
        this.luegoDeObtenerVariableSeccion(this.nombreSeccion);
        console.log("SEC ERR: "+err); // Manejo de errores
      }
    );
  }

  luegoDeObtenerVariableSeccion(variableSeccion:any) {
    console.log("VALOR VARIABLESECCION OUT: " + variableSeccion);
    this.identificadorSeccion=variableSeccion;
    // Coloca aquí cualquier lógica que dependa de this.variableSeccion
    console.log("Identificador Seccion: "+this.identificadorSeccion);
    console.log("nombre Seccion: "+this.nombreSeccion);

    if(this.identificadorSeccion===this.nombreSeccion){
      this.cargarDatosSimulacion();
      this.cargarHojaResultados();
      this.cargarHojaCostos();
      this.cargarHojaGastos();
      this.cargarValorCostos();
      this.cargarValorGastos();
      this.validarPersona();
    }else{
      console.log("VAL RUTA: this.router.navigate(["+this.identificadorSeccion+"])");
      this.router.navigate([this.variableSeccion]);//validar lo del usuario
    }
  }
  //*******************************************//
  //Fin funciones nuevas para validar bitacora. ***

  validarPersona(){
    this.utilsService.validarPersona(this.idUsuarioCargado).subscribe(
      (data) => {
        this.personaNaturalFlag=data.persona_natural;
      },
      (err) => {
        console.log(err); // Manejo de errores
      }
    );
  }

  cargarDatosSimulacion(){
    this.simulacionService.lecturaConsolidadoEmpresa(this.idUsuarioCargado).subscribe(
      (data) => {
        //
        this.arrayValores=data.consolidado_simulacion_financiera;
        for (let dato in this.arrayValores){
          this.id=this.arrayValores[dato].id;
          this.producto=this.arrayValores[dato].producto;
          this.nombreProducto=this.arrayValores[dato].nombreProducto;
          this.descripcionProducto=this.arrayValores[dato].descripcionProducto;
          this.nombreEmpresa=this.arrayValores[dato].nombreEmpresa;
          this.cantidadProducto=this.arrayValores[dato].cantidadProducto;
          this.costoMateriales=this.arrayValores[dato].costoMateriales;
          this.costoCompra=this.arrayValores[dato].costoCompra;
          this.personaNatural=this.arrayValores[dato].personaNatural;
          this.codigoCiiu=this.arrayValores[dato].codigoCiiu;
          this.nivelRiesgo=this.arrayValores[dato].nivelRiesgo;
          this.costosIndirectos=this.arrayValores[dato].costosIndirectos;
          this.talentoHumano=this.arrayValores[dato].talentoHumano;
          this.valorPrestamo=this.arrayValores[dato].valorPrestamo;
          this.valorGastos=this.arrayValores[dato].valorGastos;
          this.margenGanancia=this.arrayValores[dato].margenGanancia;
          this.precioVenta=this.arrayValores[dato].precioVenta;
          this.precioIva=this.arrayValores[dato].precioIva;
          this.puntoEquilibrio=this.arrayValores[dato].puntoEquilibrio;
          this.ingresosAdicionales=this.arrayValores[dato].ingresosAdicionales;
          this.ingresosOrdinarios=this.arrayValores[dato].ingresosOrdinarios;
          this.costoVentas=this.arrayValores[dato].costoVentas;
          this.utilidadBruta=this.arrayValores[dato].utilidadBruta;
          this.gastosOperacionales=this.arrayValores[dato].gastosOperacionales;
          this.utilidadOperacional=this.arrayValores[dato].utilidadOperacional;
          this.egresosAdicionales=this.arrayValores[dato].egresosAdicionales;
          this.utilidadPreImpuesto=this.arrayValores[dato].utilidadPreImpuesto;
          this.idUsuario=this.arrayValores[dato].idUsuario;
          this.pasosAvance=this.arrayValores[dato].pasosAvance;
          console.log("PasosAvance: "+this.pasosAvance);
        }
      },
      (err) => {
        console.log(err); // Manejo de errores
      }
    );
  }

  cargarHojaResultados(){
    this.utilsService.lecturaEstadoResultados(this.idUsuarioCargado).subscribe(
      (data) => {
        //
        this.arrayValoresResultados=data.estado_resultados_simula;
        console.log("Array Resultados: "+this.arrayValoresResultados);
      },
      (err) => {
        console.log(err); // Manejo de errores
      }
    );
  }

  cargarHojaCostos(){
    this.utilsService.lecturaHojaCostos(this.idUsuarioCargado).subscribe(
      (data) => {
        //
        this.arrayValoresCostos=data.hoja_costos_simula;
        console.log("Array Costos: "+this.arrayValoresCostos);
        for (let dato in this.arrayValoresCostos){

          if(this.arrayValoresCostos[dato].producto===1){
            this.totalMat=this.totalMat + parseFloat(this.arrayValoresCostos[dato].montounidad);
            this.totalMatMes=this.totalMatMes + parseFloat(this.arrayValoresCostos[dato].monto);
          }

          if(this.arrayValoresCostos[dato].talento===1){
            this.totalTal=this.totalTal + parseFloat(this.arrayValoresCostos[dato].montounidad);
            this.totalTalMes=this.totalTalMes + parseFloat(this.arrayValoresCostos[dato].monto);
          }

          if(this.arrayValoresCostos[dato].cif===1){
            this.totalCi=this.totalCi + parseFloat(this.arrayValoresCostos[dato].montounidad);
            this.totalCiMes=this.totalCiMes + parseFloat(this.arrayValoresCostos[dato].monto);
          }

          this.consolidadoCostosMes=this.totalMatMes+this.totalTalMes+this.totalCiMes;
          this.consolidadoCostosUnidad=this.consolidadoCostosMes/this.cantidadProducto;
        }
      },
      (err) => {
        console.log(err); // Manejo de errores
      }
    );
  }

  cargarHojaGastos(){
    this.utilsService.lecturaHojaGastos(this.idUsuarioCargado).subscribe(
      (data) => {
        //
        this.arrayValoresGastos=data.hoja_gastos_simula;
        console.log("Array Gastos: "+this.arrayValoresGastos);
        for (let dato in this.arrayValoresGastos){

          if(this.arrayValoresGastos[dato].financieros===1){
            this.totalPrestMes=this.totalPrestMes + parseFloat(this.arrayValoresGastos[dato].monto);
          }

          if(this.arrayValoresGastos[dato].adicionales===1){
            this.totalGastMes=this.totalGastMes + parseFloat(this.arrayValoresGastos[dato].monto);
          }

          this.consolidadoGastosUnidad=this.totalPrestMes+this.totalGastMes;
        }
      },
      (err) => {
        console.log(err); // Manejo de errores
      }
    );
  }

  cargarValorCostos(){
    this.utilsService.consolidadoHojaCostos(this.idUsuarioCargado).subscribe(
      (data) => {
        //
        this.valorBaseCostos=data.consolidado;
        this.globalBaseCostos=this.valorBaseCostos/this.cantidadProducto;
        console.log("valorBaseCostos: "+this.valorBaseCostos);
      },
      (err) => {
        console.log(err); // Manejo de errores
      }
    );
  }

  cargarValorGastos(){
    this.utilsService.consolidadoHojaGastos(this.idUsuarioCargado).subscribe(
      (data) => {
        //
        this.valorBaseGastos=data.consolidado;
        this.globalBaseGastos=this.valorBaseGastos/this.cantidadProducto;
        console.log("valorBaseGastos: "+this.valorBaseGastos);
      },
      (err) => {
        console.log(err); // Manejo de errores
      }
    );
  }

  reiniciarModulo(){
    this.simulacionService.resetFinanciera(this.idUsuarioCargado).subscribe(
      (data) => {
        //
        console.log("Reset Financiera: "+data.reset_simulacion_financiera);
        this.recargarPagina();
      },
      (err) => {
        console.log(err); // Manejo de errores
      }
    );
  }

  reiniciarTodo(){
    this.simulacionService.resetFinanciera(this.idUsuarioCargado).subscribe(
      (data) => {
        //
        console.log("Reset Financiera: "+data.reset_simulacion_financiera);
        this.recargarPagina();
      },
      (err) => {
        console.log(err); // Manejo de errores
      }
    );
  }

  restaurarBitacora(){
    const bitacoraR = {avance:1, idSeccion:18, idUsuario:parseInt(this.idUsuarioCargado)};
    this.loginService.crearBitacora(bitacoraR).subscribe( (data)=>{
      console.log("Bitacora actualizada");
    }, (err) => {
      console.log(err); // Manejo de errores
    });
  }

  recargarPagina() {
    window.location.reload();
  }

     //Inicio nueva Ruta ***
  //*******************************************//
  homeRoute(){
    this.router.navigate(['home']);
  }
  //*******************************************//
  //Fin nueva Ruta ***

}
