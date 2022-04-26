import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ThemeModule } from '@conti/theme';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    ThemeModule//,
    //BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
