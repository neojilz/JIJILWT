import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { activeworkout } from '../activeworkout'
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ActiveworkoutService } from '../services/activeworkout.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { WorkoutComponent } from '../workout/workout.component'
import { WorkoutService } from '../services/workout.service'
import { workout } from '../workout';
@Component({
  selector: 'app-activeworkout',
  templateUrl: './activeworkout.component.html',
  styleUrls: ['./activeworkout.component.css']
})


export class ActiveworkoutComponent implements OnInit {

  workoutId: number;
  page: String;
  workoutPageAction: String;
  activeWorkout: activeworkout;
  selWos: workout[];
  selectedworkouts: workout[];
  pipe = new DatePipe('en-US');

  activeWorkoutForm = new FormGroup({
    workout_id: new FormControl('', Validators.required),
    workout_title: new FormControl('', Validators.required),
    workout_note: new FormControl('', Validators.required),
    cbpm: new FormControl('', Validators.required),
    category: new FormGroup({
      _catId: new FormControl('', Validators.required),
      categoryName: new FormControl('', Validators.required),
    }),
    start_dt: new FormControl('', Validators.required),
    end_dt: new FormControl('', Validators.required),
    start_time: new FormControl('', Validators.required),
    end_time: new FormControl('', Validators.required),
    active_workout_id: new FormControl('', Validators.required)
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private activeworkoutService: ActiveworkoutService,
    private workoutService: WorkoutService
  ) {

  }



  ngOnInit() {
    // const now =Date.now();
    // const myFormattedDate = this.pipe.transform(now,'short');
    // alert(myFormattedDate);
    // new DatePipe().transform(new Date(),'yyyy-dd-MM');
    this.workoutId = Number(this.route.snapshot.paramMap.get('id'));
    this.page = this.route.snapshot.data.page;
    if (this.page === 'startworkout') {
      this.workoutPageAction = "Start";
      this.activeWorkout = new activeworkout();

      ///Got to remove these...also has to identify how to show time alone....
      // this.activeWorkout.start_dt = new Date();
      // this.activeWorkout.end_dt = new Date();
      // this.activeWorkout.start_time = new Date();
      // this.activeWorkout.end_time = new Date();
      //this.activeWorkout.workout = 
      this.getWorkout(this.workoutId);
      //this.startActiveWorkout();

    }
    // else if (this.page === 'endActWorkout') {

    //   this.endActiveWorkout();

    // }

  }


  // startActiveWorkout() {
  //   this.activeWorkoutForm.setValue({
  //     activeTitle: this.activeWorkout.workout.workout_title,
  //     activeComment: this.activeWorkout.workout.workout_note,
  //     activeStartDate: this.transformDate(Date.now()),
  //     activeEndDate: this.activeWorkout.end_dt,
  //     activeStartTime: this.activeWorkout.start_time,
  //     activeEndTime: this.activeWorkout.end_time,

  //   });

  // }

  endActiveWorkout() { }

  startOrStopWorkitem() {

    if (this.workoutPageAction === "Start") {
      console.log("Starting active work item");
      // Saving it in Database.
      this.activeWorkout = new activeworkout();
      // this.activeWorkout.start_dt= new Date();
      // this.activeWorkout.start_time = new Date().getTime();
       this.activeWorkout.start_dt= this.activeWorkoutForm.controls['start_dt'].value;
       this.activeWorkout.start_time = this.activeWorkoutForm.controls['start_time'].value;
      this.workoutPageAction = "End";
    }

    else {
       console.log("Ending active work item");
      // Saving it in Database.
     
      this.activeWorkout.end_dt= this.activeWorkoutForm.controls['end_dt'].value;
      this.activeWorkout.end_time = this.activeWorkoutForm.controls['end_time'].value;
      this.activeWorkout.workout = this.selectedworkouts[0];
      this.activeworkoutService.saveActiveWorkout(this.activeWorkout);
      this.workoutPageAction = "Start";

    }

  }

  // getWorkout() {
  //   this.workoutService.getAllWorkouts().subscribe(data => this.selectedworkouts = data.filter(selectedworkouts => selectedworkouts.workout_id == this.workoutId));
  //   console.log(this.selectedworkouts);
  //   return this.selectedworkouts[0];
  // }



  getWorkout(workoutId: number) {
    //alert("Inside get Workout");
    //this.workoutService.getAllWorkouts().subscribe(data =>{
    this.workoutService.getAllWorkouts().subscribe(data => {
      this.selWos = data;
      this.selectedworkouts = this.selWos.filter(selectedwo => selectedwo.workout_id == workoutId)

      console.log(this.selectedworkouts);
      this.activeWorkoutForm.setValue({
        workout_id: this.selectedworkouts[0].workout_id,
        workout_title: this.selectedworkouts[0].workout_title,
        workout_note: this.selectedworkouts[0].workout_note,
        cbpm: this.selectedworkouts[0].cbpm,
        category: this.selectedworkouts[0].category,
        start_dt: this.transformDate(Date.now()),
        end_dt: this.transformDate(Date.now()),
        start_time: this.transformTime(Date.now()),
        end_time: this.transformTime(Date.now()),
        active_workout_id:0

      });

    });
    //this.workoutService.getAllWorkouts().subscribe(data => this.selectedworkouts = data );

  }

  transformDate(now) {
    const myFormattedDate = this.pipe.transform(now, 'dd-MM-yy');
    return myFormattedDate;
  }

  transformTime(now) {
    const myFormattedTime = this.pipe.transform(now, 'hh:mm');
    return myFormattedTime;
  }

}
