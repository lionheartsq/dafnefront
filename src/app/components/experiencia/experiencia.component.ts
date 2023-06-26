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
  idUsuarioCreado: any;


  constructor(public router:Router, private loginService:LoginService, private utilsService:UtilsService, private route: ActivatedRoute, private experienciaService:ExperienciaService) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.idUsuarioCreado = params['id'];
      //
      console.log(this.idUsuarioCreado);
      });

    this.emailUsuarioActual=this.obtenerUsuarioActual();
    this.obtenerIdUsuarioActual(this.emailUsuarioActual);
  }

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
      const varEscolaridad = {escolaridad:this.escolaridad, nivelescolaridad:this.nivelescolaridad, areaconocimiento:this.areaconocimiento, idUsuario:this.idUsuarioCreado};
      const varOcupacion = {ocupacion:this.ocupacion, lugar:this.lugar, area:this.areaocupacion, idUsuario:this.idUsuarioCreado};
      const varExperiencia = {experiencia:this.experiencia, area:this.areaexperiencia, actividades:this.actividades, idUsuario:this.idUsuarioCreado};
      this.experienciaService.crearEscolaridad(varEscolaridad).subscribe( (data)=>{
        Swal.fire(
          {
            icon: 'success',
            title: 'Solicitud enviada',
            text: 'Escolaridad registrada correctamente',
            footer: data.message
          }
        ).then(() => {
          this.experienciaService.crearOcupacion(varOcupacion).subscribe( (data)=>{
            Swal.fire(
              {
                icon: 'success',
                title: 'Solicitud enviada',
                text: 'Ocupación registrada correctamente',
                footer: data.message
              }
            ).then(() => {
              this.experienciaService.crearExperiencia(varExperiencia).subscribe( (data)=>{
                Swal.fire(
                  {
                    icon: 'success',
                    title: 'Solicitud enviada',
                    text: 'Experiencia registrada correctamente',
                    footer: data.message
                  }
                ).then(() => {
                  //this.router.navigateByUrl('hobbies');
                  //
                  this.router.navigate(['hobbies'], { queryParams: { id: this.idUsuarioCreado} } );
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

}

