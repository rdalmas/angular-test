import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Product } from '../types/product';
import { lastValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts() {
      return lastValueFrom(this.http.get<any>('assets/potato_sales.json'))
      .then(res => <Product[]>res.data)
      .then(data => { return data; });
  }
}
