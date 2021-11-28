import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { HomeComponent } from './home/home.component';
import { ListDetailComponent } from './list/list-detail/list-detail.component';
import { ItemComponent } from './item/item.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListFormComponent } from './list/list-form/list-form.component';
import { ItemFormComponent } from './item/item-form/item-form.component';

import { ItemModule } from './item/item.module'
import { ListModule } from './list/list.module'

import { NgxColorsModule } from 'ngx-colors';
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
    //ListComponent,
    HomeComponent,
    //ListDetailComponent,
    //ItemComponent,
    //ListFormComponent,
    //ItemFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    //HttpClientModule,
    //FormsModule,
    //ReactiveFormsModule,
    //NgxColorsModule,
    SharedModule,
    ItemModule,
    ListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
