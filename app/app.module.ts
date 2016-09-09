import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { 
    AppComponent, 
    TaskListComponent,
    TaskNewComponent,
    TaskDetailsComponent,
    TaskEditComponent,
    TaskService 
}   from './app.component';

@NgModule({
  imports:          [ BrowserModule, FormsModule ],
  declarations:     [ AppComponent, TaskListComponent, TaskNewComponent, TaskDetailsComponent, TaskEditComponent ],
  providers:        [ TaskService ],
  bootstrap:        [ AppComponent ]
})

export class AppModule { }