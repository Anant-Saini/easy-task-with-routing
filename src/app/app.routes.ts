import { Routes } from '@angular/router';

import { NoTaskComponent } from './tasks/no-task/no-task.component';
import { UserTasksComponent } from './users/user-tasks/user-tasks.component';
import { routes as tasksRoutes } from './tasks/tasks.routes';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
  {
    path: '', // <domain>/
    component: NoTaskComponent,
  },
  {
    path: 'users/:userId', // <domain>/tasks
    component: UserTasksComponent,
    children: tasksRoutes,
  },
  {
    path: '**', // <domain>/anything-else
    component: NotFoundComponent,
  }
];
