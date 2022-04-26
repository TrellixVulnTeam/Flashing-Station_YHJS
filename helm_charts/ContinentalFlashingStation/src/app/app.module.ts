import { NgModule } from '@angular/core';
import { ThemeModule } from '@conti/theme';


import { AppComponent } from './app.component';
import { PageviewComponent } from './pageview/pageview.component';
import { HeaderComponent } from './_template/header/header.component';
import { ListComponent } from './_template/list/list.component';
import { CheckboxComponent } from './_template/checkbox/checkbox.component';
import { ProgressbarComponent } from './_template/progressbar/progressbar.component';
import { ButtonComponent } from './button/button.component';

@NgModule({
  declarations: [
    AppComponent,
    PageviewComponent,
    HeaderComponent,
    ListComponent,
    CheckboxComponent,
    ProgressbarComponent,
    ButtonComponent
  ],
  imports: [
    ThemeModule//,
    //BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
