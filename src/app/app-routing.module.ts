import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
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

const routes: Routes = [
    //{ path: "", component: AppComponent, pathMatch: "full" },
    { path: "", component: LoginComponent, pathMatch: "full" },
    { path: "home", component:HomeComponent, pathMatch: "full"},
    { path: "basicos", component:BasicosComponent, pathMatch: "full"},
    { path: "experiencia", component:ExperienciaComponent, pathMatch: "full"},
    { path: "hobbies", component:HobbiesComponent, pathMatch: "full"},
    { path: "suenos", component:SuenosComponent, pathMatch: "full"},
    { path: "ideas", component:IdeasComponent, pathMatch: "full"},
    { path: "evaluacion", component:EvaluacionComponent, pathMatch: "full"},
    { path: "seleccion", component:SeleccionComponent, pathMatch: "full"},
    { path: "resumen", component:ResumenComponent, pathMatch: "full"},
    { path: "valorhobbies", component:ValorhobbiesComponent, pathMatch: "full"},
    { path: "valorsuenos", component:ValorsuenosComponent, pathMatch: "full"},
    { path: "criterios", component:CriteriosComponent, pathMatch: "full"},
    { path: "valorcriterios", component:ValorcriteriosComponent, pathMatch: "full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
