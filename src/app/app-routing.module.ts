import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { SalesComponent } from './components/sales/sales.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path: 'welcome', component: WelcomeComponent, pathMatch:'full', canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'add-product', component: AddProductComponent, canActivate: [AuthGuard]},
  {path: 'sales', component: SalesComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }