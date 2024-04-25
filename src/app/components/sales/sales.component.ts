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


  constructor(private productService: ProductService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.productService.getProducts().then((data) => this.products = data.map((item) => {
      const totalSales = item.salesQ1 + item.salesQ2 + item.salesQ3 + item.salesQ4;
      return { ...item, totalSales }
    }));
  }

  editProduct(product: Product) {
    this.product = {...product};
    this.productDialog = true;
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
            this.products[this.findIndexById(this.product.productID)] = this.product;                
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
        }
        else {
            this.product.productID = this.createId();
            this.products.push(this.product);
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Created', life: 3000});
        }

        this.products = [...this.products];
        this.productDialog = false;
        this.product = {} as Product;
    }
}
}
