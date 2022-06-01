import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/_service/data.service';
import { QipcheckviewComponent } from '../qipcheckview/qipcheckview.component';
import { Device } from 'src/app/_interface/device';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CheckForNewVersionComponent } from 'src/app/_dialog/check-for-new-version/check-for-new-version.component';
import { KeycloakService } from 'keycloak-angular';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  opened:boolean;
  startView:boolean;
  devices: Device[] = [];
  user: string;
  loggedIn:boolean;
  kcs:KeycloakService;

  constructor(public _dataService:DataService, private dialog: MatDialog,  private _kcs: KeycloakService,) { 
    this.opened = false;
    this.startView = true;
    this.user = "";
    this.loggedIn=false;
    this.kcs=_kcs;
    //this.setUsername();
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
    this.setUsername();
  }

  setUsername():Promise<string>{
    return new Promise<string>(async (resolve, reject) => {
        if(await this.kcs.isLoggedIn()){
          console.log(await (await this.kcs.loadUserProfile()).lastName);
          console.log("Username found")
          console.log("Login:");
          console.log(await this.kcs.isLoggedIn());
          console.log("user:")
          console.log(await this.kcs.getUsername())
          this.user= ((await this.kcs.loadUserProfile()).lastName) + ', ' + ((await this.kcs.loadUserProfile()).firstName);
          this.loggedIn = true;
        }
        else{
          console.log("no User logged in")
          this.user = "Anonymous"
          this.loggedIn = false;
        }
        
  });
}
    // })
    //  this.kcs.loadUserProfile().then(function(data){
    //   console.log('loaduserProfiles ran fine')
    //   console.log(data.username)
    //   console.log(typeof data.username)
    //   this.user = data.lastName + ' ,' + data.firstName;
    //   //this.loggedIn = true;
    //   //this.user=data.username
    // }).catch(function(){
    //   console.log('loaduserprofiles failed');
    //   this.user = "Anonymous"
    // })

  public goToDashboard():void {
    this.startView = true;
  }

  public logout():void{
    console.log("Logout/User Button clicked");
    const url = window.location.origin + window.location.search + window.location.hash;
    this.kcs.logout(url);
    this._dataService.deleteAllDevices().subscribe((data:Device[])=>{
      this.loggedIn = false;
      //this.user = "Anonymous"
    }, error =>{
      console.log(`${error.message}`)
    });

  }

  public login():void{
    this.loggedIn = true;
    //this.user = 'Bautz, Daniel';
    window.location.href = window.location.origin + '/auth' + window.location.search + window.location.hash;
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
