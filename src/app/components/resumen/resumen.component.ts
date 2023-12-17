import { Component, ViewChild } from '@angular/core';
import { ElementRef, QueryList, ViewChildren } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service';
import { LoginService } from 'src/app/services/login.service';
import { NgModel } from '@angular/forms';
import { ResumenempresaService } from '../../services/resumenempresa.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.css']
})
export class ResumenComponent {
  selectedImage: File | null = null;
  arrayEmpresa: any;
  logo: any;
  idEmpresa: any;
  nombreIdea: string="";
  nombreEmpresa: string="";
  mision: string="";
  vision: string="";
  slogan: string="";
  url: string='';
  valIdea: number=0;
  valNombre: number=0;
  valMision: number=0;
  valVision: number=0;
  valSlogan: number=0;
  valLogo: number=0;
  totalVal: number=0;

    //Inicio variables para validar bitacora ***
    //*******************************************//
    idModulo:number=1;
    nombreSeccion:string="resumen";
    identificadorSeccion: string="";
    variableSeccion: string="";
    idUsuarioCargado: any;
    //*******************************************//
    //Fin variables para validar bitacora ***

  constructor(public router:Router, private route: ActivatedRoute, private loginService:LoginService, private resumenempresaService:ResumenempresaService) {}

  ngOnInit(): void {
      this.idUsuarioCargado=localStorage.getItem('identificador_usuario');
      //
      console.log("Usuario cargado: "+this.idUsuarioCargado);

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
      this.cargarDatosEmpresa(this.idUsuarioCargado);
    }else{
      console.log("VAL RUTA: this.router.navigate(["+this.identificadorSeccion+"])");
      this.router.navigate([this.variableSeccion]);//validar lo del usuario
    }
  }
  //*******************************************//
  //Fin funciones nuevas para validar bitacora. ***

  cargarDatosEmpresa(idUsuario:any){
    this.resumenempresaService.getEmpresaPropio(idUsuario).subscribe(
      (data) => {
        //
        this.arrayEmpresa=data.resumen_empresa;
        for (let dato in this.arrayEmpresa){
          this.idEmpresa=this.arrayEmpresa[dato].id;
          this.nombreIdea=this.arrayEmpresa[dato].nombreIdea;
          this.nombreEmpresa=this.arrayEmpresa[dato].nombreEmpresa;
          this.mision=this.arrayEmpresa[dato].mision;
          this.vision=this.arrayEmpresa[dato].vision;
          this.slogan=this.arrayEmpresa[dato].slogan;
          this.logo=this.arrayEmpresa[dato].logo;
        }

        if(this.nombreIdea != ""){this.valIdea=1}
        if(this.nombreEmpresa != ""){this.valNombre=1}
        if(this.mision != ""){this.valMision=1}
        if(this.vision != ""){this.valVision=1}
        if(this.slogan != ""){this.valSlogan=1}

        console.log("Actual idEmpresa: "+this.idEmpresa);
        console.log("Actual idUsuario: "+this.idUsuarioCargado);
        console.log("Actual nombreIdea: "+this.nombreIdea);
        console.log("Actual nombreEmpresa: "+this.nombreEmpresa);
        console.log("Actual mision: "+this.mision);
        console.log("Actual vision: "+this.vision);
        console.log("Actual slogan: "+this.slogan);
        console.log("Actual logo: "+this.logo);

        if(this.logo === null){
          this.logo="./assets/nologo.png";
        }else{
          this.valLogo=1;
        }
        console.log("Real logo: "+this.logo);

        this.totalVal=this.valIdea+this.valNombre+this.valMision+this.valVision+this.valSlogan+this.valLogo;
      },
      (err) => {
        console.log(err); // Manejo de errores
      }
    );
  }

  onImageSelect(event: any) {
    this.selectedImage = event.target.files[0];
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
      case "logo":
        this.logo=base64String;
        console.log("logo: "+this.logo);
        break;
      default:
        console.log("No existe case");
        break;
    }
  }

  uploadImage() {
    const varNuevaEmpresa = {id:this.idEmpresa, idUsuario:this.idUsuarioCargado, nombreIdea:this.nombreIdea, nombreEmpresa:this.nombreEmpresa, mision:this.mision, vision:this.vision, slogan:this.slogan, logo:this.logo};
    console.log("Var nuevaEmpresa: "+varNuevaEmpresa);
    this.resumenempresaService.actualizarEmpresa(varNuevaEmpresa).subscribe( (data)=>{
      console.log("Var nuevaEmpresa lanzada: "+varNuevaEmpresa);
    }, (err) => {
      //debugger
      console.log("Error cargando objeto: "+varNuevaEmpresa);
    });

    if (this.selectedImage) {
      const formData = new FormData();
      formData.append('image', this.selectedImage);

      // Utilizar el servicio para cargar la imagen
      this.resumenempresaService.cargarImagen(formData).subscribe(
        (response) => {
          // Aquí puedes manejar la respuesta del servidor, que debe incluir la URL de la imagen almacenada
          console.log('URL de la imagen:', response['imageUrl']);
          this.url=response['imageUrl'];
          // Realiza las acciones que necesites con la idea seleccionada
          console.log("Actual idEmpresa: "+this.idEmpresa);
          console.log("Actual idUsuario: "+this.idUsuarioCargado);
          console.log("Actual nombreIdea: "+this.nombreIdea);
          console.log("Actual nombreEmpresa: "+this.nombreEmpresa);
          console.log("Actual mision: "+this.mision);
          console.log("Actual vision: "+this.vision);
          console.log("Actual slogan: "+this.slogan);
          console.log("Actual logo: "+this.logo);
          console.log("Actual URL: "+this.url);

          const varNuevaEmpresa = {id:this.idEmpresa, idUsuario:this.idUsuarioCargado, nombreIdea:this.nombreIdea, nombreEmpresa:this.nombreEmpresa, mision:this.mision, vision:this.vision, slogan:this.slogan, logo:this.url};
          console.log("Var nuevaEmpresa: "+varNuevaEmpresa);
          this.resumenempresaService.actualizarEmpresa(varNuevaEmpresa).subscribe( (data)=>{
            Swal.fire(
              {
                icon: 'success',
                title: 'Solicitud enviada',
                text: 'Logo empresa cargado correctamente',
                footer: data.message
              }
            ).then(() => {
              //this.router.navigate(['resumen'], { queryParams: { id: this.idUsuarioCargado} } );
              //
              window.location.reload();
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
        },
        (error) => {
          console.error('Error al subir la imagen:', error);
        }
      );
    }
  }

  uploadUpdate() {
    const varNuevaEmpresa = {id:this.idEmpresa, idUsuario:this.idUsuarioCargado, nombreIdea:this.nombreIdea, nombreEmpresa:this.nombreEmpresa, mision:this.mision, vision:this.vision, slogan:this.slogan, logo:this.logo};
    console.log("Var nuevaEmpresa Enviado: "+varNuevaEmpresa);
    this.resumenempresaService.actualizarEmpresa(varNuevaEmpresa).subscribe( (data)=>{
      Swal.fire(
        {
          icon: 'success',
          title: 'Solicitud enviada',
          text: 'Datos empresa cargados correctamente',
          footer: data.message
        }
      ).then(() => {
        //this.router.navigate(['resumen'], { queryParams: { id: this.idUsuarioCargado} } );
        //
        window.location.reload();
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


  fakeRoute(){
    //Inicio Modificacion Bitacora ***
    //*******************************************//
    const bitacora = {avance:1, idSeccion:13, idUsuario:parseInt(this.idUsuarioCargado)};
    this.loginService.crearBitacora(bitacora).subscribe( (data)=>{
      console.log("Bitacora registrada");
      this.router.navigate(['resumenideacion']);
    }, (err) => {
      console.log(err); // Manejo de errores
    });
    //*******************************************//
    //Fin Modificacion Bitacora ***
  }
  //Inicio nueva Ruta ***
  //*******************************************//
  homeRoute(){
    this.router.navigate(['home']);
  }
  //*******************************************//
  //Fin nueva Ruta ***
}
