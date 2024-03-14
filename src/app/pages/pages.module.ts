import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';

import { PagesComponent } from './pages.component';
import { ShoppingComponent } from './shopping/shopping.component';



@NgModule({
  declarations: [
    ShoppingComponent,
    PagesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule,
    NgbDropdownModule
  ],
  exports: [
    ShoppingComponent,
    PagesComponent
  ]
})
export class PagesModule { }
