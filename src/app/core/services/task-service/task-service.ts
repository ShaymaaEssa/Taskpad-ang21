import { computed, effect, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { ITask, TaskStatus } from '../../../models/interfaces/itask';
import { environment } from '../../environment/environment';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly ID = inject(PLATFORM_ID);

  private tasks = signal<ITask[]>([]);  //writable
  public readonly allTasks = this.tasks.asReadonly();  //readonly

  readonly completedTasks = computed(() => this.tasks().filter(task => task.status === 'completed'));  //computed

  public readonly completionPercentage = computed(() => {
    if (this.tasks().length === 0) {
      return 0;
    }

    const completedTasksLength = this.completedTasks().length;
    return (completedTasksLength / this.tasks().length) * 100;
  });


  private saveEffectTasks = effect(() => {
    if (isPlatformBrowser(this.ID)) {
      localStorage.setItem(environment.localStorageKey, JSON.stringify(this.tasks()));

    }
  });


  private nextId = 1;

  constructor() {

    if (isPlatformBrowser(this.ID)) {


      const saved = localStorage.getItem(environment.localStorageKey);
      if (saved) {
        this.tasks.set(JSON.parse(saved));
        this.nextId = this.tasks().length > 0 ? Math.max(...this.tasks().map(t => t.id)) + 1 : 1;
      }
    }

  }

  addTask(taskTitle: string) {
    const newTask: ITask = {
      id: this.nextId++,
      title: taskTitle,
      status: 'pending'
    };
    this.tasks.update(tasks => [...tasks, newTask]);

  }


  updateTaskStatus(id: number, status: TaskStatus) {
    this.tasks.update(tasks => tasks.map(task => task.id === id ? { ...task, status } : task));
  }

  deleteTask(id: number) {
    this.tasks.update(tasks => tasks.filter(task => task.id !== id));
  }

  sortTasks() {
    this.tasks.update(
      tasks => [...tasks].sort((a, b) => a.id - b.id)
    );
  }

}
