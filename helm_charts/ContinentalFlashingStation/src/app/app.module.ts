import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ThemeModule } from '@conti/theme';

import { AppComponent } from './app.component';
import { PageviewComponent } from './pageview/pageview.component';
import { HeaderComponent } from './_template/header/header.component';
import { ButtonComponent } from './button/button.component';
import { CheckboxComponent } from './_template/checkbox/checkbox.component';
import { ProgressbarComponent } from './_template/progressbar/progressbar.component';

@NgModule({
  declarations: [
    AppComponent,
    PageviewComponent,
    HeaderComponent,
    ButtonComponent,
    CheckboxComponent,
    ProgressbarComponent
  ],
  imports: [
    ThemeModule//,
    //BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
