import { Component, ViewChild } from '@angular/core';
import { ElementRef, QueryList, ViewChildren } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service';
import { LoginService } from 'src/app/services/login.service';
import { SuenosService } from 'src/app/services/suenos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-suenos',
  templateUrl: './suenos.component.html',
  styleUrls: ['./suenos.component.css']
})
export class SuenosComponent {

  suenos: string | undefined;
  valorImportancia: string | undefined;
  otros: boolean=false;
  checkedCount: number = 0;
  idUsuarioCreado:any;
  arrayOpciones:any=[];
  arraySuenos:any=[];
  idSuenoGeneral: any;
  idSuenoPropio: any;
  suenoGeneral: any;
  suenoPropio: any;
  elementos: any[] = [];
  @ViewChildren('checkboxes') checkboxesRef!: QueryList<ElementRef>;
  idSueno: any;
  idUsuario: any;
  countSuenos: number=0;

  constructor(public router:Router, private loginService:LoginService, private utilsService:UtilsService, private route: ActivatedRoute, private suenosService:SuenosService) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.idUsuarioCreado = params['id'];
      //console.log(this.idUsuarioCreado);
      });

    this.obtenerSuenosGeneral();
    this.contarSuenosPropio(this.idUsuarioCreado);
  }

  obtenerSuenosGeneral(){
    this.suenosService.lecturaSuenosGeneral().subscribe(
      (data) => {
        //
        console.log("Data Gen:"+data);
        for (let dato in data.suenos){
          this.idSuenoGeneral=data.suenos[dato].id;
          this.suenoGeneral=data.suenos[dato].sueno;
          this.arrayOpciones.push({idSueno:this.idSuenoGeneral, sueno: this.suenoGeneral});
        }
        this.obtenerSuenosPropios();
      },
      (err) => {
        console.log(err); // Manejo de errores
      }
    );
  }

  contarSuenosPropio(id:any){
    this.suenosService.countSuenosPropio(id).subscribe(
      (data) => {
        //console.log("Data Gen:"+data);
        this.countSuenos=data.message;
        //console.log("Data Mess:"+this.countSuenos);
      },
      (err) => {
        console.log(err); // Manejo de errores
      }
    );
  }

  obtenerSuenosPropios(){
    this.suenosService.lecturaSuenosPropio(this.idUsuarioCreado).subscribe(
      (data) => {
        //console.log("Data Prop:"+data);
        if(data.suenos.length>0){
          for (let dato in data.suenos){
            this.idSuenoPropio=data.suenos[dato].id;
            this.suenoPropio=data.suenos[dato].sueno;
            this.arrayOpciones.push({idSueno:this.idSuenoPropio, sueno:this.suenoPropio});
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

  suenoSave(suenonuevo: string){
    const varNuevoSueno = {idUsuario:this.idUsuarioCreado, sueno:suenonuevo};
    if(this.countSuenos<5){
      this.suenosService.crearSuenos(varNuevoSueno).subscribe( (data)=>{
        Swal.fire(
          {
            icon: 'success',
            title: 'Solicitud enviada',
            text: 'Nuevo sueño registrado correctamente',
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
          html: 'Llegaste al máximo de sueños propios creados',
          footer: 'No se ha podido completar el registro'
        }
      )
    }

  }

  agregarElemento(nombre: string) {
    this.elementos.push({ nombre, seleccionado: false });
  }

  validateSuenos() {
    const elementosSeleccionados = this.arrayOpciones
      .filter((elemento: any) => elemento.seleccionado)
      .map((elemento: any) => {
        return { idSueno: elemento.idSueno, sueno: elemento.sueno };
      });
    if(this.checkedCount<6){
      //console.log(elementosSeleccionados);
      for (let dato in elementosSeleccionados){
        this.idSueno=elementosSeleccionados[dato].idSueno;
        this.idUsuario=this.idUsuarioCreado;
        //console.log("ID HOBBY LOOP: "+this.idHobby);
        //console.log("ID USER LOOP: "+this.idUsuario);
        const varUsuario = {idUsuario:this.idUsuario, idSueno:this.idSueno};
        this.suenosService.cerrarRelacionSuenos(varUsuario).subscribe( (data)=>{
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
          text: 'Sueños registrados correctamente',
          footer: 'Sueños guardados'
        }
      ).then(() => {
        this.router.navigate(['valorsuenos'], { queryParams: { id: this.idUsuarioCreado} } );
      });
    } else{
      console.log("Excede la cantidad de sueños");
    }
    // Realiza cualquier otra lógica que necesites con los elementos seleccionados
  }

  ideasRoute(){
    this.router.navigate(['ideas']);
  }

  openPopup() {
    Swal.fire({
      title: 'Ingresa tu sueño personalizado:',
      html:
        '<input type="text" id="suenonuevo" class="swal2-input" placeholder="Nombre del sueño">',
      showCancelButton: true,
      confirmButtonText: 'Guardar Nuevo',
      preConfirm: () => {
        // Obtener el valor del input
        const suenonuevo = (document.getElementById('suenonuevo') as HTMLInputElement).value;
        // Realizar aquí las acciones necesarias con el valor ingresado
        this.suenoSave(suenonuevo);
      }
    })
  }
}
