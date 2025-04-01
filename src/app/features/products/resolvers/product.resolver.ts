import { ResolveFn } from '@angular/router';
import {ProductService} from '../services/product.service';
import {inject} from '@angular/core';
import {ProductSingleDtoModel} from '../models/product-single-dto.model';

export const productResolver: ResolveFn<ProductSingleDtoModel> = (route, state) => {
const productService: ProductService = inject(ProductService);
  return productService.findByID(route.params['id']).pipe();
};
