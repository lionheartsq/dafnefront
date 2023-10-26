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
    this.editingSection = null;
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
