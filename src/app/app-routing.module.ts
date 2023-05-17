import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { RegistrationComponent } from './registration/registration.component';
import {RegistComponent} from "./registration/regist.component";
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './Cart/menu/menu.component';

const routes: Routes = [
  {path: '', component : LoginComponent},
  {path:'signUp', component:RegistComponent},
{path:'cart',component :MenuComponent}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})



export class AppRoutingModule {


}

export class routerOutlet {
}
