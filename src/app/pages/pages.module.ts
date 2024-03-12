import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingComponent } from './shopping/shopping.component';
import { PagesComponent } from './pages.component';



@NgModule({
  declarations: [
    ShoppingComponent,
    PagesComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PagesModule { }
