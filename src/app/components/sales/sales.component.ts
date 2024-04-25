import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

import { Product } from '../../types/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.css',
  providers: [ProductService, ConfirmationService, MessageService]
})

export class SalesComponent implements OnInit {
  products: Product[] = [] as Product[];
  product: Product = {} as Product;
  selectedProducts: Product[] = [] as Product[];
  productDialog: boolean = false;
  submitted: boolean = false;
  cols: any[] = [];


  constructor(private productService: ProductService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    const routerState = history.state;
    this.productService.getProducts().then((data) => {
      let mergedProducts: Product[] = data;
      if (routerState && 'productID' in routerState) {
        mergedProducts.push({ 
          productID: routerState['productID'],
          productName: routerState['productName'],
          salesQ1: 0,
          salesQ2: 0,
          salesQ3: 0,
          salesQ4: 0,
          totalSales: 0 
        });
      }
      this.products = mergedProducts.map((item) => {
        const totalSales = this.calculateTotalSales(item);
        return { ...item, totalSales }
      });
      this.cols = Object.keys(this.products[0]).map((col) => { 
        return { header: col }
       });
    });
  }

  editProduct(product: Product) {
    this.product = product;
    this.productDialog = true;
  }

  calculateTotalSales(item: Product) {
    return Number(item.salesQ1) + Number(item.salesQ2) + Number(item.salesQ3) + Number(item.salesQ4);
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  deleteSelectedProducts() {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete the selected products?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.products = this.products.filter(val => !this.selectedProducts.includes(val));
            this.selectedProducts = [];
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
        }
    });
}

  deleteProduct(product: Product) {
      this.confirmationService.confirm({
          message: 'Are you sure you want to delete ' + product.productName + '?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              this.products = this.products.filter(val => val.productID !== product.productID);
              this.product = {} as Product;
              this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
          }
      });
  }

  createId(): string {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for ( var i = 0; i < 5; i++ ) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.products.length; i++) {
        if (this.products[i].productID === id) {
            index = i;
            break;
        }
    }

    return index;
}

  saveProduct() {
    this.submitted = true;

    if (this.product.productName.trim()) {
        if (this.product.productID) {
          if (this.product.productName && this.product.salesQ1 && this.product.salesQ2 && this.product.salesQ3 && this.product.salesQ4) {
            this.products[this.findIndexById(this.product.productID)] = {...this.product, totalSales: this.calculateTotalSales(this.product)};
            this.messageService.add({severity:'success', detail: 'Product Updated', life: 3000});
          } else {
            this.messageService.add({severity:'error', detail: 'Invalid or missing values', life: 3000});
            return;
          }
        }
        else {
          this.product.productID = this.createId();
          this.products.push(this.product);
          this.messageService.add({severity:'success', detail: 'Product Created', life: 3000});
        }

        this.products = [...this.products];
        this.productDialog = false;
        this.product = {} as Product;
    }
}
}
