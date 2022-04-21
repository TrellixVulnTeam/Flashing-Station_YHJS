import { Component, OnInit } from '@angular/core';
import { ToDo } from 'src/app/_interface/todo';

@Component({
  selector: 'app-template-todo-form',
  templateUrl: './template-todo-form.component.html',
  styleUrls: ['./template-todo-form.component.sass']
})
export class TemplateTodoFormComponent implements OnInit {
  public toDo$: ToDo;

  constructor() {
    this.toDo$ = {
      id: undefined,
      position: undefined,
      status: false,
      label: undefined
    }
  }

  ngOnInit(): void {
  }
  public createToDo(event?: any): void {
    console.log(this.toDo$);
    this.toDo$ = {
      id: undefined,
      position: undefined,
      status: false,
      label: undefined
    }
  }
}
