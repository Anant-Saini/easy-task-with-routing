import { Component, computed, DestroyRef, inject, input, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
  imports: [RouterOutlet, RouterLink],
})
export class UserTasksComponent implements OnInit {

  private usersService = inject(UsersService);
  private activatedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  //userId = input.required<string>();

  userName = '';
  //userName = computed(() => this.usersService.users.find((user) => user.id === this.userId())?.name ?? 'Unknown User' );

  ngOnInit() {
    
    const subscription = this.activatedRoute.paramMap.subscribe({
      next: (params) => {
  
        this.userName =
          this.usersService.users.find(
            (user) => user.id === params.get('userId'),
          )?.name ?? 'Unknown User';
       
      }
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

}
  