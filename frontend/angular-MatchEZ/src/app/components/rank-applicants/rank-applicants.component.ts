import { Component, OnInit, Input } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {FetchApplicationsService} from '../../services/fetch-applications.service';

@Component({
  selector: 'app-rank-applicants',
  templateUrl: './rank-applicants.component.html',
  styleUrls: ['./rank-applicants.component.css']
})
export class RankApplicantsComponent implements OnInit {

  constructor(private fetchService: FetchApplicationsService) { }

 @Input() courses: string[];
  taArr: string[] = [];
  courseSelection: string = "";

  ngOnInit(): void {
  }

  getApplicantEmails(){
    console.log(this.courseSelection)
    this.fetchService.getApplications(this.courseSelection).subscribe(data => {
      this.taArr = [];
      data.forEach((application) => {
        this.taArr.push(application['applicantEmail'])
      })
    })
  }

  submitRankings(){
    let request = {
      rankings: this.taArr.slice(0, 5),
      courseCode: this.courseSelection
    };

    this.fetchService.setRankings(request).subscribe(data => {
      alert(data.message);
    })
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.taArr, event.previousIndex, event.currentIndex);
  }
}
