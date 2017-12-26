import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import {HttpClientModule} from '@angular/common/http';

import {DataTableModule } from 'angular-4-data-table-bootstrap-4';
import { FtinfoService } from './ftinfo.service';
import { DataTableDemo1 } from './demo1/data-table-demo1';
import { DataTableDemo2 } from './demo2/data-table-demo2';
import { DataTableDemo3 } from './demo3/data-table-demo3';
import { Http, Response } from '@angular/http';
@NgModule({
  declarations: [
    AppComponent,
    DataTableDemo1,
    DataTableDemo2,
    DataTableDemo3,
  
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    DataTableModule,
    HttpClientModule,
    HttpModule
    
  ],
  providers: [FtinfoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
