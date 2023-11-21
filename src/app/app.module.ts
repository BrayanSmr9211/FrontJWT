import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IListComponent } from './component/Student/IList/IList.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatNativeDateModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';

///modulos
import { SharedModule } from './Share/shared.module';
import { AddEditComponent } from './component/Student/Add-Edit/Add-Edit.component';
import { HttpClientModule } from '@angular/common/http';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import {DatePipe} from '@angular/common';
import { LoginComponent } from './component/login/login.component';
import { MenuComponent } from './component/menu/menu.component';
import {MatPaginatorModule} from '@angular/material/paginator';

@NgModule({
  declarations: [
    AppComponent,
    IListComponent,
    AddEditComponent,
    LoginComponent,
    MenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    MatNativeDateModule,
    MatSelectModule,
    MatPaginatorModule,
    NgMultiSelectDropDownModule.forRoot(),
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
