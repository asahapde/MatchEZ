import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { InstructorSpreadsheetService } from '../../services/instructor-spreadsheet.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-upload-instructor-spreadsheet',
  templateUrl: './upload-instructor-spreadsheet.component.html',
  styleUrls: ['./upload-instructor-spreadsheet.component.css']
})
export class UploadInstructorSpreadsheetComponent implements OnInit {
  isOpen: boolean = true;
  submitStatus: boolean = true;
  selectedFile: File = undefined;
  myForm: FormGroup;

  constructor(private fb: FormBuilder, private instructorSpreadsheetService: InstructorSpreadsheetService) { }

  ngOnInit(): void {

    this.myForm = this.fb.group({
      instructorName: ['', [
        Validators.required,
        Validators.pattern('^[a-zA-Z]'),
        Validators.maxLength(1),
        Validators.minLength(1)
      ]],
      instructorEmail: ['', [
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
      instructorName: this.myForm.get('instructorName').value,
      instructorEmail: this.myForm.get('instructorEmail').value
    
    }
    const formData = new FormData;
    formData.append('spreadsheet', this.selectedFile, this.selectedFile.name);

    for (let key in format) {
      formData.append(key, format[key]);
    }
    this.instructorSpreadsheetService.uploadInstructorSpreadsheet(formData).subscribe(data => {
      this.myForm.reset()
      alert(data.message);
    },
      (err: HttpErrorResponse) => {
        this.myForm.reset();
        alert(err.error.err);
      });
  }

 

  get instructorName() {
    return this.myForm.get('instructorName');
  }

  get instructorEmail() {
    return this.myForm.get('instructorEmail');
  }

  
  reset(): void {
    this.myForm.reset();
  }
}
