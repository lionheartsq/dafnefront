import { Component } from '@angular/core';

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
}
