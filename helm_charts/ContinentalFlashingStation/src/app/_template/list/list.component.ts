import { Component, OnInit } from '@angular/core';
import {MDCDataTable} from '@material/data-table';

const dataTable = new MDCDataTable(document.querySelector('.mdc-data-table'));


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
