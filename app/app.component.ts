import { Component, Injectable, OnInit, Input } from '@angular/core';
// #################################################################

export class TaskModel {
    constructor(
        public id: number = 1,
        public title: string = '',
        public description: string ='',
        public completed: boolean = false,
        public created_at: Date = new Date(),
        public updated_at: Date = new Date()
    ) { }
}
// #################################################################
const TASKS: Task[] = [
    new TaskModel(1,'First Task','This is the description for the first task...'),
    new TaskModel(1,'Second Task','This is the description for the second task...'),
    new TaskModel(1,'Third Task','This is the description for the third task...'),
    new TaskModel(1,'Fourth Task','This is the description for the fourth task...'),
    new TaskModel(1,'Fifth Task','This is the description for the fifth task...'),
    new TaskModel(1,'Sixth Task','This is the description for the sixth task...')
]
// #################################################################
export class Task {
    id: number;
    title: string;
    description: string;
    completed: boolean = false;
    created_at: Date = new Date();
    updated_at: Date = new Date();
}
// #################################################################
@Injectable()
export class TaskService {
    tasks: Task[] = TASKS;
    task: Task;

    getTasks() {
        // API CALL FOR RETRIEVAL OF TASKS
        return this.tasks;
    }
    addTask(task: Task) {
        // API CALL FOR INSERTION OF TASK
        this.tasks.push(task);
    }

    updateTask(task: Task, updatedTask: Task) {
        // API CALL FOR UPDATE
        for(var i=0; i<this.tasks.length; i++){
            if (task == this.tasks[i]){
                updatedTask.updated_at = new Date();
                this.tasks[i] = updatedTask;
            }
        }
    }
    
    destroyTask(task: Task){
        // API CALL FOR DESTROY
        for(var i=0; i<this.tasks.length; i++){
            if (task == this.tasks[i])
                this.tasks.splice(i,1);
        }
    }

  
}
// #################################################################
@Component({
  selector: 'task-edit',
  template: `
    <div>
        <h1>Edit Task!</h1>
        <div class='form-group'>    
            <label>Title:</label>       
            <input type="text" class='form-control' [(ngModel)]="editedTask.title" name="editedTask.title">
        </div>
        <div class='form-group'>
            <label>Description:</label>    
            <input type="text" class='form-control' [(ngModel)]="editedTask.description" name="editedTask.description">
        </div>
        <button class='btn btn-primary' (click)='onSubmit()'>Submit</button>
    </div>
  `
})
export class TaskEditComponent implements OnInit {
    @Input() task: Task;
    editedTask: Task;

    constructor(private _taskService: TaskService){ }

    ngOnInit() {
        this.editedTask = new TaskModel(
            this.task.id, 
            this.task.title, 
            this.task.description, 
            this.task.completed, 
            this.task.created_at, 
            this.task.updated_at
        );
        // this.editedTask.title = this.task.title;
        // this.editedTask.description = this.task.description;
    }

    onSubmit() {
        this._taskService.updateTask(this.task, this.editedTask);
    }



}
// #################################################################
@Component({
  selector: 'task-new',
  template: `
    <div class="row">
        <div class='col-xs-12'> 
            <div class='form-group'>    
                <label>Title:</label>       
                <input type="text" class='form-control' [(ngModel)]="task.title" name="task.title">
            </div>
            <div class='form-group'>
                <label>Description:</label>    
                <input type="text" class='form-control' [(ngModel)]="task.description" name="task.description">
            </div>
            <button class='btn btn-primary' (click)='onSubmit()'>Submit</button>
        </div>
    </div>
  `,
  styles: [`
    input.submit {
        padding: 10px;
        border-radius: 0px;
        border: 0px;
        background-color: rgb(0,0,210);
        color: white;
    }
  `]
})
export class TaskNewComponent implements OnInit {
    task: Task;

    constructor(private _taskService: TaskService) {
        this.task = new TaskModel();
    }

    ngOnInit() {
        
    }

    onSubmit(){
        this._taskService.addTask(this.task);
        this.task = new TaskModel();
    }

 }
// #################################################################
@Component({
  selector: 'task-details',
  template: `
    <div>
        <h3>{{ task?.title }}</h3> 
        <button class='btn btn-xs' (click)="editingTask=!editingTask">Edit</button>
        <button class='btn btn-xs' (click)="deleteTask()">Destroy</button>
        <p>{{ task?.description }}</p>
        <h4>Completion Status:</h4>
        <button (click)="task.completed = !task.completed" *ngIf='task.completed' class='btn btn-success'>Completed</button>
        <button (click)="task.completed = !task.completed" *ngIf='!task.completed' class='btn btn-warning'>Incomplete</button>
        <h5>Created on:{{task.created_at | date:'short' }}</h5>
        <h5>Last Updated on: {{task.updated_at | date:'short' }}</h5>
        <task-edit *ngIf="editingTask" [task]='task' ></task-edit>
    </div>
  `
})
export class TaskDetailsComponent implements OnInit { 
    @Input() task: Task
    editableTask: Task;
    editingTask: boolean = false;

    constructor(private _taskService: TaskService){ }

    deleteTask(){
        if(confirm("Are you sure you want to destroy this task?")){
            this._taskService.destroyTask(this.task);
        }
    }

    ngOnInit(){
        
    }
}

// #################################################################
@Component({
  selector: 'task-list',
  template: `
    <div class='row'>
        <div *ngFor='let task of tasks'>
            <task-details 
            class='col-xs-6'
            *ngIf='!task.completed' 
            [task]='task'></task-details>
        </div>
        <div *ngFor='let task of tasks'>
            <task-details 
            class='col-xs-6'
            *ngIf='task.completed' 
            [task]='task'></task-details>
        </div>
    </div>
  `
})
export class TaskListComponent implements OnInit { 
    tasks: Task[];
    constructor(private _taskService: TaskService){}

    ngOnInit() {
        this.tasks = this._taskService.getTasks();
    }

 

}
// #################################################################
@Component({
  selector: 'my-app',
  template: `
    <div class='container'>
        <h1>Task List Application</h1>
        <task-list></task-list>
        <task-new></task-new>
    </div>
  `,
  styles: ['* { outline: 1px dotted red;}']
})
export class AppComponent { }
// #################################################################