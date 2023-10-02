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
  idUsuarioCreado: any;
  arrayEmpresa: any;
  logo: any;
  idEmpresa: any;
  nombreIdea: any;
  nombreEmpresa: any;
  mision: any;
  vision: any;
  slogan: any;
  url: string='';

  constructor(public router:Router, private route: ActivatedRoute, private resumenempresaService:ResumenempresaService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.idUsuarioCreado = params['id'];
      //console.log(this.idUsuarioCreado);
      this.cargarDatosEmpresa(this.idUsuarioCreado);
      });
  }

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
        console.log("Actual idEmpresa: "+this.idEmpresa);
        console.log("Actual idUsuario: "+this.idUsuarioCreado);
        console.log("Actual nombreIdea: "+this.nombreIdea);
        console.log("Actual nombreEmpresa: "+this.nombreEmpresa);
        console.log("Actual mision: "+this.mision);
        console.log("Actual vision: "+this.vision);
        console.log("Actual slogan: "+this.slogan);
        console.log("Actual logo: "+this.logo);
        if(this.logo === null){
          this.logo="./assets/nologo.png";
        }
        console.log("Real logo: "+this.logo);
      },
      (err) => {
        console.log(err); // Manejo de errores
      }
    );
  }

  onImageSelect(event: any) {
    this.selectedImage = event.target.files[0];
  }

  uploadImage() {
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
          console.log("Actual idUsuario: "+this.idUsuarioCreado);
          console.log("Actual nombreIdea: "+this.nombreIdea);
          console.log("Actual nombreEmpresa: "+this.nombreEmpresa);
          console.log("Actual mision: "+this.mision);
          console.log("Actual vision: "+this.vision);
          console.log("Actual slogan: "+this.slogan);
          console.log("Actual logo: "+this.logo);
          console.log("Actual URL: "+this.url);

          const varNuevaEmpresa = {id:this.idEmpresa, idUsuario:this.idUsuarioCreado, nombreIdea:this.nombreIdea, nombreEmpresa:this.nombreEmpresa, mision:this.mision, vision:this.vision, slogan:this.slogan, logo:this.url};
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
              //this.router.navigate(['resumen'], { queryParams: { id: this.idUsuarioCreado} } );
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

  uploadSlogan() {
      const varNuevaEmpresa = {id:this.idEmpresa, idUsuario:this.idUsuarioCreado, nombreIdea:this.nombreIdea, nombreEmpresa:this.nombreEmpresa, mision:this.mision, vision:this.vision, slogan:this.slogan, logo:this.logo};
      console.log("Var nuevaEmpresa: "+varNuevaEmpresa);
      this.resumenempresaService.actualizarEmpresa(varNuevaEmpresa).subscribe( (data)=>{
        Swal.fire(
          {
            icon: 'success',
            title: 'Solicitud enviada',
            text: 'Slogan empresa cargado correctamente',
            footer: data.message
          }
        ).then(() => {
          //this.router.navigate(['resumen'], { queryParams: { id: this.idUsuarioCreado} } );
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

  uploadNombre() {
    const varNuevaEmpresa = {id:this.idEmpresa, idUsuario:this.idUsuarioCreado, nombreIdea:this.nombreIdea, nombreEmpresa:this.nombreEmpresa, mision:this.mision, vision:this.vision, slogan:this.slogan, logo:this.logo};
    console.log("Var nuevaEmpresa: "+varNuevaEmpresa);
    this.resumenempresaService.actualizarEmpresa(varNuevaEmpresa).subscribe( (data)=>{
      Swal.fire(
        {
          icon: 'success',
          title: 'Solicitud enviada',
          text: 'Nombre empresa cargado correctamente',
          footer: data.message
        }
      ).then(() => {
        //this.router.navigate(['resumen'], { queryParams: { id: this.idUsuarioCreado} } );
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

  uploadMision() {
    const varNuevaEmpresa = {id:this.idEmpresa, idUsuario:this.idUsuarioCreado, nombreIdea:this.nombreIdea, nombreEmpresa:this.nombreEmpresa, mision:this.mision, vision:this.vision, slogan:this.slogan, logo:this.logo};
    console.log("Var nuevaEmpresa: "+varNuevaEmpresa);
    this.resumenempresaService.actualizarEmpresa(varNuevaEmpresa).subscribe( (data)=>{
      Swal.fire(
        {
          icon: 'success',
          title: 'Solicitud enviada',
          text: 'Misión empresa cargada correctamente',
          footer: data.message
        }
      ).then(() => {
        //this.router.navigate(['resumen'], { queryParams: { id: this.idUsuarioCreado} } );
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

  uploadVision() {
    const varNuevaEmpresa = {id:this.idEmpresa, idUsuario:this.idUsuarioCreado, nombreIdea:this.nombreIdea, nombreEmpresa:this.nombreEmpresa, mision:this.mision, vision:this.vision, slogan:this.slogan, logo:this.logo};
    console.log("Var nuevaEmpresa: "+varNuevaEmpresa);
    this.resumenempresaService.actualizarEmpresa(varNuevaEmpresa).subscribe( (data)=>{
      Swal.fire(
        {
          icon: 'success',
          title: 'Solicitud enviada',
          text: 'Visión empresa cargada correctamente',
          footer: data.message
        }
      ).then(() => {
        //this.router.navigate(['resumen'], { queryParams: { id: this.idUsuarioCreado} } );
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
    this.router.navigate(['resumenideacion'], { queryParams: { id: this.idUsuarioCreado} } );
  }

}
