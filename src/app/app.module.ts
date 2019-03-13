import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';

import { AppRoutingModule, routingComponents } from './app-routing.module';

import { AppComponent } from './app.component';
import { TopoComponent } from './topo/topo.component';
import { HomeComponent } from './home/home.component';
import { RodapeComponent } from './rodape/rodape.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';



// import { RestaurantesComponent } from './restaurantes/restaurantes.component';
// import { DiversaoComponent } from './diversao/diversao.component';
// import { OfertaComponent } from './oferta/oferta.component';
// import { ComoUsarComponent } from './oferta/como-usar/como-usar.component';
// import { OndeFicaComponent } from './oferta/onde-fica/onde-fica.component';


@NgModule({
  declarations: [
    AppComponent,
    TopoComponent,
    RodapeComponent,
    HomeComponent,
    routingComponents,
    PageNotFoundComponent


  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
