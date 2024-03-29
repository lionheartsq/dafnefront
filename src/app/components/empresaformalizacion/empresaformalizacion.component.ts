import { Component, ViewChild } from '@angular/core';
import { ElementRef, QueryList, ViewChildren } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service';
import { LoginService } from 'src/app/services/login.service';
import { NgModel } from '@angular/forms';
import Swal from 'sweetalert2';
import { isEmpty } from 'rxjs';
import { SimulacionesService } from 'src/app/services/simulaciones.service';
import { FormalizacionService } from '../../services/formalizacion.service';

@Component({
  selector: 'app-empresaformalizacion',
  templateUrl: './empresaformalizacion.component.html',
  styleUrls: ['./empresaformalizacion.component.css']
})
export class EmpresaformalizacionComponent {
  arrayValores: any;
  isChecked: string="Sí";
  flag: number=0;
  idUsuarioSiguiente: any;
  arrayPersonas: any;
  idPersonasNext: any;
  paramUsuario: any;
  tipoProducto: any;
  valor: any;
  isVerificadoNombre: string='0';
  isVerificadoRazon: string='1';
  isVerificadoMarca: string='1';
  isVerificadoTipo: string='1';
  isVerificadoAntecedentes: string='0';
  isVerificadoDisponible: string='0';
  isVerificadoProteger: string='0';
  isVerificadoSimulacion: string= '0';
  isVerificadoCiuu: string= '0';
  isVerificadoSuelo: string= '0';
  isVerificadoActividad: string= '0';
  isVerificadoTramite: string= '0';
  isVerificadoRut: string= '0';
  isVerificadoActualizado: string='0';
  isVerificadoEstatutos: string= '1';
  isVerificadoActas: string= '1';
  isVerificadoSociedad: string= '0';
  isVerificadoLiquidacion: string= '0';
  isVerificadoPresencial: string= '0';
  isVerificadoRues: string= '1';
  isVerificadoSas: string= '0';
  isVerificadoFormalizado: string= '0';
  isVerificadoInscripcion: string= '0';
  isVerificadoSayco: string= '0';
  isVerificadoBomberil: string= '1';
  isVerificadoIndustria: string= '0';
  isVerificadoSeguridad: string= '0';
  isVerificadoNomina: string= '0';
  isVerificadoExonerado: string= '0';
  isVerificadoAfiliaciones: string= '0';
  nombreEmpresa: any;
  tipoEmpresa: string='';

  private isRequestInProgress: boolean = false;

  //Inicio variables para validar bitacora ***
  //*******************************************//
  idModulo:number=3;
  nombreSeccion:string="empresaformalizacion";
  identificadorSeccion: string="";
  variableSeccion: string="";
  idUsuarioCargado: any;
  pasosAvance: any;
  personaNaturalFlag: any;
  mensaje: string="";
  razonSocial: any;
  marca: any;
  usoDeSuelo: any;
  estatutos: any;
  acta: any;
  sociedad: any;
  impuestoRegistro: any;
  rues: any;
  libros: any;
  sayco: any;
  bomberil: any;
  placa: any;
  seguridad: any;
  salud: any;
  id: any;
  ciiu: any;
  rut: any;
  rutEmpresa: any;
  direccion: any;
  arraySimulacion: any;
  conteoSimulacion: string='';
  empresaSimulacion: string='';
  arrayDirectorio: any;
  ordinal: any;
  entidad: any;
  municipio: any;
  direccionDir: any;
  web: any;
  telefonos: any;
  chat: any;
  correo: any;
  header: string='';
  middle: string='';
  footer: string='';
  html: any;
  //*******************************************//
  //Fin variables para validar bitacora ***
  constructor(public router:Router, private loginService:LoginService, private utilsService:UtilsService, private route: ActivatedRoute, private simulacionService:SimulacionesService, private formalizacionService:FormalizacionService) {}

