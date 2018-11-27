import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ConsultaAvesComponent } from './consulta-aves/consulta-aves.component';
import { AvesComponent } from './aves/aves.component';
import { AvesService } from './shared/aves.service';
import { ConsultaAvesService } from './shared/consulta-aves.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  declarations: [
    AppComponent,
    ConsultaAvesComponent,
    AvesComponent
  ],
  providers: [
    AvesService,
    ConsultaAvesService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }