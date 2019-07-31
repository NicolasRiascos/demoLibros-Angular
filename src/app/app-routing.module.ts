import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BarraComponent } from './barra/barra.component';
import { ContainerComponent } from './container/container.component';

const routes: Routes = [
  {path: 'barra', component: BarraComponent },
  {path: 'completo', component: ContainerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
