import { CourseInfoService } from './../course-info.service';
import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-course-information',
  templateUrl: './course-information.component.html',
  styleUrls: ['./course-information.component.css']
})
export class CourseInformationComponent implements OnInit {
  coursesInfo:[];
  selectedCourse:[];
  courseName:String;
  displayedColumns: string[] = ['course', 'instructor', 'enrol_2020', 'hours_2020', 'enrol_2021', 'hours_est', 'tas'];
  dataSource:MatTableDataSource<[]>;


  constructor(private courseService: CourseInfoService) { }

  ngOnInit(): void {
   
    this.getAllCoursesInfo();
    this.dataSource = new MatTableDataSource(this.coursesInfo); 
  }

  applyFilter(filterValue:String){
    this.dataSource.filter=filterValue.trim().toLowerCase();
  }


 getAllCoursesInfo(){
  this.courseService.getAllCoursesInfo().subscribe(resp => {
    this.dataSource.data = resp as [];
    this.coursesInfo=resp;
  });
 }

}
