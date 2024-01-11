import { Component, OnInit } from '@angular/core';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { SelectCoursesService } from 'src/app/services/select-courses.service';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }]
})
export class ApplicationsComponent implements OnInit {
  tabs: string [];

  constructor(private courseService: SelectCoursesService) { }

  ngOnInit(): void {
    this.getCourses();
  }

  getCourses(): void{
    this.courseService.getInstructorCourses(localStorage.getItem('email')).subscribe(data => {
      console.log(data)
      this.tabs = data.courses;
    })
  }
}
