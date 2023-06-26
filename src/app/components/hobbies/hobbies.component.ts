import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service';
import { LoginService } from 'src/app/services/login.service';
import { HobbiesService } from 'src/app/services/hobbies.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hobbies',
  templateUrl: './hobbies.component.html',
  styleUrls: ['./hobbies.component.css']
})
export class HobbiesComponent {
  hobbies: string | undefined;
  valorImportancia: string | undefined;
  otros: boolean=false;
  hobbienuevo: string='';
  checkedCount: number = 0;
  idUsuarioCreado:any;
  arrayOpciones:any=[];
  arrayHobbies:any=[];
  idHobbieGeneral: any;
  idHobbiePropio: any;
  hobbieGeneral: any;
  hobbiePropio: any;
  elementos: any[] = [];

  constructor(public router:Router, private loginService:LoginService, private utilsService:UtilsService, private route: ActivatedRoute, private hobbiesService:HobbiesService) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.idUsuarioCreado = params['id'];
      //console.log(this.idUsuarioCreado);
      });

    this.obtenerHobbiesGeneral();
  }

  obtenerHobbiesGeneral(){
    this.hobbiesService.lecturaHobbiesGeneral().subscribe(
      (data) => {
        //console.log("Data Gen:"+data);
        for (let dato in data.hobbies){
          this.idHobbieGeneral=data.hobbies[dato].id;
          this.hobbieGeneral=data.hobbies[dato].hobby;
          this.arrayOpciones.push({idHobby:this.idHobbieGeneral, hobby: this.hobbieGeneral});
        }
        this.obtenerHobbiesPropios();
      },
      (err) => {
        console.log(err); // Manejo de errores
      }
    );
  }

  obtenerHobbiesPropios(){
    this.hobbiesService.lecturaHobbiesPropio(this.idUsuarioCreado).subscribe(
      (data) => {
        //console.log("Data Prop:"+data);
        if(data.hobbies.length>0){
          for (let dato in data.hobbies){
            this.idHobbiePropio=data.hobbies[dato].id;
            this.hobbiePropio=data.hobbies[dato].hobby;
            this.arrayOpciones.push({idHobby:this.idHobbiePropio, hobby:this.hobbiePropio});
          }
        }
        for (let dato in this.arrayOpciones){
          //console.log("Array Opciones orden: "+dato+ "idHobbie: " + this.arrayOpciones[dato].idHobby+ "hobbie: " + this.arrayOpciones[dato].hobby);
        }
        //console.log("Array Opciones length: "+this.arrayOpciones.length);
      },
      (err) => {
        console.log(err); // Manejo de errores
      }
    );
  }

  onCheckboxChange(event: any) {
    if (event.target.checked) {
      this.checkedCount++;
    } else {
      this.checkedCount--;
    }
  }

  hobbieSave(){
    const varNuevoHobby = {idUsuario:this.idUsuarioCreado, hobby:this.hobbienuevo};
    this.hobbiesService.crearHobbies(varNuevoHobby).subscribe( (data)=>{
      Swal.fire(
        {
          icon: 'success',
          title: 'Solicitud enviada',
          text: 'Nuevo hobbie registrado correctamente',
          footer: data.message
        }
      ).then(() => {
        //this.router.navigateByUrl('hobbies');
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
  }

  hobbiesSave(){
    const varNuevoHobby = {idUsuario:this.idUsuarioCreado, hobby:this.hobbienuevo};
    this.hobbiesService.crearHobbies(varNuevoHobby).subscribe( (data)=>{
      Swal.fire(
        {
          icon: 'success',
          title: 'Solicitud enviada',
          text: 'Nuevo hobbie registrado correctamente',
          footer: data.message
        }
      ).then(() => {
        //this.router.navigateByUrl('hobbies');
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
  }

  agregarElemento(nombre: string) {
    this.elementos.push({ nombre, seleccionado: false });
  }

  validateHobbies() {
    const elementosSeleccionados = this.elementos.filter(elemento => elemento.seleccionado);
    console.log(elementosSeleccionados);
    // Realiza cualquier otra lógica que necesites con los elementos seleccionados
  }

  suenosRoute(){
    this.router.navigate(['suenos']);
  }

}
