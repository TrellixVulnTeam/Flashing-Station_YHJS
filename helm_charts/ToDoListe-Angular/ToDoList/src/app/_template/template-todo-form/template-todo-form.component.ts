import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Eventping } from 'src/app/_interface/eventping';
import { ToDo } from '../../_interface/todo';

@Component({
  selector: 'app-template-todo-form',
  templateUrl: './template-todo-form.component.html',
  styleUrls: ['./template-todo-form.component.sass']
})
export class TemplateTodoFormComponent implements OnInit {
  public toDo$: ToDo;
  @Output() ping: EventEmitter<ToDo> = new EventEmitter<ToDo>();

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
    this.ping.emit(this.toDo$);
    this.toDo$ = {
      id: undefined,
      position: undefined,
      status: false,
      label: undefined
    }
  }
}
