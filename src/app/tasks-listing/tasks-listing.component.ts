import { Component,Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksListing } from '../tasks-listing';

@Component({
  selector: 'app-tasks-listing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tasks-listing.html',
  styleUrl: './tasks-listing.component.css'
})
export class TasksListingComponent {
  @Input() tasksListing!: TasksListing;
  @Input() deleteTask!: (taskId: number) => void; 
}
