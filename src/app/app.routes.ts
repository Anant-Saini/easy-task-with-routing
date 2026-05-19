import { Routes } from '@angular/router';

import { NoTaskComponent } from './tasks/no-task/no-task.component';
import { titleResolver, userNameResolver, UserTasksComponent } from './users/user-tasks/user-tasks.component';
import { routes as tasksRoutes } from './tasks/tasks.routes';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
  {
    path: '', // <domain>/
    component: NoTaskComponent,
    title: 'No User Selected'
  },
  {
    path: 'users/:userId', // <domain>/tasks
    component: UserTasksComponent,
    children: tasksRoutes,
    data: {
      message: 'Hello Boi!',
    },
    resolve: {
      userName: userNameResolver,
    },
    title: titleResolver
  },
  {
    path: '**', // <domain>/anything-else
    component: NotFoundComponent,
  },
];
