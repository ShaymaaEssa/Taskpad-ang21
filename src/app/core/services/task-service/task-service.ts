import { computed, effect, Injectable, signal } from '@angular/core';
import { ITask, TaskStatus } from '../../../models/interfaces/itask';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks = signal<ITask[]>([]);  //writable
  public readonly allTasks = this.tasks.asReadonly();  //readonly

  readonly completedTasks = computed(() => this.tasks().filter(task => task.status === 'completed'));  //computed
  
  public readonly completionPercentage = computed(()=>{
    if(this.tasks().length === 0 ){
      return 0;
    }
    
    const completedTasksLength = this.completedTasks().length;
    return (completedTasksLength / this.tasks().length) * 100;
  });


  private saveEffectTasks = effect(()=>{
    localStorage.setItem(environment.localStorageKey, JSON.stringify(this.tasks()));
  });


  private nextId = 1;

  constructor() {
    const saved = localStorage.getItem(environment.localStorageKey);
    if (saved) {
      this.tasks.set(JSON.parse(saved));
      this.nextId = this.tasks().length > 0 ? Math.max(...this.tasks().map(t => t.id)) + 1 : 1;
    }
  }

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

    deleteTask(id:number){
      this.tasks.update(tasks => tasks.filter(task => task.id !== id));
    }

    sortTasks(){
      this.tasks.update(
        tasks=>[...tasks].sort((a,b) => a.id - b.id)
      );
    }

}
