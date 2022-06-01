import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DataService } from 'src/app/_service/data.service';

@Component({
  selector: 'app-check-for-new-version',
  templateUrl: './check-for-new-version.component.html',
  styleUrls: ['./check-for-new-version.component.scss']
})
export class CheckForNewVersionComponent implements OnInit {

  currentImage:String;
  newestImage: String;
  finished:boolean;
  updateInProgress:boolean;
  test=false;
  
  constructor(public _dataService:DataService,private dialogRef: MatDialogRef<CheckForNewVersionComponent>) { 
    //this.currentImage ="2022-05-20t08:04:18-usbethernetimage.img";
    this._dataService.getCurrentImagename().subscribe((data:string) =>{
      console.log("currentImage:")
      console.log(data);
      this.currentImage = data;
    })
    this.finished = false;
    
    this._dataService.getNewestImagename().subscribe(async (data: string) => {
      console.log("newestImage:")
      console.log(data);
      this.newestImage = data;
      if(this.currentImage != this.newestImage){
        this.updateInProgress=true;
      //if(false){
        this._dataService.getNewestImage(this.newestImage).subscribe(async (data: string) => {
          if (this.currentImage.length != 0) {
            this._dataService.deleteOldImage(this.currentImage).subscribe(async (data: boolean) => {
              this.finished = true;
              await this.sleep(500);
              this.close();
            }, () => {
              console.log('error in deleting')
            });
          }
          else{
            this.finished = true;
            await this.sleep(1000);
            this.close()
          }
        })
      }
      else{
        
        this.finished = true;
        await this.sleep(1000);
        this.close()
      }
      
     },() => {
       console.log(`error in fetching`)
    }) 
    
    
    }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
}
change(){
  this.finished =! this.finished;
}

sleep(ms) {
     return new Promise( resolve => setTimeout(resolve, ms) );
  }

}
