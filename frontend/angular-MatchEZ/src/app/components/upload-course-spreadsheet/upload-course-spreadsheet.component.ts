import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { SpreadsheetService } from '../../services/spreadsheet.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-upload-course-spreadsheet',
  templateUrl: './upload-course-spreadsheet.component.html',
  styleUrls: ['./upload-course-spreadsheet.component.css']
})
export class UploadCourseSpreadsheetComponent implements OnInit {

  isOpen: boolean = true;
  submitStatus: boolean = true;
  selectedFile: File = undefined;
  myForm: FormGroup;

  constructor(private fb: FormBuilder, private spreadsheetService: SpreadsheetService) { }

  ngOnInit(): void {

    this.myForm = this.fb.group({
      courses: ['', [
        Validators.required,
        Validators.pattern('^[a-zA-Z]'),
        Validators.maxLength(1),
        Validators.minLength(1)
      ]],
      labHours: ['', [
        Validators.required,
        Validators.pattern('^[a-zA-Z]'),
        Validators.maxLength(1),
        Validators.minLength(1)
      ]],
      previousEnrollment: ['', [
        Validators.required,
        Validators.pattern('^[a-zA-Z]'),
        Validators.maxLength(1),
        Validators.minLength(1)
      ]],
      currentEnrollment: ['', [
        Validators.required,
        Validators.pattern('^[a-zA-Z]'),
        Validators.maxLength(1),
        Validators.minLength(1)
      ]],
      previousHours: ['', [
        Validators.required,
        Validators.pattern('^[a-zA-Z]'),
        Validators.maxLength(1),
        Validators.minLength(1)
      ]]
    })
  }

  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
    this.submitStatus = (this.selectedFile != undefined) ? false : true;
  }

  submit(): void {

    const format = {
      courses: this.myForm.get('courses').value,
      labHours: this.myForm.get('labHours').value,
      previousEnrollment: this.myForm.get('previousEnrollment').value,
      currentEnrollment: this.myForm.get('currentEnrollment').value,
      preivousHours: this.myForm.get('previousHours').value
    }
    const formData = new FormData;
    formData.append('spreadsheet', this.selectedFile, this.selectedFile.name);

    for (let key in format) {
      formData.append(key, format[key]);
    }
    this.spreadsheetService.uploadSpreadsheet(formData).subscribe(data => {
      this.myForm.reset()
      alert(data.message);
    },
      (err: HttpErrorResponse) => {
        this.myForm.reset();
        alert(err.error.err);
      });
  }

  get previousEnrollment() {
    return this.myForm.get('previousEnrollment');
  }

  get currentEnrollment() {
    return this.myForm.get('currentEnrollment');
  }

  get courses() {
    return this.myForm.get('courses');
  }

  get labHours() {
    return this.myForm.get('labHours');
  }

  get previousHours() {
    return this.myForm.get('previousHours')
  }

  reset(): void {
    this.myForm.reset();
  }

}