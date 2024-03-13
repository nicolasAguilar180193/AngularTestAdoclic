import { TestBed } from '@angular/core/testing';

import { ProductService } from './product.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpEvent, HttpEventType } from '@angular/common/http';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;
 

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get products', () => {
    const mockProducts = [
      {
        "id": 1,
        "title": "Fjallraven",
        "price": 109.95,
        "description": "Your perfect pack...",
        "category": "men's clothing",
        "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
        "rating": {
          "rate": 3.9,
          "count": 120
        }
      },
      {
        "id": 2,
        "title": "Mens Casual Premium Slim Fit T-Shirts ",
        "price": 22.3,
        "description": "Slim-fitting style...",
        "category": "men's clothing",
        "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
        "rating": {
          "rate": 4.1,
          "count": 259
        }
      },
    ]
    service.getAllProducts().subscribe((event: HttpEvent<any>) => {
      switch(event.type) {
        case HttpEventType.Response:
          expect(event.body).toEqual(mockProducts);
      }
    });

    const mockReq = httpMock.expectOne(service.baseUrl);
    expect(mockReq.request.method).toBe('GET');
    expect(mockReq.request.responseType).toEqual('json');
    mockReq.flush(mockProducts);

    httpMock.verify();
  });

  it('should make a GET request with category options provided', () => {
    const options = { category: 'electronics' };
    service.getAllProducts(options).subscribe();

    const req = httpMock.expectOne(request => {
      return request.url.includes('category/electronics');
    });

    expect(req.request.method).toBe('GET');
    expect(req.request.responseType).toEqual('json');

    req.flush({});
  });
  
  it('should make a GET request with limit options provided', () => {
    const options = { limit: 10 };
    service.getAllProducts(options).subscribe();

    const req = httpMock.expectOne(request => {
      return request.url.includes('?limit=10');
    });

    expect(req.request.method).toBe('GET');
    expect(req.request.responseType).toEqual('json');

    req.flush({});
  });

  it('should make a GET request with limit & category options provided', () => {
    const options = { limit: 3, category: 'electronics' };
    service.getAllProducts(options).subscribe();

    const req = httpMock.expectOne(request => {
      return request.url.includes('category/electronics?limit=3');
    });

    expect(req.request.method).toBe('GET');
    expect(req.request.responseType).toEqual('json');

    req.flush({});
  });
});
