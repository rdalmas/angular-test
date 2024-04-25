import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NewProductComponent } from './components/new-product/new-product.component';
import { SalesComponent } from './components/sales/sales.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path: 'welcome', component: WelcomeComponent, pathMatch:'full', canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'new-product', component: NewProductComponent, canActivate: [AuthGuard]},
  {path: 'sales', component: SalesComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }