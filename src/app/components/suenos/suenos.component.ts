import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-suenos',
  templateUrl: './suenos.component.html',
  styleUrls: ['./suenos.component.css']
})
export class SuenosComponent {

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

  checkboxOptions = ['Opción 1', 'Opción 2', 'Opción 3', 'Opción 4', 'Opción 5', 'Opción 6', 'Opción 7', 'Opción 8', 'Opción 9', 'Opción 10', 'Opción 11'];

  textInputs = [
    { label: 'Campo 1', placeholder: 'Ingrese el valor' },
    { label: 'Campo 2', placeholder: 'Ingrese el valor' },
    { label: 'Campo 3', placeholder: 'Ingrese el valor' },
    { label: 'Campo 4', placeholder: 'Ingrese el valor' },
    { label: 'Campo 5', placeholder: 'Ingrese el valor' }
  ];

  constructor(public router: Router) {
  }

  ideasRoute(){
    this.router.navigate(['ideas']);
  }

  onCheckboxChange(event: any) {
    if (event.target.checked) {
      this.checkedCount++;
    } else {
      this.checkedCount--;
    }
  }


}
