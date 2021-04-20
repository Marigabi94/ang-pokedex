import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PokeDetalleComponent } from './components/poke-detalle/poke-detalle.component';
import { PokeTablaComponent } from './components/poke-tabla/poke-tabla.component';

const routes: Routes = [
  { path: 'home', component: PokeTablaComponent },
  { path: 'pokeDetalle/:id', component: PokeDetalleComponent },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: '**', pathMatch: 'full', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
