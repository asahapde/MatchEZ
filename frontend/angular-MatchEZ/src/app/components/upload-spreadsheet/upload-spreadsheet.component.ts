import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { SpreadsheetService } from '../../services/spreadsheet.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-upload-spreadsheet',
  templateUrl: './upload-spreadsheet.component.html',
  styleUrls: ['./upload-spreadsheet.component.css']
})
export class UploadSpreadsheetComponent implements OnInit {

  isOpen: boolean = true;
  submitStatus: boolean = true;
  selectedFile: File = undefined;
  myForm: FormGroup;

  constructor(private fb: FormBuilder, private spreadsheetService: SpreadsheetService) { }

  ngOnInit(): void {}

}
