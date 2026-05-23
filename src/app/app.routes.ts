import { CanMatchFn, RedirectCommand, Router, Routes } from '@angular/router';

import { NoTaskComponent } from './tasks/no-task/no-task.component';
import { titleResolver, userNameResolver, UserTasksComponent } from './users/user-tasks/user-tasks.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { inject } from '@angular/core';

// export const dummyRouteGuardFn: CanMatchFn = (route, urlSegments) => {
//   const router = inject(Router);
//   const shouldAllow = Math.random();
//   if(shouldAllow < 0.5) {
//     return true;
//   } else {
//     return new RedirectCommand(router.parseUrl('/unauthorised'));
//   }
// }


export const routes: Routes = [
  {
    path: '', // <domain>/
    component: NoTaskComponent,
    title: 'No User Selected'
  },
  {
    path: 'users/:userId', // <domain>/tasks
    component: UserTasksComponent,
    loadChildren: () => import('./tasks/tasks.routes').then((module) => module.routes),
    data: {
      message: 'Hello Boi!',
    },
    //canMatch: [dummyRouteGuardFn],
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
