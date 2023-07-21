import { Component, ViewChild } from '@angular/core';
import { ElementRef, QueryList, ViewChildren } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service';
import { LoginService } from 'src/app/services/login.service';
import { CriteriosService } from 'src/app/services/criterios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-criterios',
  templateUrl: './criterios.component.html',
  styleUrls: ['./criterios.component.css']
})
export class CriteriosComponent {
  criterios: string | undefined;
  valorImportancia: string | undefined;
  otros: boolean=false;
  suenonuevo: string='';
  checkedCount: number = 0;
  idUsuarioCreado:any;
  arrayOpciones:any=[];
  arrayCriterios:any=[];
  idCriterioGeneral: any;
  idCriterioPropio: any;
  criterioGeneral: any;
  criterioPropio: any;
  elementos: any[] = [];
  @ViewChildren('checkboxes') checkboxesRef!: QueryList<ElementRef>;
  idCriterio: any;
  idUsuario: any;
  countCriterios: number=0;
  criterionuevo: any;

  constructor(public router:Router, private loginService:LoginService, private utilsService:UtilsService, private route: ActivatedRoute, private criteriosService:CriteriosService) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.idUsuarioCreado = params['id'];
      //console.log(this.idUsuarioCreado);
      });

    //this.llamarAPI();
    this.obtenerCriteriosGeneral();
    this.contarCriteriosPropio(this.idUsuarioCreado);
  }

  obtenerCriteriosGeneral(){
    this.criteriosService.lecturaCriteriosGeneral().subscribe(
      (data) => {
        //
        console.log("Data Gen:"+data);
        for (let dato in data.criterios){
          this.idCriterioGeneral=data.criterios[dato].id;
          this.criterioGeneral=data.criterios[dato].criterio;
          this.arrayOpciones.push({idCriterio:this.idCriterioGeneral, criterio: this.criterioGeneral});
        }
        this.obtenerCriteriosPropios();
      },
      (err) => {
        console.log(err); // Manejo de errores
      }
    );
  }

  contarCriteriosPropio(id:any){
    this.criteriosService.countCriteriosPropio(id).subscribe(
      (data) => {
        //console.log("Data Gen:"+data);
        this.countCriterios=data.message;
        //console.log("Data Mess:"+this.countSuenos);
      },
      (err) => {
        console.log(err); // Manejo de errores
      }
    );
  }

  obtenerCriteriosPropios(){
    this.criteriosService.lecturaCriteriosPropio(this.idUsuarioCreado).subscribe(
      (data) => {
        //console.log("Data Prop:"+data);
        if(data.criterios.length>0){
          for (let dato in data.criterios){
            this.idCriterioPropio=data.criterios[dato].id;
            this.criterioPropio=data.criterios[dato].criterio;
            this.arrayOpciones.push({idCriterio:this.idCriterioPropio, criterio:this.criterioPropio});
          }
        }
        for (let dato in this.arrayOpciones){
          //console.log("Array Opciones orden: "+dato+ "idSuenos: " + this.arrayOpciones[dato].idSuenos+ "hobbie: " + this.arrayOpciones[dato].suenos);
        }
        //console.log("Array Opciones length: "+this.arrayOpciones.length);
      },
      (err) => {
        console.log(err); // Manejo de errores
      }
    );
  }

  onCheckboxChange(event: any, elemento: any) {
    elemento.seleccionado = event.target.checked;
    this.checkedCount = this.arrayOpciones.filter((e: any) => e.seleccionado).length;
  }

  criterioSave(){
    const varNuevoCriterio = {idUsuario:this.idUsuarioCreado, criterio:this.criterionuevo};
    if(this.countCriterios<4){
      this.criteriosService.crearCriterios(varNuevoCriterio).subscribe( (data)=>{
        Swal.fire(
          {
            icon: 'success',
            title: 'Solicitud enviada',
            text: 'Nueva criterio registrada correctamente',
            footer: data.message
          }
        ).then(() => {
          //this.router.navigateByUrl('suenos');
          //
          window.location.reload();
        });
      }, (err) => {
        //debugger
        Swal.fire(
          {
            icon: 'error',
            title: 'Error al crear',
            html: 'Por favor verifique los datos e intente nuevamente',
            footer: 'No se ha podido completar el registro'
          }
        )
      });
    }else{
      Swal.fire(
        {
          icon: 'error',
          title: 'Error al crear',
          html: 'Llegaste al máximo de criterios propias creados',
          footer: 'No se ha podido completar el registro'
        }
      )
    }
  }

  agregarElemento(nombre: string) {
    this.elementos.push({ nombre, seleccionado: false });
  }

  validateCriterios() {
    const elementosSeleccionados = this.arrayOpciones
      .filter((elemento: any) => elemento.seleccionado)
      .map((elemento: any) => {
        return { idCriterio: elemento.idCriterio, criterio: elemento.criterio };
      });
    if(this.checkedCount<6){
      //console.log(elementosSeleccionados);
      for (let dato in elementosSeleccionados){
        this.idCriterio=elementosSeleccionados[dato].idCriterio;
        this.idUsuario=this.idUsuarioCreado;
        //
        console.log("ID HOBBY LOOP: "+this.idCriterio);
        //
        console.log("ID USER LOOP: "+this.idUsuario);
        const varUsuario = {idUsuario:this.idUsuario, idCriterio:this.idCriterio};
        this.criteriosService.cerrarRelacionCriterios(varUsuario).subscribe( (data)=>{
          console.log("Ok");
        }, (err) => {
          //debugger
          console.log("Error");
        });
      }
      Swal.fire(
        {
          icon: 'success',
          title: 'Solicitud enviada',
          text: 'Criterios registrados correctamente',
          footer: 'Criterios guardados'
        }
      ).then(() => {
        this.router.navigate(['valorcriterios'], { queryParams: { id: this.idUsuarioCreado} } );
      });
    } else{
      console.log("Excede la cantidad de criterios");
    }
    // Realiza cualquier otra lógica que necesites con los elementos seleccionados
  }

  evaluacionRoute(){
    this.router.navigate(['evaluacion']);
  }

}
