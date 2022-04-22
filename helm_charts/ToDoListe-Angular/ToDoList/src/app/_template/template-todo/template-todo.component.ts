import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Eventping } from 'src/app/_interface/eventping';
import { ToDo } from '../../_interface/todo';

@Component({
  selector: 'app-template-todo',
  templateUrl: './template-todo.component.html',
  styleUrls: ['./template-todo.component.sass']
})
export class TemplateTodoComponent implements OnInit {

  @Input() toDo$: ToDo;
  @Output() ping: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
    this.toDo$ = {
      id: 1,
      label: 'Wie gehts',
      status: false,
      position: 1
    };
  }

  ngOnInit(): void {
  }

  public changeCheck(event?: any): void {
    this.toDo$.status = !this.toDo$.status;
    const eventObject: Eventping = {
      label: 'check',
      object: this.toDo$
    }
    this.ping.emit(eventObject);
  }
  public changeLabel(event?: any): void {
    const eventObject: Eventping = {
      label: 'label',
      object: this.toDo$
    }
    this.ping.emit(eventObject);
  }
  public deleteToDo(event?: any): void {
    const eventObject: Eventping = {
      label: 'delete',
      object: this.toDo$
    }
    this.ping.emit(eventObject);
  }
}
