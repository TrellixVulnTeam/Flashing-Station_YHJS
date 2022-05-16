import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
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
  ipInvalid:boolean;

  constructor(private fb: FormBuilder,private dialogRef: MatDialogRef<QipcheckviewComponent>,@Inject(MAT_DIALOG_DATA) data) 
  {
    
    this.hostname = data.hostname;
    this.ipadress = data.ipadress;
    this.ipInvalid = false;
  } 

  ngOnInit(
  ): void {
    //const hostnamePattern = "(([a-zA-Z]|[a-zA-Z][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z]|[A-Za-z][A-Za-z0-9\-]*[A-Za-z0-9])";
    const ipPattern = "(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)";
    this.form = this.fb.group({
      hostname: [this.hostname, [Validators.required]],
      ipadress:[this.ipadress,[Validators.required,Validators.pattern(ipPattern)]]
    });
    
  }

  save() {
    this.ipInvalid=true;
    console.log(this.form.valid);
    const {value, valid} = this.form;
    console.log({value,valid});
    if(valid){
        this.ipInvalid =false;
        this.dialogRef.close(value);
    }      
}

close() {
    this.dialogRef.close();
}

}
