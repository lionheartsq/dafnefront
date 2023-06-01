import { Component } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(public router: Router) {
  }

  evaluacionRoute(){
    this.router.navigate(['evaluacion']);
  }
  onCheckboxChange(event: any) {
    if (event.target.checked) {
      this.checkedCount++;
    } else {
      this.checkedCount--;
    }
  }

}


