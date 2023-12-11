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
  nombre: any;
  tipoDocumento: string| undefined;
  numeroDocumento: string| undefined;
  correo: any;
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

  //Inicio variables para validar bitacora ***
  //*******************************************//
  idUsuarioCargado:any;
  idModulo:number=1;
  nombreSeccion:string="basicos";
  identificadorSeccion: string="";
  variableSeccion: string="";
  //*******************************************//
  //Fin variables para validar bitacora ***

  constructor(private basicosService: BasicosService, public router:Router, private loginService:LoginService, private utilsService:UtilsService) {}

  ngOnInit(): void {
    //this.mostrarToken();

    this.idUsuarioCargado=localStorage.getItem('identificador_usuario');
    this.nombre=localStorage.getItem('nombre_usuario');
    this.correo=localStorage.getItem('email_usuario');
    console.log("BASICOS IDUSUARIOCARGADO: "+this.idUsuarioCargado);

    this.verAvance(this.idUsuarioCargado,this.idModulo);
  }

  mostrarToken(){
    console.log("Token: "+this.loginService.getToken());
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
      this.fetchOptions();
    }else{
      console.log("VAL RUTA: this.router.navigate(["+this.identificadorSeccion+"])");
      this.router.navigate([this.variableSeccion]);//validar lo del usuario
    }
  }
  //*******************************************//
  //Fin funciones nuevas para validar bitacora. ***

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
      //***************** En const usuario añadir id:this.idUsuarioCargado, ************************//
      const usuario = {id:this.idUsuarioCargado, nombre:this.nombre, tipodocumento:this.tipoDocumento, documento:this.numeroDocumento, email:this.correo, telefono:this.telefono, direccion:this.direccion, ciudad:this.ciudad, sexo:this.sexo, idRol:this.idRol};
      console.log("USUARIO OBJECT: "+JSON.stringify(usuario));
      this.basicosService.crearUsuario(usuario).subscribe( (data)=>{
      localStorage.setItem('identificador_emprendedor', this.idUsuarioCargado);
      Swal.fire(
        {
          icon: 'success',
          title: 'Solicitud enviada',
          text: 'Usuario creado correctamente',
          footer: data.message
        }
      ).then(() => {
        //Inicio Modificacion Bitacora ***
        //*******************************************//
        //this.idUsuarioCreado=data.idUsuario;
        //localStorage.setItem('identificador_usuario', this.idUsuarioCargado);

        const bitacora = {avance:1, idSeccion:2, idUsuario:parseInt(this.idUsuarioCargado)};
        this.loginService.crearBitacora(bitacora).subscribe( (data)=>{

          console.log("Bitacora registrada");

            const bitacora2 = {avance:1, idSeccion:18, idUsuario:parseInt(this.idUsuarioCargado)};
            this.loginService.crearBitacora(bitacora2).subscribe( (data)=>{

              console.log("Bitacora2 registrada");

                const bitacora3 = {avance:1, idSeccion:23, idUsuario:parseInt(this.idUsuarioCargado)};
                this.loginService.crearBitacora(bitacora3).subscribe( (data)=>{

                  console.log("Bitacora3 registrada");
                }, (err) => {
                  console.log("PAYLOAD ERROR: "+JSON.stringify(bitacora3));
                  console.log(err); // Manejo de errores
                });

            }, (err) => {
              console.log("PAYLOAD ERROR: "+JSON.stringify(bitacora2));
              console.log(err); // Manejo de errores
            });

          this.router.navigate(['experiencia']);
        }, (err) => {
          console.log("PAYLOAD ERROR: "+JSON.stringify(bitacora));
          console.log(err); // Manejo de errores
        });
        //*******************************************//
        //Fin Modificacion Bitacora ***
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

  //Inicio nueva Ruta ***
  //*******************************************//
  homeRoute(){
    this.router.navigate(['home']);
  }
  //*******************************************//
  //Fin nueva Ruta ***
}

