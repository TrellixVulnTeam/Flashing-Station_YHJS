import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-flashingview',
  templateUrl: './flashingview.component.html',
  styleUrls: ['./flashingview.component.scss']
})
export class FlashingviewComponent implements OnInit {

  progressbarvalue: number;
  constructor() { 
    this.progressbarvalue = 0;
  }

  ngOnInit(): void {
  }

  async startFlashing():Promise<void> {
    this.progressbarvalue = 0;
    do{
      await this.sleep(1000);
      this.progressbarvalue += 1;
      
    } while (this.progressbarvalue < 100)
  }
  sleep(ms) {
       return new Promise( resolve => setTimeout(resolve, ms) );
    }

  selectDrive(): void {
    console.log("drive selected");
  }

}
