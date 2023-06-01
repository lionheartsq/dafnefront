import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hobbies',
  templateUrl: './hobbies.component.html',
  styleUrls: ['./hobbies.component.css']
})
export class HobbiesComponent {
  hobbies: string | undefined;
  valorImportancia: string | undefined;
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
  checkedCount: number = 0;


  constructor(public router: Router) {
  }

  suenosRoute(){
    this.router.navigate(['suenos']);
  }

  onCheckboxChange(event: any) {
    if (event.target.checked) {
      this.checkedCount++;
    } else {
      this.checkedCount--;
    }
  }

}
