import { TaskService } from './../../core/services/task-service/task-service';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ITask } from '../../models/interfaces/itask';

@Component({
  selector: 'app-taskpad',
  imports: [FormsModule],
  templateUrl: './taskpad.html',
  styleUrl: './taskpad.scss',
})
export class Taskpad {

  taskService: TaskService = inject(TaskService);

  newTaskTitle: string = '';
  tasksList: ITask[] = this.taskService.allTasks();
  

  addNewTask() {

    if (!this.newTaskTitle.trim()) return;


    this.taskService.addTask(this.newTaskTitle.trim());
    this.newTaskTitle = '';

  }

  toggleTask(task:ITask){

  }

  deleteTask(task:ITask){
    this.taskService.deleteTask(task.id);
  }
}