import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ShoppingComponent } from "./shopping/shopping.component";

const childRoutes: Routes = [
	{ path: '', component: ShoppingComponent },
];

@NgModule({
	imports: [ RouterModule.forChild(childRoutes) ],
	exports: [ RouterModule ]
})
export class ChildRoutesModule { }
  