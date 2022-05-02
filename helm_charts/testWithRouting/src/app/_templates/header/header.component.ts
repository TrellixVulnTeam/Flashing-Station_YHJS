import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  drawerOpened: boolean;
  opened = false;

  constructor() { 
    this.drawerOpened = false;
    this.opened = false;
  }

  ngOnInit(): void {
  }

  public drawerClicked():void{
    this.drawerOpened =! this.drawerOpened;
  }
  public goToDashboard():void {
    console.log("Dashboard clicked");
  }

  public logout():void{
    console.log("Logout/User Button clicked");
  }
  sideNavToggle() {
    this.opened = !this.opened;
  }
  onSidenavClick(event: any):void{
    console.log(event);

  }
}
