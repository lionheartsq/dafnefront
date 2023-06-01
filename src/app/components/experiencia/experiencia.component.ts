import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent {
  nivelEscolaridad: string | undefined;
  areaConocimiento: string | undefined;
  ocupacion: string | undefined;
  campo1: string | undefined;
  campo2: string | undefined;
  campo3: string | undefined;
  campo4: string | undefined;
  campo5: string | undefined;
  campo6: string | undefined;
  NivelEscolar: string | undefined;
  tiempoExperiencia: string | undefined;
  areaExperiencia: string | undefined;
  actividadesDesempenadas: string | undefined;

  constructor(public router: Router) {
  }

  hobbiesRoute(){
    this.router.navigate(['hobbies']);
  }

}

