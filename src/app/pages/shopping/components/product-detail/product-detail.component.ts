import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Product } from 'src/app/interfaces/product.interface';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html'
})
export class ProductDetailComponent {
  @Input() product: Product | undefined;

	constructor(public activeModal: NgbActiveModal) {}
}
