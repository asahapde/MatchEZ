import { Component, OnInit } from '@angular/core';
import { FetchApplicationsService } from '../../services/fetch-applications.service';
import { SelectCoursesService } from "../../services/select-courses.service";

@Component({
  selector: 'app-ta-allocation-instructor',
  templateUrl: './ta-allocation-instructor.component.html',
  styleUrls: ['./ta-allocation-instructor.component.css']
})
export class TaAllocationInstructorComponent implements OnInit {

  constructor(private fetchService: FetchApplicationsService,private courseService: SelectCoursesService) { }

  allocations: any[] = [];
  courses: string[] = [];
  courseAllocationInfo: Object;

  instructorCourses: string[];

  course: string;

  ngOnInit(): void {
    
    this.courseService.getInstructorCourses(localStorage.getItem('email')).subscribe(i => {
      this.instructorCourses = i.courses;
    });
    
    
  }

  getAllocations(): void {
    this.allocations = [];

    this.fetchService.getTaAllocations(this.course).subscribe(data => {
      data.forEach(a => {
        a.allocations.forEach(b => {
          this.allocations.push(b);
        })
      })

      data.forEach(a => {
        this.courses.push(a.course)
      })


      this.courseAllocationInfo = {
        allocations: this.allocations,
        courses: this.courses
      }
    })

  }

  
}
