import { Component, computed, DestroyRef, inject, input, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, RouterOutlet, RouterLink, ResolveFn, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
  imports: [RouterOutlet, RouterLink],
})
export class UserTasksComponent {

  message = input.required<string>();
  userName = input.required<string>();

}

export const userNameResolver: ResolveFn<string> = (activatedRouteSnapshot: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const usersService = inject(UsersService);
  return (
    usersService.users.find((user) => user.id === activatedRouteSnapshot.paramMap.get('userId'))?.name ??
    'Unknown User'
  );

}
  