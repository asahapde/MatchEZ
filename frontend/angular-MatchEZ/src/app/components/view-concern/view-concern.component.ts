import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConcernsService } from '../../services/concerns.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-concern',
  templateUrl: './view-concern.component.html',
  styleUrls: ['./view-concern.component.css']
})
export class ViewConcernComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ViewConcernComponent>,
    @Inject(MAT_DIALOG_DATA) public data, private router: Router, private concernService: ConcernsService) { }

  concern: string = this.data.info.concern;
  course: string = this.data.info.course;
  flag: Boolean = this.data.info.resolved;

  ngOnInit(): void {
    console.log(this.data.info.resolved);
  }

  resolve(): void {
    this.concernService.resolve(this.data.info).subscribe(data => {
      if(data.message != undefined){
        this.refreshTable();
        this.dialogRef.close();
      }
      else{
        alert(data.err);
      }
    })
  }

  dismiss(): void {
    this.concernService.dismiss(this.data.info).subscribe(data => {
      if(data.message != undefined){
        this.refreshTable();
        this.dialogRef.close();
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
