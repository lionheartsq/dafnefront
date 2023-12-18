import { Component, ViewChild } from '@angular/core';
import { ElementRef, QueryList, ViewChildren } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service';
import { LoginService } from 'src/app/services/login.service';
import { NgModel } from '@angular/forms';
import Swal from 'sweetalert2';
import { isEmpty } from 'rxjs';
import { SimulacionesService } from 'src/app/services/simulaciones.service';
import { formatCurrency } from '@angular/common';

@Component({
  selector: 'app-simulacionfinanciera',
  templateUrl: './simulacionfinanciera.component.html',
  styleUrls: ['./simulacionfinanciera.component.css']
})
export class SimulacionfinancieraComponent {
  arrayValores: any;
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
  nombreSeccion:string="simulacionfinanciera";
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
  costoMaterialesView: any;
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
      this.validarPersona();
      this.fetchOptions();
    }else{
      console.log("VAL RUTA: this.router.navigate(["+this.identificadorSeccion+"])");
      this.router.navigate([this.variableSeccion]);//validar lo del usuario
    }
  }
  //*******************************************//
  //Fin funciones nuevas para validar bitacora. ***

  fetchOptions() {
    this.utilsService.lecturaCiuu().subscribe(
      (data) => {
        //console.log("Type of Data: " + typeof (data.codigo_ciiu[0].descripcion));
        //console.log("Data: " + JSON.stringify(data));

        let localOrdinal = 0; // Variable local para manejar la posición en el array

        for (let dato of data.codigo_ciiu) {
          this.options[localOrdinal] = {
            idCiuu: dato.id,
            descripcion: dato.descripcion,
            codigo: dato.codigo,
            idRiesgo: dato.idriesgo
          };

          localOrdinal = localOrdinal + 1;
        }

        //console.log("Array salida: " + JSON.stringify(this.options));
      },
      (err) => {
        console.log(err); // Manejo de errores
      }
    );
  }

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

  uploadFinanciacion() {
    //this.openPopup("fortalezas");
    this.router.navigate(['financiacion']);
  }

  uploadPerfiles() {
    //this.openPopup("fortalezas");
    this.router.navigate(['perfiles']);
  }

  uploadEmpleados() {
    //this.openPopup("amenazas");
    this.router.navigate(['empleados']);
  }

  uploadMaquinas() {
    //this.openPopup("fortalezas");
    this.router.navigate(['maquinaria']);
  }

  uploadCif() {
    //this.openPopup("fortalezas");
    this.router.navigate(['cif']);
  }

  uploadGastos() {
    //this.openPopup("fortalezas");
    this.router.navigate(['gastos']);
  }

  uploadPrecioventa() {
    //this.openPopup("fortalezas");
    this.router.navigate(['precioventa']);
  }

  uploadIngresosadicionales() {
    //this.openPopup("fortalezas");
    this.router.navigate(['ingresosadicionales']);
  }

  uploadGastosadicionales() {
    //this.openPopup("fortalezas");
    this.router.navigate(['gastosadicionales']);
  }

  uploadPuntoequilibrio() {
    //this.openPopup("fortalezas");
    this.router.navigate(['puntoequilibrio']);
  }

  uploadProyeccionmensual() {
    //this.openPopup("fortalezas");
    this.router.navigate(['proyeccionmensual']);
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

  reiniciarModuloSolamente(){
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

    this.simulacionService.resetLegal(this.idUsuarioCargado).subscribe(
      (data) => {
        //
        if(localStorage.getItem('flag_empresa')=='1'){ //es empresa y debo resetear empresa

          this.simulacionService.resetTributarioEmpresa(this.idUsuarioCargado).subscribe(
            (data) => {
              //
              this.restaurarBitacora();
              this.reiniciarModuloSolamente();
              console.log("Reset Empresa: "+data.reset_tributario_empresa);
              this.router.navigate(['simulacionlegal']);
            },
            (err) => {
              console.log(err); // Manejo de errores
            }
          );

        }else{ //es persona y debo resetear persona

          this.simulacionService.resetTributarioPersona(this.idUsuarioCargado).subscribe(
            (data) => {
              //
              this.restaurarBitacora();
              this.reiniciarModuloSolamente();
              console.log("Reset Persona: "+data.reset_tributario_persona);
              this.router.navigate(['simulacionlegal']);
            },
            (err) => {
              console.log(err); // Manejo de errores
            }
          );

        }

        console.log("Reset Legal: "+data.reset_legal);
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

  validarMaquinas() {
    if (this.isMaquinas === '1') {
      //this.producto = 1;
    } else {
      //this.producto = 0;
    }
  }

  validarFinanciacion() {
    if (this.isFinanciado === '1') {
      //this.producto = 1;
    } else {
      //this.producto = 0;
    }
  }

  endRouteFinanciera(){
    //Inicio Modificacion Bitacora ***
    //*******************************************//
    const bitacora = {avance:1, idSeccion:22, idUsuario:parseInt(this.idUsuarioCargado)};
    this.loginService.crearBitacora(bitacora).subscribe( (data)=>{
      console.log("Bitacora registrada");
      this.router.navigate(['resumensimulacion']);
    }, (err) => {
      console.log(err); // Manejo de errores
    });
    //*******************************************//
    //Fin Modificacion Bitacora ***
  }

  guardarUno(){

    if (this.isProducto === '1') {
      this.producto = 1;
    } else {
      this.producto = 0;
    }

    this.personaNatural=this.personaNaturalFlag;
    this.pasosAvance=1;
    this.updateFinanciera();
  }

  guardarDos(){

    this.codigoCiiu=this.options[this.selectCiuu-1].codigo+' - '+this.options[this.selectCiuu-1].descripcion;
    this.nivelRiesgo=this.options[this.selectCiuu-1].idRiesgo;

    if (this.isMaterial === '1') {
      if (this.isMaterias === '1') {this.costoCompra=0;} else{this.costoMateriales=0;}
    } else {
      if (this.isInsumos === '1') {this.costoCompra=0;} else{this.costoMateriales=0;}
    }

    this.pasosAvance=2;
    this.updateFinanciera();
  }

  guardarTres(){
    this.generarHojaDeCostos();
  }

  guardarCuatro(){
    this.generarHojaDeGastos();
  }

  guardarCinco(){
    this.crearEstadoResultados();
  }

  crearEstadoResultados(){
    const usuario = {idUsuario:parseInt(this.idUsuarioCargado)};
      this.utilsService.crearEstadoResultados(usuario).subscribe( (data)=>{
        console.log("Hoja estado empresa generada");
        this.pasosAvance=5;
        this.endRouteFinanciera();
      }, (err) => {
        console.log(err); // Manejo de errores
      });
  }

  generarHojaDeCostos(){
    const usuario = {idUsuario:parseInt(this.idUsuarioCargado)};
      this.utilsService.crearHojaCostos(usuario).subscribe( (data)=>{
        console.log("Hoja empresa generada");
        this.pasosAvance=3;
        this.updateFinanciera();
      }, (err) => {
        console.log(err); // Manejo de errores
      });
  }

  generarHojaDeGastos(){
    const usuario = {idUsuario:parseInt(this.idUsuarioCargado)};
      this.utilsService.crearHojaGastos(usuario).subscribe( (data)=>{
        console.log("Hoja empresa generada");
        this.pasosAvance=4;
        this.updateFinanciera();
      }, (err) => {
        console.log(err); // Manejo de errores
      });
  }

  updateFinanciera(){
      //si producto es 1 -> producto, si es 0 -> servicio -- default(0)
      //si personaNatural es 1 -> personaNatural, si es 0 -> empresa -- default(0)

      const empresaVar = {producto:this.producto, nombreProducto:this.nombreProducto, descripcionProducto:this.descripcionProducto, nombreEmpresa:this.nombreEmpresa,
        cantidadProducto:this.cantidadProducto, costoMateriales:this.costoMateriales, costoCompra:this.costoCompra, personaNatural:this.personaNatural,
        codigoCiiu:this.codigoCiiu, nivelRiesgo:this.nivelRiesgo, margenGanancia:this.margenGanancia, precioVenta:this.precioVenta, precioIva:this.precioIva,
        pasosAvance:this.pasosAvance, idUsuario:parseInt(this.idUsuarioCargado)};

      this.simulacionService.updateConsolidadoEmpresa(empresaVar).subscribe( (data)=>{
        console.log("Consolidado empresa actualizado");
        this.recargarPagina();
      }, (err) => {
        console.log(err); // Manejo de errores
      });
  }

  saveRoute(){
    //si producto es 1 -> producto, si es 0 -> servicio -- default(0)
    //si personaNatural es 1 -> personaNatural, si es 0 -> empresa -- default(0)
    const empresaVar = {producto:this.producto, nombreProducto:this.nombreProducto, descripcionProducto:this.descripcionProducto, nombreEmpresa:this.nombreEmpresa, cantidadProducto:this.cantidadProducto, costoMateriales:this.costoMateriales,
    costoCompra:this.costoCompra, personaNatural:this.personaNatural, codigoCiiu:this.codigoCiiu, nivelRiesgo:this.nivelRiesgo, costosIndirectos:this.costosIndirectos, talentoHumano:this.talentoHumano,valorPrestamo:this.valorPrestamo,
    valorGastos:this.valorGastos, margenGanancia:this.margenGanancia, precioVenta:this.precioVenta, precioIva:this.precioIva, puntoEquilibrio:this.puntoEquilibrio, ingresosAdicionales:this.ingresosAdicionales, ingresosOrdinarios:this.ingresosOrdinarios,
    costoVentas:this.costoVentas, utilidadBruta:this.utilidadBruta, gastosOperacionales:this.gastosOperacionales, utilidadOperacional:this.utilidadOperacional, egresosAdicionales:this.egresosAdicionales, utilidadPreImpuesto:this.utilidadPreImpuesto,
    pasosAvance:this.pasosAvance, idUsuario:parseInt(this.idUsuarioCargado)};

    this.simulacionService.updateConsolidadoEmpresa(empresaVar).subscribe( (data)=>{
      console.log("Consolidado empresa actualizado");
      this.recargarPagina();
    }, (err) => {
      console.log(err); // Manejo de errores
    });
  }

   //Inicio nueva Ruta ***
  //*******************************************//
  homeRoute(){
    this.router.navigate(['home']);
  }
  //*******************************************//
  //Fin nueva Ruta ***

  cargarResumenLegal(){
    this.simulacionService.lecturaResumenTributarioEmpresa(this.idUsuarioCargado).subscribe(
      (data) => {
        //
        this.arrayResumenFinanciero=data.avances_tributario;
        console.log("ARRAY RESUMEN LEGAL: "+JSON.stringify(this.arrayResumenFinanciero));
        for (let dato in this.arrayResumenFinanciero){
          console.log("DATO: "+this.arrayResumenFinanciero[dato].cadena);
          this.arrayResumen.push({cadena:this.arrayResumenFinanciero[dato].cadena});
        }
        console.log("ARRAY RESUMEN: "+JSON.stringify(this.arrayResumen));
      },
      (err) => {
        console.log(err); // Manejo de errores
      }
    );
  }

  maskInput(event: any) {
    const inputValue = event.target.value;

    // Eliminar todos los puntos y comas existentes
    const cleanedValue = inputValue.replace(/[.,]/g, '');

    // Formatear el valor con puntos de mil
    const formattedValue = this.formatWithCommas(cleanedValue);

    // Actualizar el valor en el modelo
    this.costoMateriales = inputValue;
    this.costoMaterialesView = formattedValue;

    console.log("Valor enviar: "+this.costoMateriales);
  }

  formatWithCommas(value: string): string {
    const parts = value.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    return parts.join(',');
  }

}
