import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ProductRequestOptions } from '../interfaces/product-request-options.interface';
import { Observable } from 'rxjs';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';

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
  
  getAllProducts(options?: ProductRequestOptions): Observable<HttpEvent<any>> {
    const url = this.buildProductsUrl(options);
    const request = new HttpRequest('GET', url, {
      reportProgress: true
    });
    return this.http.request(request)
  }
  
}
