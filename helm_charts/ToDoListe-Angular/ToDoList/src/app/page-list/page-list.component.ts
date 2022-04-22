import { Component, OnInit } from '@angular/core';
import { iif } from 'rxjs';
import { Eventping } from '../_interface/eventping';
import { ToDo } from '../_interface/todo';

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.sass']
})
export class PageListComponent implements OnInit {

  public toDoShow: boolean;
  public toDoDoneShow: boolean;
  public $toDos: ToDo[];
  public $toDosdone: ToDo[];

  constructor() {
    this.toDoShow = true;
    this.toDoDoneShow = false;
    this.$toDos = [];
    this.$toDosdone = [];
  }

  ngOnInit(): void {
  }

  public update(event: Eventping): void {
    if ('check' == event.label) {
      console.log(event.label.toString() + " wurde getriggert");
      if (!event.object.status) {
        this.$toDosdone.splice(this.$toDosdone.indexOf(event.object), 1);
        this.$toDos.push(event.object);
      }
      else {
        this.$toDos.splice(this.$toDos.indexOf(event.object), 1);
        this.$toDosdone.push(event.object);
      }
    }
    if ('delete' == event.label) {
      console.log(event.label.toString() + " wurde getriggert");
      if (event.object.status) {
        this.$toDosdone.splice(this.$toDosdone.indexOf(event.object), 1);
      }
      else {
        this.$toDos.splice(this.$toDos.indexOf(event.object), 1);
      }
    }
    if ('label' == event.label) {
      console.log(event.label.toString() + " wurde getriggert");
      if (event.object.status) {
        this.$toDosdone.forEach((toDo: ToDo) => {
          if (toDo.id === event.object.id) {
            toDo.label = event.object.label;
          }
        });
      }
      else {
        this.$toDos.forEach((toDo: ToDo) => {
          if (toDo.id === event.object.id) {
            toDo.label = event.object.label;
          }
        });

      }
    }

  }
  public create(event: ToDo): void {
    event.position = this.$toDos.length + 1;
    this.$toDos.push(event);
  }

}
