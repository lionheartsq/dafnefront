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
  arrayOpciones: any[] = [];
  selectedValues: { [key: string]: number } = {};
  criteriosLength: any;

  //Inicio variables para validar bitacora ***
  //*******************************************//
  idModulo:number=1;
  nombreSeccion:string="valorcriterios";
  identificadorSeccion: string="";
  variableSeccion: string="";
  idUsuarioCargado: any;
  //*******************************************//
  //Fin variables para validar bitacora ***

  constructor(public router:Router, private loginService:LoginService, private utilsService:UtilsService, private route: ActivatedRoute, private criteriosService: CriteriosService) {}


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
      // Cargar hobbies propios del usuario
      this.cargarCriteriosPropio(this.idUsuarioCargado);
    }else{
      console.log("VAL RUTA: this.router.navigate(["+this.identificadorSeccion+"])");
      this.router.navigate([this.variableSeccion]);//validar lo del usuario
    }
  }
  //*******************************************//
  //Fin funciones nuevas para validar bitacora. ***

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
        //Inicio Modificacion Bitacora ***
        //*******************************************//
        const bitacora = {avance:1, idSeccion:10, idUsuario:parseInt(this.idUsuarioCargado)};
        this.loginService.crearBitacora(bitacora).subscribe( (data)=>{
          console.log("Bitacora registrada");
          this.router.navigate(['evaluacion'], { queryParams: { idC: 0} } );
        }, (err) => {
          console.log(err); // Manejo de errores
        });
        //*******************************************//
        //Fin Modificacion Bitacora ***
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
//Inicio nueva Ruta ***
  //*******************************************//
  homeRoute(){
    this.router.navigate(['home']);
  }
  //*******************************************//
  //Fin nueva Ruta ***
}
