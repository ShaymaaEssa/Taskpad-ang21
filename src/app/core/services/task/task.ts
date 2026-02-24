import { computed, Injectable, signal } from '@angular/core';
import { ITask, TaskStatus } from '../../../models/interfaces/itask';

@Injectable({
  providedIn: 'root',
})
export class Task {
  private tasks = signal<ITask[]>([]);  //writable
  public readonly allTasks = this.tasks.asReadonly();  //readonly

  readonly completedTasks = computed(() => this.tasks().filter(task => task.status === 'completed'));  //computed


  private nextId = 1;

  addTask(task: ITask){
    const newTask:ITask  ={
      id: this.nextId++,
      title: task.title,
      status: 'pending'
    };
    this.tasks.update(tasks => [...tasks, newTask]);

    }
    
    
    updateTaskStatus(id:number, status:TaskStatus){
      this.tasks.update(tasks => tasks.map(task => task.id === id ? {...task, status} : task));
    }
  }
  
  

