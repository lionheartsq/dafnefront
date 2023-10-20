import { Component, ViewChild } from '@angular/core';
import { ElementRef, QueryList, ViewChildren } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service';
import { LoginService } from 'src/app/services/login.service';
import { FormsModule } from '@angular/forms';
import { DofaService } from 'src/app/services/dofa.service';
import Swal from 'sweetalert2';
import { isEmpty } from 'rxjs';

@Component({
  selector: 'app-oportunidades',
  templateUrl: './oportunidades.component.html',
  styleUrls: ['./oportunidades.component.css']
})
export class OportunidadesComponent {
  idUsuarioCreado: any;
  arrayDofa: any;
  idDofa: any;
  debilidades1: String="";
  debilidades2: String="";
  debilidades3: String="";
  debilidades4: String="";
  oportunidades1: String="";
  oportunidades2: String="";
  oportunidades3: String="";
  oportunidades4: String="";
  fortalezas1: String="";
  fortalezas2: String="";
  fortalezas3: String="";
  fortalezas4: String="";
  amenazas1: String="";
  amenazas2: String="";
  amenazas3: String="";
  amenazas4: String="";
  avanced: number=0;
  avanceo: number=0;
  avancef: number=0;
  avancea: number=0;
  flag: number=0;

  constructor(public router:Router, private loginService:LoginService, private utilsService:UtilsService, private route: ActivatedRoute, private dofaService:DofaService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.idUsuarioCreado = params['id'];
      //console.log(this.idUsuarioCreado);

      this.cargarDatosDofa(this.idUsuarioCreado);
      });
  }

  cargarDatosDofa(idUsuario:any){
    this.dofaService.lecturaDofaPropio(idUsuario).subscribe(
      (data) => {
        //
        this.arrayDofa=data.matriz_dofa;
        for (let dato in this.arrayDofa){
          this.idDofa=this.arrayDofa[dato].id;
          this.debilidades1=this.arrayDofa[dato].debilidades1;
          this.oportunidades1=this.arrayDofa[dato].oportunidades1;
          this.fortalezas1=this.arrayDofa[dato].fortalezas1;
          this.amenazas1=this.arrayDofa[dato].amenazas1;
          this.debilidades2=this.arrayDofa[dato].debilidades2;
          this.oportunidades2=this.arrayDofa[dato].oportunidades2;
          this.fortalezas2=this.arrayDofa[dato].fortalezas2;
          this.amenazas2=this.arrayDofa[dato].amenazas2;
          this.debilidades3=this.arrayDofa[dato].debilidades3;
          this.oportunidades3=this.arrayDofa[dato].oportunidades3;
          this.fortalezas3=this.arrayDofa[dato].fortalezas3;
          this.amenazas3=this.arrayDofa[dato].amenazas3;
          this.debilidades4=this.arrayDofa[dato].debilidades4;
          this.oportunidades4=this.arrayDofa[dato].oportunidades4;
          this.fortalezas4=this.arrayDofa[dato].fortalezas4;
          this.amenazas4=this.arrayDofa[dato].amenazas4;
          this.avanced=this.arrayDofa[dato].avanced;
          this.avanceo=this.arrayDofa[dato].avanceo;
          this.avancef=this.arrayDofa[dato].avancef;
          this.avancea=this.arrayDofa[dato].avancea;
        }
        //console.log("Actual idEmpresa: "+this.idEmpresa);
      },
      (err) => {
        console.log(err); // Manejo de errores
      }
    );
  }

  terminarRoute(){

    if(this.oportunidades1 !== null && this.oportunidades1 !== ""){
      this.flag = parseInt(this.flag.toString(), 10) + 1;
    }
    if(this.oportunidades2 !== null && this.oportunidades2 !== ""){
      this.flag = parseInt(this.flag.toString(), 10) + 1;
    }
    if(this.oportunidades3 !== null && this.oportunidades3 !== ""){
      this.flag = parseInt(this.flag.toString(), 10) + 1;
    }
    if(this.oportunidades4 !== null && this.oportunidades4 !== ""){
      this.flag = parseInt(this.flag.toString(), 10) + 1;
    }

    if ( this.flag < 3) {

      Swal.fire(
        {
          icon: 'error',
          title: 'Error al crear',
          html: 'Por favor introduzca al menos 3 oportunidades e intente nuevamente',
          footer: 'No se ha podido completar el registro'
        }
      ).then(() => {
        this.flag=0;
      });
    } else {
      this.flag=1;
      this.avanced=2;
      const varMensaje = {id:this.idDofa, idUsuario:this.idUsuarioCreado, debilidades1:this.debilidades1, debilidades2:this.debilidades2, debilidades3:this.debilidades3, debilidades4:this.debilidades4,
        oportunidades1:this.oportunidades1, oportunidades2:this.oportunidades2, oportunidades3:this.oportunidades3, oportunidades4:this.oportunidades4, fortalezas1:this.fortalezas1, fortalezas2:this.fortalezas2, fortalezas3:this.fortalezas3, fortalezas4:this.fortalezas4,
        amenazas1:this.amenazas1, amenazas2:this.amenazas2, amenazas3:this.amenazas3, amenazas4:this.amenazas4, avanced:this.avanced, avanceo:this.avanceo, avancef:this.avancef, avancea:this.avancea};
      console.log("Var dofa: "+varMensaje);

      this.dofaService.enviarValor(varMensaje).subscribe((data)=>{
        Swal.fire(
          {
            icon: 'success',
            title: 'Solicitud enviada',
            text: 'Opportunidades empresa cargadas correctamente',
            footer: data.message
          }
        ).then(() => {
          this.router.navigate(['matrizdofa'], { queryParams: { id: this.idUsuarioCreado} } );
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

    console.log("Valor flag: "+this.flag);
  }

  continuarRoute(){

    if(this.oportunidades1 !== null && this.oportunidades1 !== ""){
      this.flag = parseInt(this.flag.toString(), 10) + 1;
    }
    if(this.oportunidades2 !== null && this.oportunidades2 !== ""){
      this.flag = parseInt(this.flag.toString(), 10) + 1;
    }
    if(this.oportunidades3 !== null && this.oportunidades3 !== ""){
      this.flag = parseInt(this.flag.toString(), 10) + 1;
    }
    if(this.oportunidades4 !== null && this.oportunidades4 !== ""){
      this.flag = parseInt(this.flag.toString(), 10) + 1;
    }

    if ( this.flag < 3) {

      Swal.fire(
        {
          icon: 'error',
          title: 'Error al crear',
          html: 'Por favor introduzca al menos 3 oportunidades e intente nuevamente',
          footer: 'No se ha podido completar el registro'
        }
      ).then(() => {
        this.flag=0;
      });
    } else {
      this.flag=1;
      this.avanced=1;
      const varMensaje = {id:this.idDofa, idUsuario:this.idUsuarioCreado, debilidades1:this.debilidades1, debilidades2:this.debilidades2, debilidades3:this.debilidades3, debilidades4:this.debilidades4,
        oportunidades1:this.oportunidades1, oportunidades2:this.oportunidades2, oportunidades3:this.oportunidades3, oportunidades4:this.oportunidades4, fortalezas1:this.fortalezas1, fortalezas2:this.fortalezas2, fortalezas3:this.fortalezas3, fortalezas4:this.fortalezas4,
        amenazas1:this.amenazas1, amenazas2:this.amenazas2, amenazas3:this.amenazas3, amenazas4:this.amenazas4, avanced:this.avanced, avanceo:this.avanceo, avancef:this.avancef, avancea:this.avancea};
        console.log("Var dofa: " + JSON.stringify(varMensaje, null, 2));

      this.dofaService.enviarValor(varMensaje).subscribe((data)=>{
        Swal.fire(
          {
            icon: 'success',
            title: 'Solicitud enviada',
            text: 'Oportunidades empresa cargadas correctamente',
            footer: data.message
          }
        ).then(() => {
          //window.location.reload();
          this.router.navigate(['matrizdofa'], { queryParams: { id: this.idUsuarioCreado} } );
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

    console.log("Valor flag: "+this.flag);
  }
}
