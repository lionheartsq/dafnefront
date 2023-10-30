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
  arrayOpciones: any[] = [];
  selectedValues: { [key: string]: number } = {};

  //Inicio variables para validar bitacora ***
  //*******************************************//
  idModulo:number=1;
  nombreSeccion:string="valorsuenos";
  identificadorSeccion: string="";
  variableSeccion: string="";
  idUsuarioCargado: any;
  //*******************************************//
  //Fin variables para validar bitacora ***

  constructor(public router:Router, private loginService:LoginService, private utilsService:UtilsService, private route: ActivatedRoute, private suenosService: SuenosService) {}


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
    this.cargarSuenosPropio(this.idUsuarioCargado);
    }else{
      console.log("VAL RUTA: this.router.navigate(["+this.identificadorSeccion+"])");
      this.router.navigate([this.variableSeccion]);//validar lo del usuario
    }
  }
  //*******************************************//
  //Fin funciones nuevas para validar bitacora. ***

  cargarSuenosPropio(id: any): void {
    this.suenosService.getSuenosPropio(id).subscribe(
      (data) => {
        console.log("Data Prop:", data);
        if (data.suenos.length > 0) {
          for (let i =0 ; i < data.suenos.length; i++) {
            const sueno = data.suenos[i];
            const idSuenoPropio = sueno.id;
            const suenoPropio = sueno.sueno;
            this.arrayOpciones.push({ idSueno: idSuenoPropio, sueno: suenoPropio, index: i });
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
    console.log("Nuevo orden de arrayOpciones:", this.arrayOpciones);
    this.arrayOpciones.forEach((item, index) => {
      item.index = index;
      var val= parseInt(item.index)+1;
      this.sendNumberValue(item.idSueno, val);
    });
    //Pendiente validacion
    Swal.fire({
      icon: 'success',
      title: 'Solicitud enviada',
      text: 'Valores sueños registrados correctamente',
      footer: 'Sueños guardados'
    }).then(() => {
        //Inicio Modificacion Bitacora ***
        //*******************************************//
        const bitacora = {avance:1, idSeccion:7, idUsuario:parseInt(this.idUsuarioCargado)};
        this.loginService.crearBitacora(bitacora).subscribe( (data)=>{
          console.log("Bitacora registrada");
          this.router.navigate(['ideas']);
        }, (err) => {
          console.log(err); // Manejo de errores
        });
        //*******************************************//
        //Fin Modificacion Bitacora ***
    });
  }

  onDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      // Actualiza las posiciones de idHobby después de la reorganización
      this.arrayOpciones.forEach((item, index) => {
        item.index = index;
      });
    }

  //Inicio nueva Ruta ***
  //*******************************************//
  homeRoute(){
    this.router.navigate(['home']);
  }
  //*******************************************//
  //Fin nueva Ruta ***
}



