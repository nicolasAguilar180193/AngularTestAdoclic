import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingComponent } from './shopping.component';
import { ProductService } from 'src/app/services/product.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SharedModule } from 'src/app/shared/shared.module';
import { of } from 'rxjs';
import { Product } from 'src/app/interfaces/product.interface';

describe('ShoppingComponent', () => {
  let component: ShoppingComponent;
  let fixture: ComponentFixture<ShoppingComponent>;
  let productService: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShoppingComponent],
      imports: [
        HttpClientTestingModule,
        SharedModule
      ]
    });
    fixture = TestBed.createComponent(ShoppingComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getProducts on ngOnInit', () => {
    spyOn(component, 'getProducts');
    component.ngOnInit();
    expect(component.getProducts).toHaveBeenCalled();
  });

  it('should call getCategories on ngOnInit', () => {
    spyOn(component, 'getCategories');
    component.ngOnInit();
    expect(component.getCategories).toHaveBeenCalled();
  });
  
  it('should call getAllCategories method of _productService when call getCategories', () => {
    spyOn(productService, 'getAllCategories').and.callThrough();

    component.getCategories();
    
    expect(productService.getAllCategories).toHaveBeenCalled();
  });

  it('should update categories when data is received', () => {
    const dummyData: string[] = ['Category1', 'Category2'];
    spyOn(productService, 'getAllCategories').and.returnValue(of(dummyData));

    component.getCategories();
    
    expect(component.categories).toEqual([...['all'], ...dummyData]);
  });

  it('should call getProducts method of _productService when call getProducts', () => {
    spyOn(productService, 'getAllProducts').and.callThrough();
    component.getProducts();
    expect(productService.getAllProducts).toHaveBeenCalled();
  });

  it('should update products when data is received', () => {
    const dummyData: Product[] = [
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
      }
    ];
    
    spyOn(productService, 'getAllProducts').and.returnValue(of(dummyData));

    component.getProducts();


    expect(component.products).toEqual(dummyData);
  });
});
