import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Taskpad } from "./pages/taskpad/taskpad";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Taskpad],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('taskpad');
}
