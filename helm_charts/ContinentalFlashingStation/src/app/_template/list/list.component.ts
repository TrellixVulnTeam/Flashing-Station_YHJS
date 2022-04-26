import { Component, OnInit } from '@angular/core';
import { MDCDataTable } from '@material/data-table'



@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
 
  constructor() {
    const dataTable = new MDCDataTable(document.querySelector('.mdc-data-table'));
   }

  ngOnInit(): void {
  }

}
