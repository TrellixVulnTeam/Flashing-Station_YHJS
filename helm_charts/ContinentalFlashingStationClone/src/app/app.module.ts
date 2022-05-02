import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ThemeModule } from '@conti/theme';
//Komponenten
import { AppComponent } from './app.component';
import { PageviewComponent } from './pageview/pageview.component';
import { HeaderComponent } from './_template/header/header.component';
import { ButtonComponent } from './button/button.component';
import { CheckboxComponent } from './_template/checkbox/checkbox.component';
import { ProgressbarComponent } from './_template/progressbar/progressbar.component';
//Angular Material Modules
/* import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatListModule } from '@angular/material/list';
 */




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
    ThemeModule/* ,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatDialogModule,
    MatIconModule,
    MatMenuModule,
    MatCheckboxModule,
    MatSelectModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatTreeModule,
    MatAutocompleteModule,
    MatListModule */
    //BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
