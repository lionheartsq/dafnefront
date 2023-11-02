import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service';
import { LoginService } from 'src/app/services/login.service';
import { ExperienciaService } from 'src/app/services/experiencia.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent {
  escolaridad: string | undefined;
  nivelescolaridad: string ='Ninguno';
  areaconocimiento: string ='Ninguna';
  ocupacion: string | undefined;
  lugar: string ='Ninguno';
  areaocupacion: string ='Ninguna';
  experiencia: string | undefined;
  areaexperiencia: string  ='Ninguna';
  actividades: string  ='Ninguna';
  emailUsuarioActual: any;
  idUsuarioActual:any;

//Inicio variables para validar bitacora ***
  //*******************************************//
  idModulo:number=1;
  nombreSeccion:string="experiencia";
  identificadorSeccion: string="";
  variableSeccion: string="";
  idUsuarioCargado: any;
  //*******************************************//
  //Fin variables para validar bitacora ***

  constructor(public router:Router, private loginService:LoginService, private utilsService:UtilsService, private route: ActivatedRoute, private experienciaService:ExperienciaService) {
  }

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
      this.emailUsuarioActual=this.obtenerUsuarioActual();
      this.obtenerIdUsuarioActual(this.emailUsuarioActual);
    }else{
      console.log("VAL RUTA: this.router.navigate(["+this.identificadorSeccion+"])");
      this.router.navigate([this.variableSeccion]);//validar lo del usuario
    }
  }
  //*******************************************//
  //Fin funciones nuevas para validar bitacora. ***

  obtenerUsuarioActual(){
    return this.loginService.getUsuario();
  }

  obtenerIdUsuarioActual(email:any){
    this.utilsService.lecturaUsuarioEmail(this.emailUsuarioActual).subscribe(
      (data) => {
        for (let dato in data.users){
          this.idUsuarioActual=data.users[dato].id;
        }
      },
      (err) => {
        console.log(err); // Manejo de errores
      }
    );
  }

  experienciaSave(){
    //***************** En const usuario añadir id:this.idUsuarioCargado, ************************//
      const varEscolaridad = {escolaridad:this.escolaridad, nivelescolaridad:this.nivelescolaridad, areaconocimiento:this.areaconocimiento, idUsuario:this.idUsuarioCargado};
      const varOcupacion = {ocupacion:this.ocupacion, lugar:this.lugar, area:this.areaocupacion, idUsuario:this.idUsuarioCargado};
      const varExperiencia = {experiencia:this.experiencia, area:this.areaexperiencia, actividades:this.actividades, idUsuario:this.idUsuarioCargado};
      this.experienciaService.crearEscolaridad(varEscolaridad).subscribe( (data)=>{
          console.log("Escolaridad registrada correctamente");

          //Inicio Modificacion Bitacora ***
          //*******************************************//
          const bitacora = {avance:1, idSeccion:3, idUsuario:parseInt(this.idUsuarioCargado)};
          this.loginService.crearBitacora(bitacora).subscribe( (data)=>{
            console.log("Bitacora registrada");
            this.router.navigate(['hobbies']);
          }, (err) => {
            console.log(err); // Manejo de errores
          });
          //*******************************************//
          //Fin Modificacion Bitacora ***

          this.experienciaService.crearOcupacion(varOcupacion).subscribe( (data)=>{
            console.log("Escolaridad ocupación correctamente");
              this.experienciaService.crearExperiencia(varExperiencia).subscribe( (data)=>{
                Swal.fire(
                  {
                    icon: 'success',
                    title: 'Solicitud enviada',
                    text: 'Información registrada correctamente',
                    footer: data.message
                  }
                ).then(() => {
                  //this.router.navigateByUrl('hobbies');
                  //this.router.navigate(['hobbies'], { queryParams: { id: this.idUsuarioCreado} } );
                  this.router.navigate(['hobbies']);
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
          }, (err) => {
            //debugger
            Swal.fire(
              {
                icon: 'error',
                title: 'Error al registrar',
                html: 'Por favor verifique los datos e intente nuevamente',
                footer: 'No se ha podido completar el registro'
              }
            )
          });
      }, (err) => {
        //debugger
        Swal.fire(
          {
            icon: 'error',
            title: 'Error al registrar escolaridad',
            html: 'Por favor verifique los datos e intente nuevamente',
            footer: 'No se ha podido completar el registro'
          }
        )
      });
  }

  hobbiesRoute(){
    this.router.navigate(['hobbies']);
  }
//Inicio nueva Ruta ***
  //*******************************************//
  homeRoute(){
    this.router.navigate(['home']);
  }
  //*******************************************//
  //Fin nueva Ruta ***
}

