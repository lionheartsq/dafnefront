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
  selector: 'app-personaformalizacion',
  templateUrl: './personaformalizacion.component.html',
  styleUrls: ['./personaformalizacion.component.css']
})
export class PersonaformalizacionComponent {
  arrayValores: any;
  isChecked: string="Sí";
  flag: number=0;
  idUsuarioSiguiente: any;
  arrayPersonas: any;
  idPersonasNext: any;
  paramUsuario: any;
  tipoProducto: any;
  valor: any;
  nombreEmpresa: any;
  isVerificadoNombre: any;
  isVerificadoValidar: string= '1';
  isVerificadoDisponible: string= '1';
  isVerificadoMarca: string= '1';
  isVerificadoAntecedentes: string= '1';
  isVerificadoMarcaDisponible: string= '1';
  isVerificadoMarcaProteger: string= '1';
  isVerificadoMSimulacion: string= '1';
  isVerificadoEconomica: string= '1';
  isVerificadoAEconomica: string= '1';
  isVerificadoAEPrincipal: string= '1';
  isVerificadoCSuelo: string= '1';
  isVerificadoSabeRut: string= '1';
  isVerificadoARut: string= '1';
  isVerificadoERues: string= '1';
  isVerificadoMoSimula: string= '1';
  isVerificadoProyeccion: string= '1';
  isVerificadoProyeccionS: string= '1';
  isVerificadoCerBomberil: string= '1';
  isVerificadoProceso: string= '1';
  isVerificadoPrograma: string= '1';
  isVerificadoModSimula: string= '1';
  isVerificadoPersonas: string= '1';
  isVerificadoExonerado: string= '1';
  isVerificadoCPersonas: string= '1';
  isVerificadoAfiliaciones: string= '1';

  private isRequestInProgress: boolean = false;

  //Inicio variables para validar bitacora ***
  //*******************************************//
  idModulo:number=3;
  nombreSeccion:string="personaformalizacion";
  identificadorSeccion: string="";
  variableSeccion: string="";
  idUsuarioCargado: any;
  pasosAvance: any;
  personaNaturalFlag: any;
  mensaje: string="";
  nombre: any;
  marca: any;
  codigoCiiu: any;
  usoDeSuelo: any;
  direccion: any;
  rut: any;
  rues: any;
  sayco: any;
  bomberil: any;
  placa: any;
  //seguridad: any;
  //afiliacion: any;
  id: any;
  conteoSimulacion: string='';
  arrayDirectorio: any;
  entidad: any;
  municipio: any;
  direccionDir: any;
  web: any;
  telefonos: any;
  chat: any;
  correo: any;
  html: string | HTMLElement | JQuery<HTMLElement> | undefined;
  ordinal: any;
  header: string='';
  footer: string='';
  middle: string='';
  //*******************************************//
  //Fin variables para validar bitacora ***
  constructor(
    public router:Router,
    private loginService:LoginService,
    private utilsService:UtilsService,
    private route: ActivatedRoute,
    private simulacionService:SimulacionesService,
    private formalizacionService:FormalizacionService
    ) {}

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
    this.formalizacionService.validarSimulaPersona(this.idUsuarioCargado).subscribe(
      (data) => {
        //
        console.log("Data simulacion: "+JSON.stringify(data));
          this.conteoSimulacion=data.persona_natural;
          console.log("ConteoSimulacion: "+this.conteoSimulacion);
          if(this.conteoSimulacion=='1'){
            this.isVerificadoMSimulacion='1';
            this.isVerificadoMoSimula='1';
            this.isVerificadoModSimula='1';
          }else{
            this.isVerificadoMSimulacion='0';
            this.isVerificadoMoSimula='0';
            this.isVerificadoModSimula='0';
          }
      },
      (err) => {
        console.log(err); // Manejo de errores
      }
    );
  }

  cargarDatosFormalizacion(){
    this.formalizacionService.lecturaResumenPersona(this.idUsuarioCargado).subscribe(
      (data) => {
        //
        console.log("Data formalizacion: "+JSON.stringify(data));
        this.arrayValores=data.formalizacion_persona;
        for (let dato in this.arrayValores){
          this.id=this.arrayValores[dato].id;
          this.nombre=this.arrayValores[dato].nombre;
          this.marca=this.arrayValores[dato].marca;
          this.codigoCiiu=this.arrayValores[dato].codigoCiiu;
          this.usoDeSuelo=this.arrayValores[dato].usoDeSuelo;
          this.direccion=this.arrayValores[dato].direccion;
          this.rut=this.arrayValores[dato].rut;
          this.rues=this.arrayValores[dato].rues;
          this.sayco=this.arrayValores[dato].sayco;
          this.bomberil=this.arrayValores[dato].bomberil;
          this.placa=this.arrayValores[dato].placa;
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
      case "rues":
        this.rues=base64String;
        console.log("rues: "+this.rues);
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

    const persona={id:this.id, nombre:this.nombre, marca:this.marca, codigoCiiu:this.codigoCiiu, usoDeSuelo:this.usoDeSuelo, direccion:this.direccion, rut:this.rut, rues:this.rues, sayco:this.sayco, bomberil:this.bomberil,
      placa:this.placa,pasosAvance:pasosAvance, idUsuario:parseInt(this.idUsuarioCargado)};

      this.formalizacionService.formalizacionUpdatePersona(persona).subscribe((data) => {
        console.log("Bitacora actualizada");
        this.recargarPagina();
      }, (err) => {
        console.log(err); // Manejo de errores
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
