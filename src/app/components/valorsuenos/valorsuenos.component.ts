import { Component, OnInit, ViewChild } from '@angular/core';
import { ElementRef, QueryList, ViewChildren } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service';
import { SuenosService } from 'src/app/services/suenos.service';
import Swal from 'sweetalert2';
import { LoginService } from 'src/app/services/login.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-valorhobbies',
  templateUrl: './valorsuenos.component.html',
  styleUrls: ['./valorsuenos.component.css']
})
export class ValorsuenosComponent implements OnInit {
  idUsuarioCreado: any;
  arrayOpciones: any[] = [];
  selectedValues: { [key: string]: number } = {};

  constructor(public router:Router, private loginService:LoginService, private utilsService:UtilsService, private route: ActivatedRoute, private suenosService: SuenosService) {}


  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.idUsuarioCreado = params['id'];
      //console.log(this.idUsuarioCreado);
      });

    // Cargar hobbies propios del usuario
    this.cargarSuenosPropio(this.idUsuarioCreado);
  }

  cargarSuenosPropio(id: any): void {
    this.suenosService.getSuenosPropio(id).subscribe(
      (data) => {
        console.log("Data Prop:", data);
        if (data.suenos.length > 0) {
          for (const sueno of data.suenos) {
            const idSuenoPropio = sueno.id;
            const suenoPropio = sueno.sueno;
            this.arrayOpciones.push({ idSueno: idSuenoPropio, sueno: suenoPropio });
          }
        }
      },
      (err) => {
        console.log(err); // Manejo de errores
      }
    );
  }

  sendNumberValue(itemId: number, value: number) {
    // Aquí debes realizar la lógica para enviar el valor numérico al endpoint
    // junto con el ID del elemento correspondiente
    console.log('ID:', itemId, 'Valor:', value);
    // Realiza la lógica para enviar los datos al endpoint
    const data = {
      id: itemId,
      value: value
    };
    this.suenosService.enviarValor(data).subscribe(
      () => {
        console.log('Valor enviado correctamente');
      },
      (err) => {
        console.error('Error al enviar el valor:', err);
      }
    );
  }

  validateValues(): void {
    //Pendiente validacion
    Swal.fire({
      icon: 'success',
      title: 'Solicitud enviada',
      text: 'Valores sueños registrados correctamente',
      footer: 'Sueños guardados'
    }).then(() => {
      // Redireccionar a la página deseada
      this.router.navigate(['ideas'], { queryParams: { id: this.idUsuarioCreado} } );
    });
  }

  MoviesLista  = [
    'Blade Runner',
    'Cool Hand Luke',
    'Heat',
    'Juice'
  ];
  //MoviesWatched = ['None'];
  onDrop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  onLista() {
    console.log(this.MoviesLista);
  }
}



