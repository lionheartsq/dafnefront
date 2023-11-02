import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modelocanvas',
  templateUrl: './modelocanvas.component.html',
  styleUrls: ['./modelocanvas.component.css']
})
export class ModelocanvasComponent {
  editingSection: string | null = null;
  sectionData: { [key: string]: string } = {
    section1: '',
    section2: '',
    section3: '',
    section4: '',
  };

  openEditor(section: string) {
    this.editingSection = section;
  }

  closeEditor() {
    let identificador = '';

    if (this.editingSection !== null) {
    let editedText = this.sectionData[this.editingSection];

    switch (this.editingSection) {
      case '1. Proposicion de valor':
        identificador = 'proposicion';
        break;
      case '2. Segmento de clientes':
        identificador = 'segmento';
        break;
      // Agrega más casos según tus necesidades
    }

    if(editedText !== null || editedText !== undefined){
      console.log(`Identificador: ${identificador}, Contenido editado de ${this.editingSection}: ${editedText}`);
    }else{
      editedText="";
          console.log(`Identificador: ${identificador}, Contenido editado de ${this.editingSection}: ${editedText}`);
      // Aquí puedes realizar cualquier acción adicional con identificador y editedText
    }
    }

    this.editingSection = null; // Cerrar el editor
  }

  cancelEditor() {
    this.editingSection = null;
  }

  constructor(public router: Router) {
  }

  loginFake(){
    this.router.navigate(['home']);
  }

  canvasRoute(){
    this.router.navigate(['home']);
  }
}
