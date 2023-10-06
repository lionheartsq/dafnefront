import { Component, ViewChild } from '@angular/core';
import { ElementRef, QueryList, ViewChildren } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service';
import { LoginService } from 'src/app/services/login.service';
import { NgModel } from '@angular/forms';
import { ResumenempresaService } from '../../services/resumenempresa.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-resumenideacion',
  templateUrl: './resumenideacion.component.html',
  styleUrls: ['./resumenideacion.component.css']
})
export class ResumenideacionComponent {
  idUsuarioCreado: any;
  arrayEmpresa: any;
  idEmpresa: any;
  nombreIdea: any;
  nombreEmpresa: any;
  mision: any;
  vision: any;
  slogan: any;
  logo: any;
  arrayExperiencia: any;
  arrayEscolaridad: any;
  arrayOcupacion: any;
  experiencia: any;
  actividades: any;
  areaExperiencia: any;
  escolaridad: any;
  nivelescolaridad: any;
  areaconocimiento: any;
  ocupacion: any;
  lugar: any;
  arrayUsuario: any;
  nombre: any;
  tipodocumento: any;
  documento: any;
  direccion: any;
  telefono: any;
  ciudad: any;
  email: any;
  sexo: any;
  area: any;
  arrayHobbies: any;
  arraySuenos: any;
  hobby: any;
  sueno: any;

  constructor(public router:Router, private route: ActivatedRoute, private resumenempresaService:ResumenempresaService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.idUsuarioCreado = params['id'];
      //console.log(this.idUsuarioCreado);
      this.cargarDatosEmpresa(this.idUsuarioCreado);
      this.cargarDatosExperiencia(this.idUsuarioCreado);
      this.cargarDatosOcupacion(this.idUsuarioCreado);
      this.cargarDatosEscolaridad(this.idUsuarioCreado);
      this.cargarDatosUsuario(this.idUsuarioCreado);
      this.cargarHobbiesUsuario(this.idUsuarioCreado);
      this.cargarSuenosUsuario(this.idUsuarioCreado);
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
      },
      (err) => {
        console.log(err); // Manejo de errores
      }
    );
  }

  cargarDatosExperiencia(idUsuario:any){
    this.resumenempresaService.getExperienciaPropio(idUsuario).subscribe(
      (data) => {
        //
        this.arrayExperiencia=data.resumen_experiencia;
        for (let dato in this.arrayExperiencia){
          this.experiencia=this.arrayExperiencia[dato].experiencia;
          this.actividades=this.arrayExperiencia[dato].actividades;
          this.areaExperiencia=this.arrayExperiencia[dato].area;
        }
        console.log("Actual experiencia: "+this.experiencia);
        console.log("Actual actividades: "+this.actividades);
        console.log("Actual areaExperiencia: "+this.areaExperiencia);
      },
      (err) => {
        console.log(err); // Manejo de errores
      }
    );
  }

  cargarDatosEscolaridad(idUsuario:any){
    this.resumenempresaService.getEscolaridadPropio(idUsuario).subscribe(
      (data) => {
        //
        this.arrayEscolaridad=data.resumen_escolaridad;
        for (let dato in this.arrayEscolaridad){
          this.escolaridad=this.arrayEscolaridad[dato].escolaridad;
          this.nivelescolaridad=this.arrayEscolaridad[dato].nivelescolaridad;
          this.areaconocimiento=this.arrayEscolaridad[dato].areaconocimiento;
        }
        console.log("Actual escolaridad: "+this.escolaridad);
        console.log("Actual nivelescolaridad: "+this.nivelescolaridad);
        console.log("Actual areaconocimiento: "+this.areaconocimiento);
      },
      (err) => {
        console.log(err); // Manejo de errores
      }
    );
  }

  cargarDatosOcupacion(idUsuario:any){
    this.resumenempresaService.getOcupacionPropio(idUsuario).subscribe(
      (data) => {
        //
        this.arrayOcupacion=data.resumen_ocupacion;
        for (let dato in this.arrayOcupacion){
          this.ocupacion=this.arrayOcupacion[dato].ocupacion;
          this.lugar=this.arrayOcupacion[dato].lugar;
          this.area=this.arrayOcupacion[dato].area;
        }
        console.log("Actual ocupacion: "+this.ocupacion);
        console.log("Actual lugar: "+this.lugar);
        console.log("Actual area: "+this.area);
      },
      (err) => {
        console.log(err); // Manejo de errores
      }
    );
  }

  cargarDatosUsuario(idUsuario:any){
    this.resumenempresaService.getUsuario(idUsuario).subscribe(
      (data) => {
        //
        this.arrayUsuario=data.users;
        for (let dato in this.arrayUsuario){
          this.nombre=this.arrayUsuario[dato].nombre;
          this.tipodocumento=this.arrayUsuario[dato].tipodocumento;
          this.documento=this.arrayUsuario[dato].documento;
          this.direccion=this.arrayUsuario[dato].direccion;
          this.telefono=this.arrayUsuario[dato].telefono;
          this.ciudad=this.arrayUsuario[dato].ciudad;
          this.email=this.arrayUsuario[dato].email;
          this.sexo=this.arrayUsuario[dato].sexo;
        }

        console.log("Actual nombre: "+this.nombre);
        console.log("Actual tipodocumento: "+this.tipodocumento);
        console.log("Actual documento: "+this.documento);
        console.log("Actual direccion: "+this.direccion);
        console.log("Actual telefono: "+this.telefono);
        console.log("Actual ciudad: "+this.ciudad);
        console.log("Actual email: "+this.email);
        console.log("Actual sexo: "+this.sexo);
      },
      (err) => {
        console.log(err); // Manejo de errores
      }
    );
  }

  cargarHobbiesUsuario(idUsuario:any){
    this.resumenempresaService.getHobbies(idUsuario).subscribe(
      (data) => {
        //
        this.arrayHobbies=data.hobbies;
        for (let dato in this.arrayHobbies){
          this.hobby=this.arrayHobbies[dato].hobby;
          console.log("Actual hobby: "+this.hobby);
        }

      },
      (err) => {
        console.log(err); // Manejo de errores
      }
    );
  }

  cargarSuenosUsuario(idUsuario:any){
    this.resumenempresaService.getSuenos(idUsuario).subscribe(
      (data) => {
        //
        this.arraySuenos=data.suenos;
        for (let dato in this.arraySuenos){
          this.sueno=this.arraySuenos[dato].sueno;
          console.log("Actual sueño: "+this.sueno);
        }

      },
      (err) => {
        console.log(err); // Manejo de errores
      }
    );
  }

  fakeRoute(){
    this.router.navigate(['matrizdofa']);
  }

}
