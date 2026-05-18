import { Component, computed, DestroyRef, inject, input, OnInit, signal } from '@angular/core';

import { TaskComponent } from './task/task.component';
import { Task } from './task/task.model';
import { TasksService } from './tasks.service';
import { ActivatedRoute, RouterLink } from "@angular/router";

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, RouterLink],
})
export class TasksComponent implements OnInit {

  private tasksService = inject(TasksService);
  private activatedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  //order = input.required<'asc' | 'desc'>();
  order  = signal<'asc' | 'dsc'>('dsc');

  userId = input.required<string>();

  userTasks = computed<Task[]>( () => this.tasksService.allTasks().filter(task => task.userId === this.userId()).sort(
    (a, b) => this.order() === 'asc' ? a.dueDate.localeCompare(b.dueDate) : b.dueDate.localeCompare(a.dueDate)
  ) );

  ngOnInit(): void {
    const subscription = this.activatedRoute.queryParams.subscribe({
      next: (params) => {
        this.order.set(params['order']);  
      }
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
 }
