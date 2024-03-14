import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product.interface';
import { ProductService } from 'src/app/services/product.service';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductRequestOptions } from 'src/app/interfaces/product-request-options.interface';

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
    private _productService: ProductService
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
  }

  setCategory(category: string) {
    this.categorySelected = category;
    this.getProducts();

    console.log(this.categorySelected);
  }

  setLimit(limit: number) {
    this.limitSelected = limit;
    this.getProducts();
  }
}
