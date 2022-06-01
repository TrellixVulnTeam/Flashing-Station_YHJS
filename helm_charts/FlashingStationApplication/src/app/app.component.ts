import { Component } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { DataService } from './_service/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'FlashingStationApplication';
}
