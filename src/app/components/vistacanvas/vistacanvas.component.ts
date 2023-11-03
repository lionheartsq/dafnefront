import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DofaService } from 'src/app/services/dofa.service';
import { LoginService } from 'src/app/services/login.service';
import { UtilsService } from 'src/app/services/utils.service';
import { CanvasService } from '../../services/canvas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vistacanvas',
  templateUrl: './vistacanvas.component.html',
  styleUrls: ['./vistacanvas.component.css']
})
export class VistacanvasComponent {
  editingSection: string | null = null;
  sectionData: { [key: string]: string } = {
    section1: '',
    section2: '',
    section3: '',
    section4: '',
  };

//Inicio variables para validar bitacora ***
//*******************************************//
idModulo:number=1;
nombreSeccion:string="modelocanvas";
identificadorSeccion: string="";
variableSeccion: string="";
idUsuarioCargado: any;
arrayEmpresa: any;
idEmpresa: any;
proposicion: string="";
segmento: string="";
relaciones: string="";
canales: string="";
actividades: string="";
recursos: string="";
aliados: string="";
flujos: string="";
estructura: string="";
avancepro: number=0;
avanceseg: number=0;
avancerel: number=0;
avancecan: number=0;
avanceact: number=0;
avancerec: number=0;
avanceali: number=0;
avanceflu: number=0;
avanceest: number=0;
avancestring: string="";
colorpro: string="";
colorseg: string="";
colorrel: string="";
colorcan: string="";
coloract: string="";
colorrec: string="";
colorali: string="";
colorflu: string="";
colorest: string="";
//*******************************************//
//Fin variables para validar bitacora ***

constructor(public router:Router, private loginService:LoginService, private utilsService:UtilsService, private route: ActivatedRoute, private canvasService:CanvasService) {}

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
    this.cargarDatosCanvas(this.idUsuarioCargado);
  }else{
    console.log("VAL RUTA: this.router.navigate(["+this.identificadorSeccion+"])");
    this.router.navigate([this.variableSeccion]);//validar lo del usuario
  }
}
//*******************************************//
//Fin funciones nuevas para validar bitacora. ***

cargarDatosCanvas(idUsuario:any){
  this.canvasService.lecturaCanvasPropio(idUsuario).subscribe(
    (data) => {
      //
      console.log("VAR DATA: "+JSON.stringify(data));
      this.arrayEmpresa=data.modelo_canvas;
      for (let dato in this.arrayEmpresa){
        this.idEmpresa=this.arrayEmpresa[dato].id;
        this.proposicion=this.arrayEmpresa[dato].proposicion;
        this.segmento=this.arrayEmpresa[dato].segmento;
        this.relaciones=this.arrayEmpresa[dato].relaciones;
        this.canales=this.arrayEmpresa[dato].canales;
        this.actividades=this.arrayEmpresa[dato].actividades;
        this.recursos=this.arrayEmpresa[dato].recursos;
        this.aliados=this.arrayEmpresa[dato].aliados;
        this.flujos=this.arrayEmpresa[dato].flujos;
        this.estructura=this.arrayEmpresa[dato].estructura;
        this.avancepro=this.arrayEmpresa[dato].avancepro;
        this.avanceseg=this.arrayEmpresa[dato].avanceseg;
        this.avancerel=this.arrayEmpresa[dato].avancerel;
        this.avancecan=this.arrayEmpresa[dato].avancecan;
        this.avanceact=this.arrayEmpresa[dato].avanceact;
        this.avancerec=this.arrayEmpresa[dato].avancerec;
        this.avanceali=this.arrayEmpresa[dato].avanceali;
        this.avanceflu=this.arrayEmpresa[dato].avanceflu;
        this.avanceest=this.arrayEmpresa[dato].avanceest;
      }

      if(this.avancepro>0){
        this.colorpro="#F9D65D";
      }
      if(this.avanceseg>0){
        this.colorseg="#F9D65D";
      }
      if(this.avancerel>0){
        this.colorrel="#F9D65D";
      }
      if(this.avancecan>0){
        this.colorcan="#F9D65D";
      }
      if(this.avanceact>0){
        this.coloract="#F9D65D";
      }
      if(this.avancerec>0){
        this.colorrec="#F9D65D";
      }
      if(this.avanceali>0){
        this.colorali="#F9D65D";
      }
      if(this.avanceflu>0){
        this.colorflu="#F9D65D";
      }
      if(this.avanceest>0){
        this.colorest="#F9D65D";
      }

    },
    (err) => {
      console.log(err); // Manejo de errores
    }
  );
}

