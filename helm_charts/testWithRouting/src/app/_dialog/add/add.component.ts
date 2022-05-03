import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { QipcheckviewComponent } from 'src/app/_templates/qipcheckview/qipcheckview.component';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  hostname: string;
  ipadress:string;
  form: any;

  constructor(private fb: FormBuilder,private dialogRef: MatDialogRef<QipcheckviewComponent>,@Inject(MAT_DIALOG_DATA) data) 
  {

    this.hostname = data.hostname;
    this.ipadress = data.ipadress;
  } 

  ngOnInit(
  ): void {
    this.form = this.fb.group({
      hostname: [this.hostname, []],
      ipadress:[this.ipadress,[]]
    });
  }

  save() {
    this.dialogRef.close(this.form.value);
}

close() {
    this.dialogRef.close();
}

}
