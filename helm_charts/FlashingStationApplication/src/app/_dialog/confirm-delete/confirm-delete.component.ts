import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { QipcheckviewComponent } from 'src/app/_templates/qipcheckview/qipcheckview.component';

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.scss']
})
export class ConfirmDeleteComponent implements OnInit {

    deleteOk: false;
    form: any;
  
    constructor(private dialogRef: MatDialogRef<QipcheckviewComponent>) 
    {
      
    } 
  
    ngOnInit(
    ): void {
    }
  
    confirm() {
      this.dialogRef.close(true);
  }
  
    close() {
      this.dialogRef.close();
  }
  
}
  

