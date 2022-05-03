import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  opened = false;
  startView = true;

  constructor() { 
    this.opened = false;
    this.startView = false;
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
  }
  public setViewToFlash():void{
    this.startView = false;
  }
}
