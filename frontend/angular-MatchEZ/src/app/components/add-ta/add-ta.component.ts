import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { FetchApplicationsService } from 'src/app/services/fetch-applications.service';

@Component({
  selector: 'app-add-ta',
  templateUrl: './add-ta.component.html',
  styleUrls: ['./add-ta.component.css']
})
export class AddTaComponent implements OnInit {

  constructor(private fb: FormBuilder,  @Inject(MAT_DIALOG_DATA) public data, public dialogRef: MatDialogRef<AddTaComponent>, private router: Router,
  private fetchApplicationsSercive: FetchApplicationsService) { }

  courseSelection: string = this.data.courses;

  myForm: FormGroup;

  ngOnInit(): void {
    this.myForm = this.fb.group({
      name: ['', [
        Validators.required,
        Validators.pattern('^[a-zA-Z]+$'),
        Validators.maxLength(30),
        Validators.minLength(2)
      ]],
      email: ['', [
        Validators.required,
        Validators.email,
      ]],
      status: ['', [
        Validators.required,
      ]],
      course: ['', [
        Validators.required,
      ]],
      hours: ['', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.maxLength(2)
      ]]
    })
  }

  get name() {
    return this.myForm.get('name');
  }

  get email() {
    return this.myForm.get('email');
  }

  get status() {
    return this.myForm.get('status');
  }

  get course() {
    return this.myForm.get('course');
  }

  get hours() {
    return this.myForm.get('hours')
  }

  close(): void {
    console.log(this.status.value)
    this.dialogRef.close();
  }

  submit():void{
    let obj = {
      course: this.course.value,
      email: this.email.value,
      hrs: this.hours.value,
      name: this.name.value,
      type: this.status.value
    }
    this.fetchApplicationsSercive.addTA(obj, this.course.value).subscribe(data => {
      if(data.err === undefined){
        this.dialogRef.close()
        this.refreshTable();
      }
      else{
        alert(data.err);
      }
    })

  }

  refreshTable() {
    // save current route first
    const currentRoute = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentRoute]); // navigate to same route
    });
  }

}
