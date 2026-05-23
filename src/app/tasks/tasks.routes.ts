import { Routes } from '@angular/router';
import { canDeactivateAddTask, NewTaskComponent } from './new-task/new-task.component';
import { TasksComponent, tasksResolver } from './tasks.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'full',
  },
  {
    path: 'tasks', //<domain>/users/:userId/tasks
    component: TasksComponent,
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