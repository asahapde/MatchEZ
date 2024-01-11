import { Component, OnInit } from '@angular/core';
import { CourseInfoService } from '../../services/course-info.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { SelectCoursesService } from "../../services/select-courses.service";
import { ConcernsService } from "../../services/concerns.service";
import { Observable } from 'rxjs';


@Component({
  selector: 'app-concern-dialog-instructor',
  templateUrl: './concern-dialog-instructor.component.html',
  styleUrls: ['./concern-dialog-instructor.component.css']
})
export class ConcernDialogInstructorComponent implements OnInit {

  constructor(private courseService: SelectCoursesService, @Inject(MAT_DIALOG_DATA) public data: any, private concernService: ConcernsService) { }

  title: string;
  course: string;
  concern: string;
  instructor: string;

  courseOptions: string[];

  ngOnInit(): void {
    this.instructor = localStorage.getItem('email');;
    this.courseService.getInstructorCourses(this.instructor).subscribe(i => {
      this.courseOptions = i.courses;
    });
  }

  onSubmit(): void {
    this.concernService.addConcern(this.course, this.title, this.instructor, this.concern).subscribe(i => {
      alert("Concern Sent!");
    });
  }

}
