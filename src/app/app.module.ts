import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { ViewallComponent } from './viewall/viewall.component';
import { WorkoutComponent } from './workout/workout.component';
import { CategoryComponent } from './category/category.component';
import { TrackComponent } from './track/track.component';
import { TestComponent } from './test/test.component';



import { WorkoutService } from './services/workout.service';
import { CategoryService } from './services/category.service';
import { ActiveworkoutService } from './services/activeworkout.service';
import { CategoryPipe } from './pipes/category.pipe';
import { ActiveworkoutComponent } from './activeworkout/activeworkout.component';

@NgModule({
  declarations: [
    AppComponent,
    ViewallComponent,
    WorkoutComponent,
    CategoryComponent,
    TrackComponent,
    TestComponent,
    CategoryPipe,
    ActiveworkoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    WorkoutService,
    CategoryService,
    ActiveworkoutService,

  ],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
