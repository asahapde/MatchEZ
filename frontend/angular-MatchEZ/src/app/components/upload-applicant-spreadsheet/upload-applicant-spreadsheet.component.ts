import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms'
import { SpreadsheetService } from '../../services/spreadsheet.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-upload-applicant-spreadsheet',
  templateUrl: './upload-applicant-spreadsheet.component.html',
  styleUrls: ['./upload-applicant-spreadsheet.component.css']
})
export class UploadApplicantSpreadsheetComponent implements OnInit {

  isOpen: boolean = true;
  submitStatus: boolean = true;
  selectedFile: File = undefined;
  myApplicantForm: FormGroup;
  ////add new question
  addQuestions: FormGroup;
  Arr: string[] = [];
  instructorQuestions: [];


  constructor(private fb: FormBuilder, private spreadsheetService: SpreadsheetService) { }

  ngOnInit(): void {

    this.myApplicantForm = this.fb.group({
      courseCode: ['', [
        Validators.required,
        Validators.pattern('^[a-zA-Z]'),
        Validators.maxLength(1),
        Validators.minLength(1)
      ]],
      applicantName: ['', [
        Validators.required,
        Validators.pattern('^[a-zA-Z]'),
        Validators.maxLength(1),
        Validators.minLength(1)
      ]],
      applicantEmail: ['', [
        Validators.required,
        Validators.pattern('^[a-zA-Z]'),
        Validators.maxLength(1),
        Validators.minLength(1)
      ]],
      applicantStatus: ['', [
        Validators.required,
        Validators.pattern('^[a-zA-Z]'),
        Validators.maxLength(1),
        Validators.minLength(1)
      ]],
      numberOfHours: ['', [
        Validators.required,
        Validators.pattern('^[a-zA-Z]'),
        Validators.maxLength(1),
        Validators.minLength(1)
      ]],
      courseRank: ['', [
        Validators.required,
        Validators.pattern('^[a-zA-Z]'),
        Validators.maxLength(1),
        Validators.minLength(1)
      ]],
      from: ['', [
        Validators.required,
        Validators.pattern('^[a-zA-Z]'),
        Validators.maxLength(1),
        Validators.minLength(1)
      ]],
      to: ['', [
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
      courseCode: this.myApplicantForm.get('courseCode').value,
      applicantName: this.myApplicantForm.get('applicantName').value,
      applicantEmail: this.myApplicantForm.get('applicantEmail').value,
      applicantStatus: this.myApplicantForm.get('applicantStatus').value,
      numberOfHours: this.myApplicantForm.get('numberOfHours').value,
      courseRank: this.myApplicantForm.get('courseRank').value,
      from: this.myApplicantForm.get('from').value,
      to: this.myApplicantForm.get('to').value
    }
    const formData = new FormData;
    formData.append('SampleApplicantInput_updated', this.selectedFile, this.selectedFile.name);

    for (let key in format) {
      formData.append(key, format[key]);
    }
    this.spreadsheetService.uploadApplicantSpreadsheet(formData).subscribe(data => {
      this.myApplicantForm.reset()
      alert(data.message);
      console.log(data.finalData);
    },
      (err: HttpErrorResponse) => {
        this.myApplicantForm.reset();
        alert(err.error.err);
      });
  }

  get applicantName() {
    return this.myApplicantForm.get('applicantName');
  }

  get applicantEmail() {
    return this.myApplicantForm.get('applicantEmail');
  }

  get applicantStatus() {
    return this.myApplicantForm.get('applicantStatus');
  }

  get numberOfHours() {
    return this.myApplicantForm.get('numberOfHours');
  }

  get courseRank() {
    return this.myApplicantForm.get('courseRank')
  }

  get courseCode() {
    return this.myApplicantForm.get('courseCode')
  }

  get from() {
    return this.myApplicantForm.get('from');
  }

  get to() {
    return this.myApplicantForm.get('to');
  }

  reset(): void {
    this.myApplicantForm.reset();
  }


}
