import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';


import { HomeComponent } from './home/home.component';
import { RestaurantesComponent } from './restaurantes/restaurantes.component';
import { DiversaoComponent } from './diversao/diversao.component';
import { OfertaComponent } from './oferta/oferta.component';
import { ComoUsarComponent } from './oferta/como-usar/como-usar.component';
import { OndeFicaComponent } from './oferta/onde-fica/onde-fica.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {OrdemCompraComponent} from './ordem-compra/ordem-compra.component';


const ROUTES: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full'},
  // { path: '', redirectTo: 'home', pathMatch: 'full'},
  // { path: 'home', component: HomeComponent, pathMatch: 'full' },
  { path: 'restaurantes', component: RestaurantesComponent},
  { path: 'diversao', component: DiversaoComponent},
  { path: 'oferta', component: OfertaComponent},
  { path: 'oferta/:id', component: OfertaComponent,
          children: [
            { path: '', redirectTo: 'como-usar', pathMatch: 'full' },
            { path: 'onde-fica', component: OndeFicaComponent },
            { path: 'como-usar', component: ComoUsarComponent }


            ]},
  { path: 'ordem-compra', component: OrdemCompraComponent },
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule],
  })

export class AppRoutingModule { }
export const routingComponents = [ RestaurantesComponent,
  DiversaoComponent,
  OfertaComponent,
  ComoUsarComponent,
  OndeFicaComponent,
  PageNotFoundComponent]
