import { Component, OnInit } from '@angular/core';
import { CourseInfoService } from '../../services/course-info.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Inject } from '@angular/core';


@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements OnInit {

  constructor(private courseService: CourseInfoService, @Inject(MAT_DIALOG_DATA) public data: any) { }
  
  editHours: Number;

  ngOnInit(): void {
    
  }

  onSubmit(): void {
    this.courseService.editHours(this.data.course, this.editHours).subscribe(resp => {
      alert(resp['message']);
    });
  }

}
