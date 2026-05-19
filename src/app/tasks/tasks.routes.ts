import { Routes } from '@angular/router';
import { NewTaskComponent } from './new-task/new-task.component';
import { TasksComponent, tasksResolver } from './tasks.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'full',
  },
  {
    path: 'tasks',
    component: TasksComponent,
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    resolve: {
      userTasks: tasksResolver
    }
  },
  {
    path: 'tasks/new',
    component: NewTaskComponent,
    title: 'Add Task'
  },
];
