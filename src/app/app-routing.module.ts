import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [

  {
    path : 'users' , component : ListComponent
  },
  {
    path : '' , redirectTo : 'users' , pathMatch : 'full'
  },
  {
    path : 'add' , component : CreateUserComponent
  }
  ,
  {
    path : 'edit/:id' , component : EditUserComponent
  },
  {
    path : 'account' , component : AccountComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
