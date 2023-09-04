import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { DragDropModule } from '@angular/cdk/drag-drop';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BreakpointObserver, Breakpoints, LayoutModule } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';


import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeEs, 'es');

import { AuthInterceptor } from './interceptors/auth.interceptor';
import { SessionInterceptor } from './interceptors/session.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BasicosComponent } from './components/basicos/basicos.component';
import { ExperienciaComponent } from './components/experiencia/experiencia.component';
import { HobbiesComponent } from './components/hobbies/hobbies.component';
import { SuenosComponent } from './components/suenos/suenos.component';
import { IdeasComponent } from './components/ideas/ideas.component';
import { EvaluacionComponent } from './components/evaluacion/evaluacion.component';
import { SeleccionComponent } from './components/seleccion/seleccion.component';
import { ResumenComponent } from './components/resumen/resumen.component';
import { ValorhobbiesComponent } from './components/valorhobbies/valorhobbies.component';
import { ValorsuenosComponent } from './components/valorsuenos/valorsuenos.component';
import { CriteriosComponent } from './components/criterios/criterios.component';
import { ValorcriteriosComponent } from './components/valorcriterios/valorcriterios.component';
import { MatrizComponent } from './components/matriz/matriz.component';
import { AmenazasComponent } from './components/amenazas/amenazas.component';
import { MatrizdofaComponent } from './components/matrizdofa/matrizdofa.component';
import { DebilidadesComponent } from './components/debilidades/debilidades.component';
import { FortalezasComponent } from './components/fortalezas/fortalezas.component';
import { OportunidadesComponent } from './components/oportunidades/oportunidades.component';
import { EstrategiasComponent } from './components/estrategias/estrategias.component';
import { Estrategias1f10Component } from './components/estrategias1f10/estrategias1f10.component';
import { Estrategias1d20Component } from './components/estrategias1d20/estrategias1d20.component';
import { Estrategias1f1aComponent } from './components/estrategias1f1a/estrategias1f1a.component';
import { Estrategias2d2aComponent } from './components/estrategias2d2a/estrategias2d2a.component';
import { ModelocanvasComponent } from './components/modelocanvas/modelocanvas.component';
import { ResumenideacionComponent } from './components/resumenideacion/resumenideacion.component';

const materialModules = [
  MatCardModule,
  MatToolbarModule,
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  MatAutocompleteModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatTabsModule,
  MatListModule,
  MatIconModule,
  MatTableModule,
  MatSidenavModule,
  MatDividerModule,
  MatSlideToggleModule,
  MatGridListModule,
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatMenuModule,
  MatListModule,
  MatPaginatorModule,
  MatButtonToggleModule,
  MatRadioModule
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    BasicosComponent,
    ExperienciaComponent,
    HobbiesComponent,
    SuenosComponent,
    IdeasComponent,
    EvaluacionComponent,
    SeleccionComponent,
    ResumenComponent,
    ValorhobbiesComponent,
    ValorsuenosComponent,
    CriteriosComponent,
    ValorcriteriosComponent,
    MatrizComponent,
    AmenazasComponent,
    MatrizdofaComponent,
    DebilidadesComponent,
    FortalezasComponent,
    OportunidadesComponent,
    EstrategiasComponent,
    Estrategias1f10Component,
    Estrategias1d20Component,
    Estrategias1f1aComponent,
    Estrategias2d2aComponent,
    ModelocanvasComponent,
    ResumenideacionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    BrowserAnimationsModule,
    CommonModule,
    ...materialModules,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    DragDropModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: SessionInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'es' },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver) {}

 }
