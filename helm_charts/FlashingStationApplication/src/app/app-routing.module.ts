import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { appendFile } from 'fs';
import { KeycloakService } from 'keycloak-angular';
import { AppComponent } from './app.component';
import { AuthGuard } from './_guard/auth.guard';
import { HeaderComponent } from './_templates/header/header.component';


const routes: Routes = [
  {
    path: 'auth',
    component: HeaderComponent,
    canActivate: [AuthGuard],
    data: {
        isAuthNotNeeded: false,
        unauth: '/',
        auth: async (ks: KeycloakService): Promise<boolean> => {
            console.log(ks)
            return await ks.isLoggedIn().then((r) => r);
        }
    }
  }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
