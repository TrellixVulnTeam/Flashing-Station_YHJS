import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/_service/data.service';
import { QipcheckviewComponent } from '../qipcheckview/qipcheckview.component';
import { Device } from 'src/app/_interface/device';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  opened:boolean;
  startView:boolean;
  devices: Device[] = [];

  constructor(public _dataService:DataService) { 
    this.opened = false;
    this.startView = true;
  }

  ngOnInit(): void {
  }

  public goToDashboard():void {
    this.startView = true;
  }

  public logout():void{
    console.log("Logout/User Button clicked");
  }
  
  sideNavToggle() {
    this.opened = !this.opened;
  }
  public setViewToQIP():void{
    this.startView = true;
    this.opened = false;
  }
  public setViewToFlash():void{
    this.startView = false;
    this.opened = false;
  }
}
