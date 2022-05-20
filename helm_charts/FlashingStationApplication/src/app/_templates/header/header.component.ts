import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/_service/data.service';
import { QipcheckviewComponent } from '../qipcheckview/qipcheckview.component';
import { Device } from 'src/app/_interface/device';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CheckForNewVersionComponent } from 'src/app/_dialog/check-for-new-version/check-for-new-version.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  opened:boolean;
  startView:boolean;
  devices: Device[] = [];

  constructor(public _dataService:DataService, private dialog: MatDialog) { 
    this.opened = false;
    this.startView = true;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: 1,
      title: 'CheckForNewVersion-Dialog'
    };
   this.dialog.open(CheckForNewVersionComponent, dialogConfig);
   
  }

  ngOnInit(): void {
  }

  public goToDashboard():void {
    this.startView = true;
  }

  public logout():void{
    console.log("Logout/User Button clicked");
    this._dataService.deleteAllDevices().subscribe((data:Device[])=>{
    }, error =>{
      console.log(`${error.message}`)
    });
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
