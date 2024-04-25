import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';


@Component({
  selector: 'app-new-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
  providers: [MessageService]
})
export class AddProductComponent {
  error = '';
  prodForm!: FormGroup;
  submitted!: boolean;
  loading = false;

  constructor(private fb: FormBuilder, private router: Router, private messageService: MessageService) {}

  ngOnInit(): void {
    this.prodForm = this.fb.group({
      productName: ['', Validators.required],
      productID: ['', Validators.required],
      productManager: [''],
      salesStartDate: ['', Validators.required]
    });
  }

  get f() { return this.prodForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.loading = true;

    if (this.prodForm.valid) {
      const productName = this.f['productName'].value;
      const productID = this.f['productID'].value;
      const productManager = this.f['productManager'].value;
      const salesStartDate = this.f['salesStartDate'].value;
      
      this.messageService.add({ severity: 'success', detail: 'Product added successfully!' });
      this.router.navigateByUrl('/sales', { state: { productID, productName, productManager, salesStartDate } });
    }
    this.loading = false;
  }

  resetForm() {
    this.prodForm.reset();
    this.prodForm.markAsPristine();
    this.prodForm.markAsUntouched();
  }
}
