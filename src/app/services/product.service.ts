import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ProductRequestOptions } from '../interfaces/product-request-options.interface';
import { HttpClient } from '@angular/common/http';
import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl: string = environment.baseUrl + 'products';

  constructor(private http: HttpClient) { }

  buildProductsUrl(options?: ProductRequestOptions): string {
    let url = this.baseUrl;

    if (options?.category) {
      url += `/category/${options.category}`;
    }
    if (options?.limit) {
      url += `?limit=${options.limit}`;
    }
    return url;
  }
  
  getAllProducts(options?: ProductRequestOptions){
    const url = this.buildProductsUrl(options);
    return this.http.get<Product[]>(url);
  }

  getAllCategories(){
    const url = this.baseUrl + '/categories';
    return this.http.get<string[]>(url);
  }
  
}
