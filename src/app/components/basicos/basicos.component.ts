import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styleUrls: ['./basicos.component.css']
})
export class BasicosComponent {
  nombre: string | undefined;
  tipoDocumento: string| undefined;
  numeroDocumento: string| undefined;
  correo: string| undefined;
  telefono: string| undefined;
  direccion: string| undefined;
  ciudad: string| undefined;
  sexo: string| undefined;

  constructor(public router: Router) {
  }

  experienciaRoute(){
    this.router.navigate(['experiencia']);
  }

}

