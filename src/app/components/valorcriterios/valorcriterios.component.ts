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
  criteriosLength: any;

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
          this.criteriosLength=data.criterios.length;
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
    console.log(this.selectedValues);
    var suma = 0;
    var seenValues = new Set<number>(); // Crear un conjunto para registrar los valores
    console.log("Length: "+Object.entries(this.selectedValues).length);
    if(this.criteriosLength===Object.entries(this.selectedValues).length){
      console.log("Criterios llenos");
    }else{
      console.log("Criterios por llenar");
    }
    Object.entries(this.selectedValues).forEach(entry => {
      const [key, value] = entry;
      console.log(key, value);

      if (!seenValues.has(value)) {
        // El valor no se ha visto antes, agregarlo al conjunto
        seenValues.add(value);
        suma += value;

        if(suma>100){
          Swal.fire({
            icon: 'error',
            title: 'Error; porcentaje excedido: '+suma+'%',
            text: 'La suma de porcentajes no puede exceder el 100%',
            footer: 'Corregir valores'
          }).then(() => {
            // Actualiza el valor repetido en this.selectedValues
            this.selectedValues[key] = 0;
          });
        }

      } else {
        // El valor se repite, manejar esto aquí
        console.log(`Valor repetido: ${value}`);
        const repeatedValue = value; // Almacena el valor repetido en una variable temporal

        Swal.fire({
          icon: 'error',
          title: 'Error; dato repetido: '+repeatedValue,
          text: 'Los valores no deben repetirse',
          footer: 'Corregir valores'
        }).then(() => {
          // Actualiza el valor repetido en this.selectedValues
          this.selectedValues[key] = 0;
        });
        // Si deseas hacer más acciones con repeatedValue aquí, puedes hacerlo
      }
    });

    console.log(`Suma de valores no repetidos: ${suma}`);
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

    console.log(this.selectedValues);
    var suma=0;
    var flagCeros=0;
    Object.entries(this.selectedValues).forEach(entry => {
      const [key, value] = entry;
      console.log(key, value);
      suma=suma+value;
      if(value==0){
        flagCeros=1;
      }
    });
    if (suma==100 && flagCeros==0) {
      Swal.fire({
        icon: 'success',
        title: 'Solicitud enviada',
        text: 'Valores Criterios registrados correctamente',
        footer: 'Criterios guardados'
      }).then(() => {
        // Redireccionar a la página deseada
        //
        this.router.navigate(['evaluacion'], { queryParams: { id: this.idUsuarioCreado, idC: 0} } );
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error datos incorrectos',
        text: 'La suma de porcentajes no debe exceder ni ser menor del 100%; ningún valor puede ser cero.',
        footer: 'Verifique las condiciones para guardar los valores'
      }).then(() => {
        // Redireccionar a la página deseada
        //

      });
    }

  }


}