  ngOnInit(): void {
    this.idUsuarioCargado=localStorage.getItem('identificador_usuario');
    //
    console.log("Usuario cargado: "+this.idUsuarioCargado);
    this.verAvance(this.idUsuarioCargado,this.idModulo);
    this.validarSimulacion();
    this.cargarDirectorio();
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
      this.mensaje="Cargado";
      this.cargarDatosFormalizacion();
    }else{
      console.log("VAL RUTA: this.router.navigate(["+this.identificadorSeccion+"])");
      this.router.navigate([this.variableSeccion]);//validar lo del usuario
    }
  }
  //*******************************************//
  //Fin funciones nuevas para validar bitacora. ***

  cargarDirectorio(){
    this.formalizacionService.cargarDirectorio().subscribe(
      (data) => {
        //        console.log("Directorio: "+JSON.stringify(data));
        this.arrayDirectorio=data.directorio;
        for (let dato in this.arrayDirectorio){
          this.ordinal=dato;
          this.id=this.arrayDirectorio[dato].id;
          this.entidad=this.arrayDirectorio[dato].entidad;
          this.municipio=this.arrayDirectorio[dato].municipio;
          this.direccionDir=this.arrayDirectorio[dato].direccion;
          this.web=this.arrayDirectorio[dato].web;
          this.telefonos=this.arrayDirectorio[dato].telefonos;
          this.chat=this.arrayDirectorio[dato].chat;
          this.correo=this.arrayDirectorio[dato].correo;
        }
        console.log("Directorio: "+JSON.stringify(this.arrayDirectorio));
      },
      (err) => {
        console.log(err); // Manejo de errores
      }
    );
  }

  verDirectorio(datos:Array<any>){
    console.log("ArrayParametros: "+datos);
    this.header="<div class='container-fluid'><table class='table table-striped' style='width:1400px;'><thead><tr><th style='width:200px;'>Entidad</th><th style='width:200px;'>Municipio</th><th style='width:200px;'>Dirección</th><th style='width:200px;'>Web</th><th style='width:200px;'>Teléfonos</th><th style='width:200px;'>Chat o PQR</th><th style='width:200px;'>Correos</th></tr><tbody>";
    for (let dato in datos){
      this.ordinal=datos[dato];
      console.log("Vuelta: "+dato);
      console.log("OrdenVuelta: "+datos[dato]);
      this.entidad=this.arrayDirectorio[this.ordinal].entidad;
      this.municipio=this.arrayDirectorio[this.ordinal].municipio;
      this.direccionDir=this.arrayDirectorio[this.ordinal].direccion;
      this.web=this.arrayDirectorio[this.ordinal].web;
      this.telefonos=this.arrayDirectorio[this.ordinal].telefonos;
      this.chat=this.arrayDirectorio[this.ordinal].chat;
      this.correo=this.arrayDirectorio[this.ordinal].correo;
      this.middle=this.middle+"<tr><td>"+this.entidad+"</td><td>"+this.municipio+"</td><td>"+this.direccionDir+"</td><td><a href='"+this.web+"' target='_NEW'>"+this.web+"</a></td><td>"+this.telefonos+"</td><td><a href='"+this.chat+"' target='_NEW'>"+this.chat+"</a></td><td>"+this.correo+"</td><td></tr>";
    }
    this.footer="</tbody></table></div>";

    this.html=this.header+this.middle+this.footer;

    Swal.fire({
      title: "<strong><u>Directorio de Entidades</u></strong>",
      html: this.html,
      showCloseButton: true,
      focusConfirm: false,
      width:1000,
      customClass: {
        container: 'ajustar-tamano-sweet-alert', // Agrega una clase CSS personalizada para ajustar el tamaño
      },
    });
  }

  validarSimulacion(){
    this.formalizacionService.validarSimulacion(this.idUsuarioCargado).subscribe(
      (data) => {
        //
        console.log("Data simulacion: "+JSON.stringify(data));
          this.conteoSimulacion=data.cantidad_empresa;
          this.empresaSimulacion=data.tipo_empresa;
          console.log("ConteoSimulacion: "+this.conteoSimulacion);
          console.log("EmpresaSimulacion: "+this.empresaSimulacion);
          if(this.conteoSimulacion=='1'){
            this.isVerificadoTipo='1';
            this.isVerificadoSimulacion='1';

            switch(this.empresaSimulacion){
              case "Registrese como Empresa Unipersonal.":
                this.tipoEmpresa="Empresa Unipersonal";
                break;
              case "Registrese como Sociedad por acciones Simplificada.":
                this.tipoEmpresa="Sociedad por acciones Simplificada";
                break;
              case "Registrese como Sociedad Limitada.":
                this.tipoEmpresa="Sociedad Limitada";
                break;
              case "Registrese como Sociedad Colectiva.":
                this.tipoEmpresa="Sociedad Colectiva";
                break;
              case "Registrese como Sociedad en Comandita Simple.":
                this.tipoEmpresa="Sociedad en Comandita Simple";
                break;
              case "Registrese como Sociedad en Comandita por Acciones.":
                this.tipoEmpresa="Sociedad en Comandita por Acciones";
                break;
              case "Registrese como Sociedad Anónima.":
                this.tipoEmpresa="Sociedad Anónima";
                break;
              default:
                console.log("No existe case");
                break;
            }
            console.log("TIPO EMPRESA: "+this.tipoEmpresa);
          }else{
            this.isVerificadoTipo='0';
            this.isVerificadoSimulacion='0';
          }
      },
      (err) => {
        console.log(err); // Manejo de errores
      }
    );
  }

  cargarDatosFormalizacion(){
    this.formalizacionService.lecturaResumenEmpresa(this.idUsuarioCargado).subscribe(
      (data) => {
        //
        console.log("Data formalizacion: "+JSON.stringify(data));
        this.arrayValores=data.formalizacion_empresa;
        for (let dato in this.arrayValores){
          this.id=this.arrayValores[dato].id;
          this.razonSocial=this.arrayValores[dato].razonSocial;
          this.marca=this.arrayValores[dato].marca;
          this.ciiu=this.arrayValores[dato].ciiu;
          this.direccion=this.arrayValores[dato].direccion;
          this.usoDeSuelo=this.arrayValores[dato].usoDeSuelo;
          this.rut=this.arrayValores[dato].rut;
          this.rutEmpresa=this.arrayValores[dato].rutEmpresa;
          this.estatutos=this.arrayValores[dato].estatutos;
          this.acta=this.arrayValores[dato].acta;
          this.sociedad=this.arrayValores[dato].sociedad;
          this.impuestoRegistro=this.arrayValores[dato].impuestoRegistro;
          this.rues=this.arrayValores[dato].rues;
          this.libros=this.arrayValores[dato].libros;
          this.sayco=this.arrayValores[dato].sayco;
          this.bomberil=this.arrayValores[dato].bomberil;
          this.placa=this.arrayValores[dato].placa;
          this.seguridad=this.arrayValores[dato].seguridad;
          this.salud=this.arrayValores[dato].salud;
          this.pasosAvance=this.arrayValores[dato].pasosAvance;
          console.log("PasosAvance: "+this.pasosAvance);
        }
      },
      (err) => {
        console.log(err); // Manejo de errores
      }
    );
  }

  endRouteFormalizacion(){

  }

  reiniciarModulo(){

  }

  reiniciarTodo(){

  }

  // Toma el valor del campo file
  onFileSelected(event: any, fieldName: string) {
    const file: File | null = event.target.files && event.target.files.length > 0 ? event.target.files[0] : null;

    if (file) {
      this.readAndEncodeFile(file)
        .then((base64String: string) => {
          console.log(`Archivo ${fieldName} convertido a Base64:`, base64String);

          // Puedes enviar la cadena Base64 al servidor o realizar otras operaciones
          this.sendBase64ToServer(fieldName, base64String);
        })
        .catch((error) => {
          console.error(`Error al convertir archivo ${fieldName} a Base64:`, error);
          // Maneja errores aquí
        });
    }
  }

  readAndEncodeFile(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64String = reader.result as string;
        resolve(base64String);
      };

      reader.readAsDataURL(file);
    });
  }

  sendBase64ToServer(fieldName: string, base64String: string) {
    // Implementa la lógica para enviar la cadena Base64 al servidor con el nombre del campo
    // Puedes usar HttpClient y tu lógica de servidor aquí
    switch (fieldName) {
      case "marca":
        this.marca=base64String;
        console.log("marca: "+this.marca);
        break;
      case "usoDeSuelo":
        this.usoDeSuelo=base64String;
        console.log("usoDeSuelo: "+this.usoDeSuelo);
        break;
      case "rut":
        this.rut=base64String;
        console.log("rut: "+this.rut);
        break;
      case "rutEmpresa":
        this.rutEmpresa=base64String;
        console.log("rutEmpresa: "+this.rutEmpresa);
        break;
      case "estatutos":
        this.estatutos=base64String;
        console.log("estatutos: "+this.estatutos);
        break;
      case "acta":
        this.acta=base64String;
        console.log("acta: "+this.acta);
        break;
      case "sociedad":
        this.sociedad=base64String;
        console.log("sociedad: "+this.acta);
        break;
      case "impuestoRegistro":
        this.impuestoRegistro=base64String;
        console.log("impuestoRegistro: "+this.impuestoRegistro);
        break;
      case "rues":
        this.rues=base64String;
        console.log("rues: "+this.rues);
        break;
      case "libros":
        this.libros=base64String;
        console.log("libros: "+this.libros);
        break;
      case "sayco":
        this.sayco=base64String;
        console.log("sayco: "+this.sayco);
        break;
      case "bomberil":
        this.bomberil=base64String;
        console.log("bomberil: "+this.bomberil);
        break;
      default:
        console.log("No existe case");
        break;
    }
  }

  updateFormalizacion(pasosAvance:any){

    const empresa={id:this.id, razonSocial:this.razonSocial, marca:this.marca, ciiu:this.ciiu, direccion:this.direccion, usoDeSuelo:this.usoDeSuelo, rut:this.rut, rutEmpresa:this.rutEmpresa, estatutos:this.estatutos, acta:this.acta,
      sociedad:this.sociedad, impuestoRegistro:this.impuestoRegistro, rues:this.rues, libros:this.libros, sayco:this.sayco, bomberil:this.bomberil, placa:this.placa, seguridad:this.seguridad, salud:this.salud, pasosAvance:pasosAvance,
      idUsuario:parseInt(this.idUsuarioCargado)};

      this.formalizacionService.formalizacionUpdateEmpresa(empresa).subscribe((data) => {
        console.log("Bitacora actualizada");
        this.recargarPagina();
      }, (err) => {
        console.log(err); // Manejo de errores
        this.recargarPagina();
      });
}

  guardarUno(){
    this.updateFormalizacion(1);
  }

  guardarDos(){
    this.updateFormalizacion(2);
  }

  guardarTres(){
    this.updateFormalizacion(3);
  }

  guardarCuatro(){
    this.updateFormalizacion(4);
  }

  guardarCinco(){
    this.updateFormalizacion(5);
  }

  guardarSeis(){
    this.updateFormalizacion(6);
  }

  guardarSiete(){
    this.updateFormalizacion(7);
  }

  guardarOcho(){
    this.updateFormalizacion(8);
  }

  guardarNueve(){
    this.updateFormalizacion(9);
  }

  guardarDiez(){
    this.updateFormalizacion(10);
  }

  guardarOnce(){
    this.updateFormalizacion(11);
  }

  guardarDoce(){
    this.updateFormalizacion(12);
  }

  guardarTrece(){
    this.updateFormalizacion(13);
  }

  guardarCatorce(){
    this.updateFormalizacion(14);
  }

  guardarQuince(){
    this.updateFormalizacion(15);
  }

  guardarDieciseis(){
    this.updateFormalizacion(16);
  }

  guardarDiecisiete(){
    this.updateFormalizacion(17);
  }

  guardarDieciocho(){
    this.updateFormalizacion(18);
  }

  guardarDiecinueve(){
    this.updateFormalizacion(19);
  }

  guardarVeinte(){
    this.pasosAvance=99;
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
