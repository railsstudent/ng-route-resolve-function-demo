import { inject } from "@angular/core";
import { ActivatedRouteSnapshot } from "@angular/router";
import { of } from "rxjs";
import { ProductService } from "../services/product.service";

export const productResolver = (route: ActivatedRouteSnapshot) => {
  const productId = route.paramMap.get('id');
  const productService = inject(ProductService);

  if (!productId) {
    return of(undefined);
  }

  return productService.getProduct(+productId);
}
