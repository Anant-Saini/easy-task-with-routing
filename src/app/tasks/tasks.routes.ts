import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot, Routes } from '@angular/router';
import { canDeactivateAddTask, NewTaskComponent } from './new-task/new-task.component';
import { Task } from './task/task.model';
import { inject } from '@angular/core';
import { TasksService } from './tasks.service';

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


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'full',
  },
  {
    path: 'tasks', //<domain>/users/:userId/tasks
    loadComponent: () => import('./tasks.component').then((module) => module.TasksComponent),
    runGuardsAndResolvers: 'always',
    resolve: {
      userTasks: tasksResolver
    }
  },
  {
    path: 'tasks/new', // <domain>/users/:userId/tasks/new
    component: NewTaskComponent,
    title: 'Add Task',
    canDeactivate: [canDeactivateAddTask]
  },
];