import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { HttpClientModule } from '@angular/common/http';
import { Grafica2Component } from './grafica2/grafica2.component';
import { Grafica3Component } from './components/grafica3/grafica3.component';

@NgModule({
  declarations: [
    AppComponent,
    Grafica1Component,
    Grafica2Component,
    Grafica3Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
