import { CourseInfoService } from '../../services/course-info.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditDialogComponent } from "../edit-dialog/edit-dialog.component";
import * as XLSX from "xlsx";

@Component({
  selector: 'app-course-information',
  templateUrl: './course-information.component.html',
  styleUrls: ['./course-information.component.css']
})
export class CourseInformationComponent implements OnInit {
  coursesInfo: [];
  selectedCourse: [];
  courseName: String;
  displayedColumns: string[] = ['course', 'name', 'labHrs', 'enrol_2020', 'hours_2020', 'enrol_2021', 'hours_est'];
  dataSource: MatTableDataSource<[]>;
  type: string;
  applications: [];


  constructor(private courseService: CourseInfoService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getUserType();
    if (this.type == 'Undergraduate Chair') {
      this.getAllCoursesInfo();
    }
    else {
      this.getInstructorCourses();
    }
    this.dataSource = new MatTableDataSource(this.coursesInfo);
  }

  applyFilter(filterValue: String) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  getAllCoursesInfo() {
    this.courseService.getAllCoursesInfo().subscribe(resp => {
      this.dataSource.data = resp as [];
      this.coursesInfo = resp;
    });
  }

  getInstructorCourses(){
    this.courseService.getInstructorCourses(localStorage.getItem('email')).subscribe(resp => {
      this.dataSource.data = resp as [];
      this.coursesInfo = resp;
    })
  }

  getUserType() {
    this.type = localStorage.getItem('type');
  }

  openDialog(course: String): void {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      height: '200px',
      width: '600px',
      data: { course: course },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllCoursesInfo();
    });
  }

  exportCourseApplications(): void{
    this.courseService.getApplications().subscribe(data => {
      if(data.err === undefined){
        this.applications = data;
        this.exportToExcel();
      }
      else{
        alert(data.err);
      }
    })
  }

  exportToExcel():void{
    let fileName = "Applications.xlsx";
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.applications);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb,ws, 'Sheet1');
    XLSX.writeFile(wb, fileName)
  }

}
