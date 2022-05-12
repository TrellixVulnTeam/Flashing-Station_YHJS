import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  opened:boolean;
  startView:boolean;

  constructor() { 
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
