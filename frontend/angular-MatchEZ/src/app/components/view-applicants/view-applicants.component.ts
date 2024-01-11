import { ApplicantsService } from './../../services/applicants.service';
import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-view-applicants',
  templateUrl: './view-applicants.component.html',
  styleUrls: ['./view-applicants.component.css']
})
export class ViewApplicantsComponent implements OnInit {

  constructor(private applicantService:ApplicantsService) { }

  ngOnInit(): void {
    this.getAllApplicantsInfo();
  }

  getAllApplicantsInfo(){
    this.applicantService.getAllApplicantsInfo().subscribe(resp => {
      console.log(resp);
    });
   }

}
