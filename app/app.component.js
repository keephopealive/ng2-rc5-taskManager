"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
// #################################################################
var TaskModel = (function () {
    function TaskModel(id, title, description, completed, created_at, updated_at) {
        if (id === void 0) { id = 1; }
        if (title === void 0) { title = ''; }
        if (description === void 0) { description = ''; }
        if (completed === void 0) { completed = false; }
        if (created_at === void 0) { created_at = new Date(); }
        if (updated_at === void 0) { updated_at = new Date(); }
        this.id = id;
        this.title = title;
        this.description = description;
        this.completed = completed;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
    return TaskModel;
}());
exports.TaskModel = TaskModel;
// #################################################################
var TASKS = [
    new TaskModel(1, 'First Task', 'This is the description for the first task...'),
    new TaskModel(1, 'Second Task', 'This is the description for the second task...'),
    new TaskModel(1, 'Third Task', 'This is the description for the third task...'),
    new TaskModel(1, 'Fourth Task', 'This is the description for the fourth task...'),
    new TaskModel(1, 'Fifth Task', 'This is the description for the fifth task...'),
    new TaskModel(1, 'Sixth Task', 'This is the description for the sixth task...')
];
// #################################################################
var Task = (function () {
    function Task() {
        this.completed = false;
        this.created_at = new Date();
        this.updated_at = new Date();
    }
    return Task;
}());
exports.Task = Task;
// #################################################################
var TaskService = (function () {
    function TaskService() {
        this.tasks = TASKS;
    }
    TaskService.prototype.getTasks = function () {
        // API CALL FOR RETRIEVAL OF TASKS
        return this.tasks;
    };
    TaskService.prototype.addTask = function (task) {
        // API CALL FOR INSERTION OF TASK
        this.tasks.push(task);
    };
    TaskService.prototype.updateTask = function (task, updatedTask) {
        // API CALL FOR UPDATE
        for (var i = 0; i < this.tasks.length; i++) {
            if (task == this.tasks[i]) {
                updatedTask.updated_at = new Date();
                this.tasks[i] = updatedTask;
            }
        }
    };
    TaskService.prototype.destroyTask = function (task) {
        // API CALL FOR DESTROY
        for (var i = 0; i < this.tasks.length; i++) {
            if (task == this.tasks[i])
                this.tasks.splice(i, 1);
        }
    };
    TaskService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], TaskService);
    return TaskService;
}());
exports.TaskService = TaskService;
// #################################################################
var TaskEditComponent = (function () {
    function TaskEditComponent(_taskService) {
        this._taskService = _taskService;
    }
    TaskEditComponent.prototype.ngOnInit = function () {
        this.editedTask = new TaskModel(this.task.id, this.task.title, this.task.description, this.task.completed, this.task.created_at, this.task.updated_at);
        // this.editedTask.title = this.task.title;
        // this.editedTask.description = this.task.description;
    };
    TaskEditComponent.prototype.onSubmit = function () {
        this._taskService.updateTask(this.task, this.editedTask);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Task)
    ], TaskEditComponent.prototype, "task", void 0);
    TaskEditComponent = __decorate([
        core_1.Component({
            selector: 'task-edit',
            template: "\n    <div>\n        <h1>Edit Task!</h1>\n        <div class='form-group'>    \n            <label>Title:</label>       \n            <input type=\"text\" class='form-control' [(ngModel)]=\"editedTask.title\" name=\"editedTask.title\">\n        </div>\n        <div class='form-group'>\n            <label>Description:</label>    \n            <input type=\"text\" class='form-control' [(ngModel)]=\"editedTask.description\" name=\"editedTask.description\">\n        </div>\n        <button class='btn btn-primary' (click)='onSubmit()'>Submit</button>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [TaskService])
    ], TaskEditComponent);
    return TaskEditComponent;
}());
exports.TaskEditComponent = TaskEditComponent;
// #################################################################
var TaskNewComponent = (function () {
    function TaskNewComponent(_taskService) {
        this._taskService = _taskService;
        this.task = new TaskModel();
    }
    TaskNewComponent.prototype.ngOnInit = function () {
    };
    TaskNewComponent.prototype.onSubmit = function () {
        this._taskService.addTask(this.task);
        this.task = new TaskModel();
    };
    TaskNewComponent = __decorate([
        core_1.Component({
            selector: 'task-new',
            template: "\n    <div class=\"row\">\n        <div class='col-xs-12'> \n            <div class='form-group'>    \n                <label>Title:</label>       \n                <input type=\"text\" class='form-control' [(ngModel)]=\"task.title\" name=\"task.title\">\n            </div>\n            <div class='form-group'>\n                <label>Description:</label>    \n                <input type=\"text\" class='form-control' [(ngModel)]=\"task.description\" name=\"task.description\">\n            </div>\n            <button class='btn btn-primary' (click)='onSubmit()'>Submit</button>\n        </div>\n    </div>\n  ",
            styles: ["\n    input.submit {\n        padding: 10px;\n        border-radius: 0px;\n        border: 0px;\n        background-color: rgb(0,0,210);\n        color: white;\n    }\n  "]
        }), 
        __metadata('design:paramtypes', [TaskService])
    ], TaskNewComponent);
    return TaskNewComponent;
}());
exports.TaskNewComponent = TaskNewComponent;
// #################################################################
var TaskDetailsComponent = (function () {
    function TaskDetailsComponent(_taskService) {
        this._taskService = _taskService;
        this.editingTask = false;
    }
    TaskDetailsComponent.prototype.deleteTask = function () {
        if (confirm("Are you sure you want to destroy this task?")) {
            this._taskService.destroyTask(this.task);
        }
    };
    TaskDetailsComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Task)
    ], TaskDetailsComponent.prototype, "task", void 0);
    TaskDetailsComponent = __decorate([
        core_1.Component({
            selector: 'task-details',
            template: "\n    <div>\n        <h3>{{ task?.title }}</h3> \n        <button class='btn btn-xs btn-primary' (click)=\"editingTask=!editingTask\">Edit</button>\n        <button class='btn btn-xs btn-danger' (click)=\"deleteTask()\">Destroy</button>\n        <p>{{ task?.description }}</p>\n        <button (click)=\"task.completed = !task.completed\" *ngIf='task.completed' class='btn btn-success'>Completed</button>\n        <button (click)=\"task.completed = !task.completed\" *ngIf='!task.completed' class='btn btn-warning'>Incomplete</button>\n        <h5>Created on:{{task.created_at | date:'short' }}</h5>\n        <h5>Last Updated on: {{task.updated_at | date:'short' }}</h5>\n        <task-edit *ngIf=\"editingTask\" [task]='task' ></task-edit>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [TaskService])
    ], TaskDetailsComponent);
    return TaskDetailsComponent;
}());
exports.TaskDetailsComponent = TaskDetailsComponent;
// #################################################################
var TaskListComponent = (function () {
    function TaskListComponent(_taskService) {
        this._taskService = _taskService;
    }
    TaskListComponent.prototype.ngOnInit = function () {
        this.tasks = this._taskService.getTasks();
    };
    TaskListComponent = __decorate([
        core_1.Component({
            selector: 'task-list',
            template: "\n    <div class='row'>\n        <div class='col-xs-12'>\n            <hr>\n            <h2>Tasks</h2>\n        </div>\n        <div *ngFor='let task of tasks'>\n            <task-details \n            class='col-xs-4'\n            *ngIf='!task.completed' \n            [task]='task'></task-details>\n        </div>\n    </div>\n    <div>\n        <div class='col-xs-12'>\n            <hr>\n            <h2>Completed Tasks</h2>\n        </div>\n        <div *ngFor='let task of tasks'>\n            <task-details \n            class='col-xs-4'\n            *ngIf='task.completed' \n            [task]='task'></task-details>\n        </div>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [TaskService])
    ], TaskListComponent);
    return TaskListComponent;
}());
exports.TaskListComponent = TaskListComponent;
// #################################################################
var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: "\n    <div class='container'>\n        <h1>Task List Application</h1>\n        <task-new></task-new>\n        <task-list></task-list>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
// ################################################################# 
//# sourceMappingURL=app.component.js.map