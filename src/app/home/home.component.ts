import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksListingComponent } from "../tasks-listing/tasks-listing.component";
import { TasksListing } from '../tasks-listing';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TasksListingComponent, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {

  isPopUpOpen: boolean = false; 
  isBlankOpen: boolean = false;
  isSuccesOpen: boolean = false;
  ifLimitReached: boolean = true;

  newTask: string = "";

  tasksListingList: TasksListing[] = []

  addTask() {
    if(this.newTask !== "") {
        if(this.tasksListingList.length !== 20){
          
          const newTaskItem: TasksListing = {
            id: this.tasksListingList.length + 1,
            task: this.newTask.trim() 
          };
          this.tasksListingList.push(newTaskItem);
    
          this.saveListToLocalStorage();
          this.newTask = '';
          
          this.isSuccesOpen = true;
          setTimeout(() => {
            this.isSuccesOpen = false;
          }, 1000);

        } else{
          this.isPopUpOpen = true;
          this.ifLimitReached = false;
        }  
    }else{
      this.isBlankOpen = true;
    }
    

  }

  saveListToLocalStorage() {
    localStorage.setItem('tasksListingList', JSON.stringify(this.tasksListingList));
  }

  deleteTask(taskId: number) {
    this.tasksListingList = this.tasksListingList.filter(task => task.id !== taskId);
    this.saveListToLocalStorage(); 
    this.ifLimitReached = true;
  }

  loadTasksFromLocalStorage() {
    const savedTasks = localStorage.getItem('tasksListingList');
    if (savedTasks) {
      this.tasksListingList = JSON.parse(savedTasks);
    }
  }

  ngOnInit() {
    this.loadTasksFromLocalStorage();
  }
}
