import {
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';

import { TaskComponent } from './task/task.component';
import { Task } from './task/task.model';
import { TasksService } from './tasks.service';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterLink,
  RouterStateSnapshot,
} from '@angular/router';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, RouterLink],
})
export class TasksComponent {
  order = input.required<'asc' | 'desc' | undefined>();
  userTasks = input.required<Task[]>();
}

export const tasksResolver: ResolveFn<Task[]> = (
  activatedRouteSnapshot: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const tasksService = inject(TasksService);
  const userId = activatedRouteSnapshot.paramMap.get('userId');
  const order = activatedRouteSnapshot.queryParamMap.get('order');
  return tasksService
    .allTasks()
    .filter((task) => task.userId === userId)
    .sort((a, b) =>
      order === 'asc'
        ? a.dueDate.localeCompare(b.dueDate)
        : b.dueDate.localeCompare(a.dueDate),
    );
};
