import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ApigptService } from 'src/app/services/apigpt.service';

@Component({
  selector: 'app-ideas',
  templateUrl: './ideas.component.html',
  styleUrls: ['./ideas.component.css']
})
export class IdeasComponent {

  opcion1: string | undefined;
  opcion2: string | undefined;
  opcion3: string | undefined;
  opcion4: string | undefined;
  opcion5: string | undefined;
  opcion6: string | undefined;
  opcion7: string | undefined;
  opcion8: string | undefined;
  opcion9: string | undefined;
  opcion10: string | undefined;
  opcion11: string | undefined;
  opcion12: string | undefined;
  opcion13: string | undefined;
  opcion14: string | undefined;
  opcion15: string | undefined;
  checkedCount: number = 0;
  idUsuarioCreado: any;

  constructor(public router: Router, private route: ActivatedRoute, private apigptService:ApigptService) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.idUsuarioCreado = params['id'];
      //console.log(this.idUsuarioCreado);
      });

    this.llamarAPI();
    //this.contarSuenosPropio(this.idUsuarioCreado);
  }

  onCheckboxChange(event: any) {
    if (event.target.checked) {
      this.checkedCount++;
    } else {
      this.checkedCount--;
    }
  }

  evaluacionRoute(){
    this.router.navigate(['evaluacion']);
  }

  public llamarAPI(): void {
    this.apigptService.sendChatRequest().subscribe(
      (response) => {
        console.log(response); // Maneja la respuesta de la API aquí
      },
      (error) => {
        console.error(error); // Maneja los errores aquí
      }
    );
  }

}


