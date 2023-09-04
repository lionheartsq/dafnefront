import { Component, OnInit, ViewChild } from '@angular/core';
import { ElementRef, QueryList, ViewChildren } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service';
import { CriteriosService } from 'src/app/services/criterios.service';
import Swal from 'sweetalert2';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-valorcriterios',
  templateUrl: './valorcriterios.component.html',
  styleUrls: ['./valorcriterios.component.css']
})
export class ValorcriteriosComponent implements OnInit {
  idUsuarioCreado: any;
  arrayOpciones: any[] = [];
  selectedValues: { [key: string]: number } = {};

  constructor(public router:Router, private loginService:LoginService, private utilsService:UtilsService, private route: ActivatedRoute, private criteriosService: CriteriosService) {}


  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.idUsuarioCreado = params['id'];
      //console.log(this.idUsuarioCreado);
      });

    // Cargar hobbies propios del usuario
    this.cargarCriteriosPropio(this.idUsuarioCreado);
  }

  cargarCriteriosPropio(id: any): void {
    this.criteriosService.getCriteriosPropio(id).subscribe(
      (data) => {
        console.log("Data Prop:", data);
        if (data.criterios.length > 0) {
          for (const criterio of data.criterios) {
            const idCriterioPropio = criterio.id;
            const criterioPropio = criterio.criterio;
            this.arrayOpciones.push({ idCriterio: idCriterioPropio, criterio: criterioPropio });
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
    this.criteriosService.enviarValor(data).subscribe(
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
      text: 'Valores Criterios registrados correctamente',
      footer: 'Criterios guardados'
    }).then(() => {
      // Redireccionar a la página deseada
      //
      this.router.navigate(['evaluacion'], { queryParams: { id: this.idUsuarioCreado} } );
    });
  }

  
}
