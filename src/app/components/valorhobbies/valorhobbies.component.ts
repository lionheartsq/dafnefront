import { Component, OnInit, ViewChild } from '@angular/core';
import { ElementRef, QueryList, ViewChildren } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service';
import { HobbiesService } from 'src/app/services/hobbies.service';
import Swal from 'sweetalert2';
import { LoginService } from 'src/app/services/login.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-valorhobbies',
  templateUrl: './valorhobbies.component.html',
  styleUrls: ['./valorhobbies.component.css']
})
export class ValorhobbiesComponent implements OnInit {
  idUsuarioCreado: any;
  arrayOpciones: any[] = [];
  selectedValues: { [key: string]: number } = {};

  constructor(public router:Router, private loginService:LoginService, private utilsService:UtilsService, private route: ActivatedRoute, private hobbiesService: HobbiesService) {}


  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.idUsuarioCreado = params['id'];
      //console.log(this.idUsuarioCreado);
      });

    // Cargar hobbies propios del usuario
    this.cargarHobbiesPropio(this.idUsuarioCreado);
  }

  cargarHobbiesPropio(id: any): void {
    this.hobbiesService.getHobbiesPropio(id).subscribe(
      (data) => {
        console.log("Data Prop:", data);
        if (data.hobbies.length > 0) {
          for (const hobbie of data.hobbies) {
            const idHobbiePropio = hobbie.id;
            const hobbiePropio = hobbie.hobby;
            this.arrayOpciones.push({ idHobby: idHobbiePropio, hobby: hobbiePropio });
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
    this.hobbiesService.enviarValor(data).subscribe(
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
      text: 'Valores Hobbies registrados correctamente',
      footer: 'Hobbies guardados'
    }).then(() => {
      // Redireccionar a la página deseada
      //
      this.router.navigate(['suenos'], { queryParams: { id: this.idUsuarioCreado} } );
    });
  }

  //MoviesWatched = ['None'];
  onDrop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      console.log("Misma posicion data: "+event.container.data);
      console.log("Misma posicion prevIndex: "+event.previousIndex);
      console.log("Misma posicion currIndex: "+event.currentIndex);     
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      console.log("Diferente posicion data: "+event.container.data);
      console.log("Diferente posicion prevIndex: "+event.previousIndex);
      console.log("Diferente posicion currIndex: "+event.currentIndex);
    }
  }

}
