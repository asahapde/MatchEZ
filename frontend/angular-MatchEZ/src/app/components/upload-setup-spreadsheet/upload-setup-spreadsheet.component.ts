import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { HttpErrorResponse } from '@angular/common/http';
import { SpreadsheetService } from 'src/app/services/spreadsheet.service';


@Component({
  selector: 'app-upload-setup-spreadsheet',
  templateUrl: './upload-setup-spreadsheet.component.html',
  styleUrls: ['./upload-setup-spreadsheet.component.css']
})
export class UploadSetupSpreadsheetComponent implements OnInit {

  isOpen: boolean = true;
  submitStatus: boolean = true;
  selectedFile: File = undefined;
  myForm: FormGroup;

  constructor(private fb: FormBuilder, private spreadsheetService: SpreadsheetService) { }

  ngOnInit(): void {

    this.myForm = this.fb.group({
      code: ['', [
        Validators.required,
        Validators.pattern('^[a-zA-Z]'),
        Validators.maxLength(1),
        Validators.minLength(1)
      ]],
      name: ['', [
        Validators.required,
        Validators.pattern('^[a-zA-Z]'),
        Validators.maxLength(1),
        Validators.minLength(1)
      ]],
      lecHours: ['', [
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
      section: ['', [
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
      code: this.myForm.get('code').value,
      name: this.myForm.get('name').value,
      lecHours: this.myForm.get('lecHours').value,
      labHours: this.myForm.get('labHours').value,
      section: this.myForm.get('section').value,
    }
    const formData = new FormData;
    formData.append('spreadsheet', this.selectedFile, this.selectedFile.name);

    for (let key in format) {
      formData.append(key, format[key]);
    }
    this.spreadsheetService.uploadCourseSetupSpreadsheet(formData).subscribe(data => {
      this.myForm.reset()
      alert(data.message);
    },
      (err: HttpErrorResponse) => {
        this.myForm.reset();
        alert(err.error.err);
      });
  }

 

  get code() {
    return this.myForm.get('code');
  }

  get name() {
    return this.myForm.get('name');
  }
  get lecHours() {
    return this.myForm.get('lecHours');
  }

  get labHours() {
    return this.myForm.get('labHours');
  }
  get section() {
    return this.myForm.get('section');
  }
  
  reset(): void {
    this.myForm.reset();
  }
}
