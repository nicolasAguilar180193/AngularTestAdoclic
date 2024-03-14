import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product.interface';
import { ProductService } from 'src/app/services/product.service';
import { NgbActiveModal, NgbDropdownModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductRequestOptions } from 'src/app/interfaces/product-request-options.interface';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';


// @Component({
// 	selector: 'ngbd-modal-content',
// 	standalone: true,
// 	template: `
// 		<div class="modal-header">
// 			<h4 class="modal-title">{{ product?.title }}</h4>
// 			<button type="button" class="btn-close" aria-label="Close" (click)="activeModal.dismiss('Cross click')"></button>
// 		</div>
// 		<div class="modal-body text-center">
//       <img style="width: 65%;" src="{{ product?.image }}" alt=""/>
//       <p>{{ product?.category }}</p>
// 			<p>Hello, {{ product?.description }}!</p>
//       <p>Price: {{ product?.price }}</p>
// 		</div>
// 	`,
// })
// export class NgbdModalContent {
//   @Input() product: Product | undefined;

// 	constructor(public activeModal: NgbActiveModal) {}
// }


@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css']
})
export class ShoppingComponent implements OnInit{
  products: Product[] = [];
  categories: string[] = ['all'];
  limit: number[] = [5, 10, 15, 25];
  limitSelected: number = 5;
  categorySelected: string = 'all';

  constructor(
    private _productService: ProductService,
    private modalService: NgbModal
  ) { }
  

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
  }

  getProducts() {
    let options: ProductRequestOptions = { limit: this.limitSelected }

    if (this.categorySelected && this.categorySelected !== 'all') {
      options.category = this.categorySelected;
    }

    this._productService.getAllProducts(options).subscribe(
      (data) => {
        this.products = data;
        console.log('Products:', this.products);
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  getCategories() {
    this._productService.getAllCategories().subscribe(
      (data) => {
        this.categories = [...this.categories, ...data];
        console.log('Categories:', this.categories);
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  openModalDetails(product: Product) {
    console.log(product);

    const modalRef = this.modalService.open(ProductDetailComponent, {centered: true});
    modalRef.componentInstance.product = product;
  }

  setCategory(category: string) {
    this.categorySelected = category;
    this.getProducts();
  }

  setLimit(limit: number) {
    this.limitSelected = limit;
    this.getProducts();
  }
}