openEditor(section: string) {
  this.editingSection = section;
  switch (this.editingSection) {
    case '1. Proposicion de valor':
      this.avancestring=this.proposicion;
      console.log("Entra por prop: "+this.avancestring+" prop: "+this.proposicion);
      break;
    case '2. Segmento de clientes':
      this.avancestring=this.segmento;
      break;
    case '3. Relaciones con el cliente':
      this.avancestring=this.relaciones;
      break;
    case '4. Canales':
      this.avancestring=this.canales;
      break;
    case '5. Actividades claves':
      this.avancestring=this.actividades;
      break;
    case '6. Recursos claves':
      this.avancestring=this.recursos;
      break;
      case '7. Aliados y personas claves':
        this.avancestring=this.aliados;
      break;
    case '8. Flujos de ingresos':
      this.avancestring=this.flujos;
      break;
    case '9. Estructura de costos':
      this.avancestring=this.estructura;
      break;
    // Agrega más casos según tus necesidades
  }
  this.sectionData[this.editingSection]=this.avancestring;
}

closeEditor() {
  let identificador = '';

  if (this.editingSection !== null) {
  let editedText = this.sectionData[this.editingSection];
  console.log("VALOR DE EDITEDTEXT: "+editedText);

    if(editedText !== null && editedText !== undefined && editedText !== ""){
      console.log(`Contenido editado de ${this.editingSection}: ${editedText}`);

        switch (this.editingSection) {
          case '1. Proposicion de valor':
            identificador = 'proposicion';
            this.proposicion=editedText;
            this.avancepro=1;
            break;
          case '2. Segmento de clientes':
            identificador = 'segmento';
            this.segmento=editedText;
            this.avanceseg=1;
            break;
          case '3. Relaciones con el cliente':
            identificador = 'relaciones';
            this.relaciones=editedText;
            this.avancerel=1;
            break;
          case '4. Canales':
            identificador = 'canales';
            this.canales=editedText;
            this.avancecan=1;
            break;
          case '5. Actividades claves':
            identificador = 'actividades';
            this.actividades=editedText;
            this.avanceact=1;
            break;
          case '6. Recursos claves':
            identificador = 'recursos';
            this.recursos=editedText;
            this.avancerec=1;
            break;
            case '7. Aliados y personas claves':
            identificador = 'aliados';
            this.aliados=editedText;
            this.avanceali=1;
            break;
          case '8. Flujos de ingresos':
            identificador = 'flujos';
            this.flujos=editedText;
            this.avanceflu=1;
            break;
          case '9. Estructura de costos':
            identificador = 'estructura';
            this.estructura=editedText;
            this.avanceest=1;
            break;
          // Agrega más casos según tus necesidades
        }

        this.uploadCanvas();

    }else{
      console.log("Contenido vacio");
      // Aquí puedes realizar cualquier acción adicional con identificador y editedText
    }

  }

  this.editingSection = null; // Cerrar el editor
}

uploadCanvas() {
  const varNuevaEmpresa = {id:this.idEmpresa, idUsuario:this.idUsuarioCargado, proposicion:this.proposicion, segmento:this.segmento, relaciones:this.relaciones, canales:this.canales, actividades:this.actividades, recursos:this.recursos,
  aliados:this.aliados, flujos:this.flujos, estructura:this.estructura, avancepro:this.avancepro, avanceseg:this.avanceseg, avancerel:this.avancerel, avancecan:this.avancecan, avanceact:this.avanceact, avancerec:this.avancerec,
  avanceali:this.avanceali, avanceflu:this.avanceflu, avanceest:this.avanceest};
  console.log("Var canvas: "+JSON.stringify(varNuevaEmpresa));

  this.canvasService.enviarValor(varNuevaEmpresa).subscribe( (data)=>{
    Swal.fire(
      {
        icon: 'success',
        title: 'Solicitud enviada',
        text: 'Datos canvas cargados correctamente',
        footer: data.message
      }
    ).then(() => {
      //this.router.navigate(['resumen'], { queryParams: { id: this.idUsuarioCargado} } );
      //
      window.location.reload();
    });
  }, (err) => {
    //debugger
    Swal.fire(
      {
        icon: 'error',
        title: 'Error al cargar',
        html: 'Por favor verifique los datos e intente nuevamente',
        footer: 'No se ha podido completar el registro'
      }
    )
  });
}

cancelEditor() {
  this.editingSection = null;
}

loginFake(){
  this.router.navigate(['home']);
}

canvasRoute(){
  this.router.navigate(['modelocanvas']);
}
}
