import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Componentes
import { IListComponent } from './component/Student/IList/IList.component';
import { AddEditComponent } from './component/Student/Add-Edit/Add-Edit.component';
import { LoginComponent } from './component/login/login.component';
import { MenuComponent } from './component/menu/menu.component';

const routes: Routes = [
  { path: '', redirectTo: 'Login', pathMatch: 'full' },
  { path:'list', component: IListComponent },
  { path:'AddL', component: AddEditComponent },
  { path:'EditN/:Id', component: AddEditComponent },
  { path:'EditL/:Id', component: AddEditComponent },
  { path:'Login', component: LoginComponent },
  { path:'Menu', component: MenuComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
